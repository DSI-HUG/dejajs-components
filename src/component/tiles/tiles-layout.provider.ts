/*
 * *
 *  @license
 *  right HÃ´pital Universitaire de GenÃ¨ve All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 * /
 *
 */

import { EventEmitter, Injectable, Optional } from '@angular/core';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { DejaClipboardService } from '../../common/core/clipboard/clipboard.service';
import { Directions } from '../../common/core/graphics/directions';
import { Position } from '../../common/core/graphics/position';
import { Rect } from '../../common/core/graphics/rect';
import { Size } from '../../common/core/graphics/size';
import { KeyCodes } from '../../common/core/keycodes.enum';
import { IDragCursorInfos, IDragDropContext } from '../mouse-dragdrop/mouse-dragdrop.service';
import { DejaTile, IDejaTile, IDejaTilesAddEvent, IDejaTilesEvent, IDejaTilesModelEvent, IDejaTilesRemoveEvent } from './index';

interface ILayoutInfo {
    id: string;
    bounds: Rect;
}

interface ILayoutInfos {
    infos: { [id: string]: ILayoutInfo };
    height: number;
    targetBounds: Rect;
    validBounds: Rect;
}

export interface IDragSelection {
    startPosition: Position;
    selectedRect: Rect;
}

export interface IDragDropInfos {
    enabled: boolean;
    startX: number;
    startY: number;
    tiles: DejaTile[];
}

export interface IDejaTilesRefreshParams {
    resetWidth?: boolean;
    ensureVisible?: string; // Tile id
    ensureBounds?: Rect;
}

@Injectable()
export class DejaTilesLayoutProvider {
    public refreshTiles$ = new Subject<IDejaTilesRefreshParams>();
    public ensureVisible$ = new Subject<string>();
    public ensureBounds$ = new Subject<Rect>();
    public dragging$ = new BehaviorSubject<boolean>(false);
    public dragSelection$ = new Subject<IDragSelection>();
    public dragDropInfos$ = new Subject<IDragDropInfos>();
    public selectionRect$ = new Subject<Rect>();
    public dragover$ = new Subject<IDragCursorInfos>();
    public dragleave$ = new Subject();
    public deleteTiles$ = new Subject<DejaTile[]>();
    public designMode = false;

    public layoutChanged = new EventEmitter<IDejaTilesEvent>();
    public modelChanged = new EventEmitter<IDejaTilesModelEvent>();
    public selectionChanged = new EventEmitter<IDejaTilesEvent>();
    public contentAdding = new EventEmitter<IDejaTilesAddEvent>();
    public contentRemoving = new EventEmitter<IDejaTilesRemoveEvent>();

    protected tileMinWidth = 10;
    protected tileMinWidthUnit = '%';
    protected tileMaxWidth = 100;
    protected tileMaxWidthUnit = '%';
    protected tileMinHeight = 10;
    protected tileMinHeightUnit = '%';
    protected tileMaxHeight = 100;
    protected tileMaxHeightUnit = '%';
    protected maxWidth = 100;
    protected maxWidthUnit = '%';

    private tilesDic = {} as { [id: string]: DejaTile };
    private _tiles: DejaTile[];
    private _cursor: string;
    private _targetBounds = {} as Rect;
    private destination = {} as Rect;
    private lastTargetBounds: Rect;
    private moveTimout: Subscription;
    private originalLayout: ILayoutInfos;
    private validLayout: ILayoutInfos;
    private beforeSizeLayout: ILayoutInfos;
    private dragPageOffset = {} as Position;
    private dragOriginalPosition = {} as Position;
    private dragRelativePosition: { [id: string]: Position };
    private expandedTile: DejaTile;
    private _container: HTMLElement;
    private currentTile: DejaTile;
    private hundredPercentWith: number;
    private dragTarget: Rect;

    private selectedIds = [] as string[];

    constructor(@Optional() private clipboardService: DejaClipboardService) {
        Observable.from(this.refreshTiles$)
            .debounceTime(30)
            .do(() => {
                this.container.style.width = ''
                this.container.style.height = ''
            })
            .delay(10)
            .subscribe((params) => {
                const placeAtTheEnd = [] as DejaTile[];

                const containerBounds = this.container.getBoundingClientRect();
                if ((params && params.resetWidth) || !this.hundredPercentWith) {
                    this.hundredPercentWith = containerBounds.width;
                }
                let height = containerBounds.height - 20;
                let width = containerBounds.width - 20;
                const tiles = this.tiles || [];

                const selectedTileIds = [];

                tiles.forEach((tile: DejaTile) => {
                    if (tile.percentBounds && !tile.percentBounds.isEmpty()) {
                        const bounds = this.getPixelBounds(tile.percentBounds);
                        if (bounds.bottom > height) {
                            height = bounds.bottom;
                        }
                        if (bounds.right > width) {
                            width = bounds.right;
                        }
                        if (!tile.isDragging) {
                            tile.pixelBounds = bounds;
                        }
                    } else {
                        placeAtTheEnd.push(tile);
                    }
                    if (tile.isSelected && !tile.isHidden) {
                        selectedTileIds.push(tile.id);
                    }
                });

                let top = height;
                let left = 0;
                placeAtTheEnd.forEach((tile) => {
                    tile.percentBounds = tile.percentBounds || new Rect(left, this.getPercentSize(top), 3 * this.getTileMinPercentWidth(), this.getTileMinPercentHeight());
                    const pixelBounds = this.getPixelBounds(tile.percentBounds);

                    if (pixelBounds.right > width) {
                        top += pixelBounds.top;
                        tile.percentBounds.left = 0;
                        tile.percentBounds.top = this.getPercentSize(pixelBounds.top);
                    }

                    if (pixelBounds.bottom > height) {
                        height = pixelBounds.bottom;
                    }

                    tile.pixelBounds = this.getPixelBounds(tile.percentBounds);
                    left += pixelBounds.left;
                });

                if (this.dragTarget) {
                    const dragBounds = this.getPixelBounds(this.dragTarget);
                    if (height <= dragBounds.bottom) {
                        height = dragBounds.bottom + dragBounds.height;
                    }
                    if (width <= dragBounds.right) {
                        width = dragBounds.right + dragBounds.width;
                    }
                }

                const minHeight = this.getPixelSize(2 * this.tileMinHeight, this.tileMinHeightUnit);
                if (height < minHeight) {
                    height = minHeight;
                }

                this.container.style.width = `${width}px`;
                this.container.style.height = `${height}px`;

                if (params) {
                    if (params.ensureVisible) {
                        this.ensureVisible$.next(params.ensureVisible);
                    }
                    if (params.ensureBounds) {
                        this.ensureBounds$.next(params.ensureBounds);
                    }
                }

                this.selectedTiles = selectedTileIds;
            });

        const ensureTile$ = Observable.from(this.ensureVisible$)
            .delay(1)
            .map((id) => this.tilesDic[id])
            .filter((tile) => !!tile)
            .map((tile) => tile.percentBounds);

        Observable.merge(this.ensureBounds$, ensureTile$)
            .subscribe((percentBounds) => {
                const { left, right, top, bottom } = this.getPixelBounds(percentBounds);

                const findScrollContainer = (container: HTMLElement) => {
                    while (container && container.scrollHeight === container.clientHeight) {
                        container = container.parentElement;
                    }

                    return container;
                };

                const scrollContainer = findScrollContainer(this.container);
                if (!scrollContainer) {
                    return;
                }

                const containerBounds = this.container.getBoundingClientRect();
                const scrollBounds = scrollContainer.getBoundingClientRect();

                if (left + containerBounds.left < scrollBounds.bottom) {
                    scrollContainer.scrollLeft += left + containerBounds.left - scrollBounds.bottom;
                } else if (right + containerBounds.left > scrollBounds.right) {
                    scrollContainer.scrollLeft += right + containerBounds.left - scrollBounds.right;
                }

                if (top + containerBounds.top < scrollBounds.top) {
                    scrollContainer.scrollTop += top + containerBounds.top - scrollBounds.top;
                } else if (bottom + containerBounds.top > scrollBounds.bottom) {
                    scrollContainer.scrollTop += bottom + containerBounds.top - scrollBounds.bottom;
                }
            });

        Observable.from(this.dragSelection$)
            .subscribe((dragSelection) => {
                const mouseUp$ = Observable
                    .fromEvent(this._container.ownerDocument, 'mouseup')
                    .do(() => this.selectionRect$.next(null));

                Observable
                    .fromEvent(this._container, 'mousemove')
                    .takeUntil(mouseUp$)
                    .filter((event: MouseEvent) => event.buttons === 1)
                    .subscribe((event: MouseEvent) => {
                        const containerBounds = this._container.getBoundingClientRect();

                        // Select all tiles between start position and current position
                        dragSelection.selectedRect = Rect.fromPoints(dragSelection.startPosition, new Position(event.pageX - containerBounds.left, event.pageY - containerBounds.top));
                        this.selectionRect$.next(dragSelection.selectedRect);

                        const selection = this.HitTest(dragSelection.selectedRect);
                        this.selectedTiles = selection.map((tile) => tile.id);
                    });
            });

        const leave$ = Observable.from(this.dragleave$);

        Observable.from(this.dragDropInfos$)
            .subscribe((dragDropInfos) => {
                if (!dragDropInfos || !dragDropInfos.tiles || !dragDropInfos.tiles.length) {
                    return;
                }

                const mousemove$ = Observable.fromEvent(this._container, 'mousemove');
                const mouseUp$ = Observable.fromEvent(this._container.ownerDocument, 'mouseup');
                const keyUp$ = Observable.fromEvent(this._container.ownerDocument, 'keyup');
                const escape$ = keyUp$.filter((event: KeyboardEvent) => event.keyCode === KeyCodes.Escape);
                const cancel$ = Observable.merge(leave$, mousemove$.filter((event: MouseEvent) => event.buttons !== 1), escape$);

                const kill$ = Observable.merge(mouseUp$, cancel$);

                let mouseUp$sub: Subscription;

                const cancel$sub = cancel$
                    .take(1)
                    .do(() => mouseUp$sub.unsubscribe())
                    .subscribe(() => {
                        this.removeTemporaryTile();
                        this.cancelDrag(dragDropInfos.tiles);
                    });

                mouseUp$sub = mouseUp$
                    .take(1)
                    .do(() => cancel$sub.unsubscribe())
                    .subscribe(() => this.drop(dragDropInfos.tiles));

                const dragover$ = Observable.from(this.dragover$)
                    .map((cursor) => cursor.originalEvent);

                Observable.merge(mousemove$, dragover$)
                    .takeUntil(kill$)
                    .subscribe((event: MouseEvent) => {
                        const containerBounds = this._container.getBoundingClientRect();
                        const x = event.pageX - containerBounds.left;
                        const y = event.pageY - containerBounds.top;

                        if (!dragDropInfos.enabled) {
                            if (Math.abs(dragDropInfos.startX - x) > 10 || Math.abs(dragDropInfos.startY - y) > 10) {
                                // Allow drag and drop of new tiles from outside the component
                                if (dragDropInfos.tiles.length === 1 && !this.tiles.find((t) => t === dragDropInfos.tiles[0])) {
                                    const tempTile = dragDropInfos.tiles[0];

                                    // Clear current selection
                                    this.selectedTiles = [tempTile.id];

                                    let bounds = tempTile.percentBounds;
                                    if (!bounds || bounds.isEmpty()) {
                                        bounds = new Rect(0, 0, 15, 15);
                                    }

                                    const idealBounds = this.getFreePlace(new Rect(this.getPercentSize(x) - bounds.width / 2, this.getPercentSize(y) - bounds.height / 2, bounds.width, bounds.height));
                                    dragDropInfos.startX = idealBounds.left - bounds.width / 2;
                                    dragDropInfos.startY = idealBounds.top - bounds.height / 2;

                                    tempTile.percentBounds = idealBounds;
                                    tempTile.dragging$.next(true);

                                    this._cursor = 'move';

                                    this.tiles.push(tempTile);
                                    this.tilesDic[tempTile.id] = tempTile;

                                    // Start tile drag and drop
                                    this.dragging$.next(true);
                                    dragDropInfos.enabled = true;
                                    this.startDrag(dragDropInfos.tiles, this.getPixelSize(idealBounds.left + idealBounds.width / 2), this.getPixelSize(idealBounds.top + idealBounds.height / 2));

                                } else {
                                    // Start tile drag and drop
                                    this.dragging$.next(true);
                                    dragDropInfos.enabled = true;
                                    this.startDrag(dragDropInfos.tiles, x, y);
                                }

                            }
                        } else {
                            this.drag(dragDropInfos.tiles, x, y);
                        }
                    });
            });

        // Delete stream for clipboard
        Observable.from(this.deleteTiles$).subscribe((tilesToDelete) => this.deleteTiles(tilesToDelete));
    }

    public set container(container: HTMLElement) {
        this._container = container;

        const leave$ = Observable.fromEvent(container, 'mouseleave');
        const mouseUp$ = Observable.fromEvent(container.ownerDocument, 'mouseup');

        Observable.fromEvent(container, 'mouseenter')
            .subscribe(() => {
                // Cursor provider
                if (this.designMode) {
                    Observable.fromEvent(container, 'mousemove')
                        .debounceTime(10)
                        .takeUntil(leave$)
                        .filter((event: MouseEvent) => event.buttons === 0)
                        .subscribe((event: MouseEvent) => {
                            this._cursor = this.getCursorFromHTMLElement(event.pageX, event.pageY, event.target as HTMLElement);
                            this.container.style.cursor = this._cursor;
                        });
                } else {
                    this.container.style.cursor = '';
                }

                const mouseDown$ = Observable
                    .fromEvent(container, 'mousedown')
                    .filter((event: MouseEvent) => event.buttons === 1)
                    .map((event: MouseEvent) => ({ event: event, target: event.target as HTMLElement, clickedTile: this.getTileComponentFromHTMLElement(event.target as HTMLElement) }));

                // Pressed and selected tile observers
                mouseDown$.takeUntil(leave$)
                    .subscribe(({ event, target, clickedTile }) => {
                        if (this.currentTile) {
                            this.currentTile.isPressed = false;
                        }
                        this.currentTile = clickedTile;
                        if (this.currentTile) {
                            this.currentTile.isPressed = true;

                            if (event.ctrlKey) {
                                // Multi-selection is available in design mode, selection on the mouse up
                            } else {
                                if (!this.currentTile.isSelected || this._cursor !== 'move') {
                                    this.selectedTiles = [this.currentTile.id];
                                }

                                if (this.designMode) {
                                    const containerBounds = this._container.getBoundingClientRect();
                                    const x = event.pageX - containerBounds.left;
                                    const y = event.pageY - containerBounds.top;

                                    this.dragDropInfos$.next({
                                        enabled: false,
                                        startX: x,
                                        startY: y,
                                        tiles: this.tiles.filter((tile) => tile.isSelected),
                                    } as IDragDropInfos);
                                }
                            }

                            Observable.merge(mouseUp$, leave$)
                                .first()
                                .filter(() => !!this.currentTile)
                                .subscribe((e: MouseEvent) => {
                                    if (this.currentTile.isPressed) {
                                        this.currentTile.isPressed = false;
                                        // Multi-selection
                                        if (e.ctrlKey) {
                                            this.currentTile.isSelected = !this.currentTile.isSelected;

                                            this.selectedTiles = this.tiles
                                                .filter((tile) => tile.isSelected)
                                                .map((tile) => tile.id);
                                        }
                                    }

                                    this.currentTile = undefined;
                                });
                        } else {
                            if (target === this.container || target.parentElement === this.container) {
                                if (event.buttons === 1) {
                                    // Start drag selection
                                    const containerBounds = this._container.getBoundingClientRect();
                                    this.dragSelection$.next({ startPosition: new Position(event.pageX - containerBounds.left, event.pageY - containerBounds.top), selectedRect: new Rect(), } as IDragSelection);
                                }

                                // Unselect all tiles
                                if (this.currentTile) {
                                    this.currentTile.isPressed = false;
                                }
                                this.selectedTiles = [];
                            }
                        }
                    });
            });
    }

    public get container() {
        return this._container;
    }

    public set tiles(tiles: DejaTile[]) {
        this._tiles = tiles;
        this.tilesDic = {};
        tiles.forEach((t) => this.tilesDic[t.id] = t);
        this.refreshTiles$.next({ resetWidth: true });
    }

    public get tiles() {
        return this._tiles;
    }

    public set selectedTiles(selectedIds: string[]) {
        const selectedTiles = [];
        let raiseEvent = false;

        const idsDic = {};
        selectedIds.forEach((id) => idsDic[id] = true);

        const previousIdsDic = {};
        this.selectedIds.forEach((id) => previousIdsDic[id] = true);

        this.tiles.forEach((tile: DejaTile) => {
            if (idsDic[tile.id] !== previousIdsDic[tile.id]) {
                raiseEvent = true;
            }
            tile.isSelected = idsDic[tile.id];
            if (tile.isSelected) {
                selectedTiles.push(tile);
            }
        });

        this.selectedIds = selectedIds;

        if (raiseEvent) {
            const event = new CustomEvent('DejaTilesAddEvent', { cancelable: false }) as IDejaTilesEvent;
            event.tiles = selectedTiles;
            this.selectionChanged.emit(event);
        }
    }

    public set tileminwidth(value: string) {
        this.extractValueAndUnit('tileMinWidth', value);
    }

    public set tilemaxwidth(value: string) {
        this.extractValueAndUnit('tileMaxWidth', value);
    }

    public set tileminheight(value: string) {
        this.extractValueAndUnit('tileMinHeight', value);
    }

    public set tilemaxheight(value: string) {
        this.extractValueAndUnit('tileMaxHeight', value);
    }

    public set maxwidth(value: string) {
        this.extractValueAndUnit('maxWidth', value);
    }

    private get targetBounds() {
        return this._targetBounds;
    }

    private set targetBounds(targetBounds: Rect) {
        this._targetBounds = targetBounds;
        if (targetBounds) {
            this.selectionRect$.next(new Rect({
                height: this.getPixelSize(targetBounds.height || 0),
                left: this.getPixelSize(targetBounds.left || 0),
                top: this.getPixelSize(targetBounds.top || 0),
                width: this.getPixelSize(targetBounds.width || 0),
            }));
        } else {
            this.selectionRect$.next(undefined);
        }
    }

    public copySelection() {
        const selectedTiles = this.tiles.filter((tile) => tile.isSelected);
        if (selectedTiles.length) {
            this.copyTiles(selectedTiles, false);
        }
        return selectedTiles;
    }

    public cutSelection() {
        const selectedTiles = this.tiles.filter((tile) => tile.isSelected);
        if (selectedTiles.length) {
            this.copyTiles(selectedTiles, true);
        }
        return selectedTiles;
    }

    public deleteSelection() {
        const selectedTiles = this.tiles.filter((tile) => tile.isSelected);
        if (selectedTiles.length) {
            this.removeTiles(selectedTiles.map((tile) => tile.id));
        }
        return selectedTiles;
    }

    public paste() {
        if (!this.clipboardService || !this.clipboardService.isAvailable('tiles')) {
            return [];
        }

        const sourceTiles = this.clipboardService.get('tiles') as DejaTile[];

        // Unselect all tiles
        this.tiles.forEach((tile) => tile.isSelected = false);

        // Get max rectangle
        let bounds: Rect;
        sourceTiles.forEach((tile) => {
            bounds = bounds ? Rect.union(bounds, tile.percentBounds) : new Rect(tile.percentBounds);
        });

        const targetBounds = this.getFreePlace(new Rect(0, 0, bounds.width, bounds.height));

        const newTiles = sourceTiles.map((tile) => {
            const newTile = this.createTile({
                type: tile.type,
                bounds: new Rect(targetBounds.left + tile.percentBounds.left - bounds.left, targetBounds.top + tile.percentBounds.top - bounds.top, tile.percentBounds.width, tile.percentBounds.height, ),
                templateModel: tile.templateModel,
                color: tile.color,
            } as IDejaTile);
            newTile.isSelected = true;
            return newTile;
        });

        this.addTiles(newTiles);

        return newTiles;
    }

    public getTileElementFromHTMLElement(element: HTMLElement) {
        let tileElement = element;

        while (tileElement && tileElement.tagName !== 'DEJA-TILE') {
            tileElement = tileElement.parentElement;
            if (tileElement === this.container) {
                return undefined;
            }
        }

        return tileElement;
    }

    public getTileComponentFromHTMLElement(element: HTMLElement): DejaTile {
        const tileElement = this.getTileElementFromHTMLElement(element);
        return tileElement && this.tilesDic[tileElement.id];
    }

    public deleteTiles(tilesToDelete: DejaTile[]) {
        if (!tilesToDelete || tilesToDelete.length === 0) {
            return;
        }

        // For event after removed finished
        const event = new CustomEvent('DejaTilesModelEvent', { cancelable: false }) as IDejaTilesModelEvent;
        event.removed = tilesToDelete.map((tile) => tile.toTileModel());

        tilesToDelete.forEach((tile) => {
            delete this.tilesDic[tile.id];
            tile.delete();
        });

        let index = this._tiles.length;
        while (--index >= 0) {
            const tile = this._tiles[index];
            if (!this.tilesDic[tile.id]) {
                this._tiles.splice(index, 1);
            }
        }

        this.refreshTiles$.next({ resetWidth: true });

        event.tiles = this._tiles.map((tile) => tile.toTileModel());
        this.modelChanged.emit(event);
    }

    public removeTiles(tileIdsToRemove: string[]) {
        if (!tileIdsToRemove || tileIdsToRemove.length === 0) {
            return;
        }

        const tilesToRemove = tileIdsToRemove.map((id) => this.tilesDic[id]);

        // Delete selected tiles components
        tilesToRemove.forEach((tile) => {
            tile.isHidden = true;
        });

        const event = new CustomEvent('DejaTilesRemoveEvent', { cancelable: true }) as IDejaTilesRemoveEvent;
        event.tiles = this.tiles.map((tile) => tile.toTileModel());
        event.removed = tilesToRemove.map((tile) => tile.toTileModel());
        event.cancel$ = new Subject();

        const cancelSubscription = event.cancel$
            .first()
            .subscribe((value) => {
                if (value) {
                    tilesToRemove.forEach((tile) => tile.isHidden = false);
                } else {
                    this.deleteTiles(tilesToRemove);
                }
            });

        // Remove immediately
        Observable.timer(1000)
            .first()
            .filter(() => !event.defaultPrevented)
            .subscribe(() => {
                cancelSubscription.unsubscribe();
                this.deleteTiles(tilesToRemove);
            });

        // Forward event
        this.contentRemoving.next(event);
    }

    public createTiles(tiles: IDejaTile[]) {
        if (!tiles || tiles.length === 0) {
            return;
        }

        this.addTiles(tiles.map((tile) => this.createTile(tile)));
    }

    public getFreePlace(idealBounds: Rect) {
        const containerBounds = this.container.getBoundingClientRect();
        const percentHeight = this.getPercentSize(containerBounds.height);
        const freePlaces = [] as Rect[];
        for (let x = 0; x <= this.maxWidth - idealBounds.width; x += this.tileMinWidth) {
            for (let y = 0; y <= percentHeight - idealBounds.height; y += this.tileMinHeight) {
                const currentBounds = new Rect(x, y, idealBounds.width, idealBounds.height);

                if (this.tiles.filter((t) => t.percentBounds.intersectWith(currentBounds)).length === 0) {
                    freePlaces.push(currentBounds);
                }
            }
        }

        if (freePlaces.length > 0) {
            // add at the nearest free place
            freePlaces.sort((bounds1, bounds2) => {
                const calcDistance = (bounds) => { return Math.min(Math.abs(bounds.left - idealBounds.left), Math.abs(bounds.right - idealBounds.right)) + 2 * Math.min(Math.abs(bounds.top - idealBounds.top), Math.abs(bounds.bottom - idealBounds.bottom)); };
                return calcDistance(bounds1) - calcDistance(bounds2);
            });

            return freePlaces[0];
        }

        let maxHeight = 0;
        this.tiles.forEach((t) => {
            if (t.percentBounds.bottom > maxHeight) {
                maxHeight = t.percentBounds.bottom;
            }
        });

        // Add at the end
        return new Rect(0, maxHeight, idealBounds.width, idealBounds.height);
    }

    public moveTile(id: string, bounds: Rect) {
        const tile = this.tiles.find((t) => t.id === id);
        if (tile) {
            tile.percentBounds = bounds;
            this.refreshTiles$.next();
        }
    }

    public HitTest(pixelBounds: Rect) {
        const percentBounds = new Rect(this.getPercentSize(pixelBounds.left), this.getPercentSize(pixelBounds.top), this.getPercentSize(pixelBounds.width), this.getPercentSize(pixelBounds.height));
        return this.tiles.filter((t) => t.percentBounds.intersectWith(percentBounds));
    }

    public getPercentSize(value: number): number {
        return Math.round(value * 100 / this.hundredPercentWith);
    }

    // Drag and drop from outside provider
    public dragEnter(dragContext: IDragDropContext, dragCursor: IDragCursorInfos) {
        if (!this.designMode) {
            return false;
        }

        const tile = dragContext['IDejaTile'] as IDejaTile;
        if (!tile) {
            return false;
        }

        const containerBounds = this._container.getBoundingClientRect();
        const { pageX, pageY } = dragCursor.originalEvent;

        const x = pageX - containerBounds.left;
        const y = pageY - containerBounds.top;

        // Create a temporary tile for drag and drop
        tile.id = '#temp';
        const tempTile = new DejaTile(tile);
        tempTile.isTemporary = true;

        this.dragDropInfos$.next({
            enabled: false,
            startX: x,
            startY: y,
            tiles: [tempTile],
        } as IDragDropInfos);

        return true;
    }

    public startDrag(tiles: DejaTile[], pageX: number, pageY: number) {
        // Save layout
        const savedLayout = this.saveLayout();

        // Bring all tiles together
        let targetBounds: Rect;
        tiles.forEach((tile) => {
            targetBounds = targetBounds ? Rect.union
                (targetBounds, tile.percentBounds) : tile.percentBounds;
            tile.isDragging = true;
        });

        this.dragRelativePosition = {};
        tiles.forEach((tile) => { this.dragRelativePosition[tile.id] = new Position(tile.percentBounds.left - targetBounds.left, tile.percentBounds.top - targetBounds.top); });

        this.dragPageOffset = new Position(pageX, pageY);

        this.dragOriginalPosition = new Position(targetBounds.left, targetBounds.top);

        this.targetBounds = savedLayout.targetBounds = savedLayout.validBounds = targetBounds;
        this.originalLayout = savedLayout;
        this.validLayout = undefined;
    }

    public expandTile(tile: IDejaTile, pixelheight: number) {
        // Save layout
        const t = tile.id ? this.tilesDic[tile.id] : this.tiles.find((tt) => tt.equalsTo(tile));

        if (this.beforeSizeLayout) {
            this.restoreLayout(this.beforeSizeLayout);
        } else {
            this.beforeSizeLayout = this.saveLayout();
        }
        this.expandedTile = t;
        t.isExpanded = true;
        const percentHeight = Math.ceil(pixelheight * 100 / this.hundredPercentWith);
        const bottom = t.percentBounds.top + percentHeight;
        this.size(t, new Position(0, this.getPixelSize(bottom)), Directions.bottom);
    }

    public cancelExpand() {
        if (this.beforeSizeLayout) {
            this.expandedTile.isExpanded = false;
            this.restoreLayout(this.beforeSizeLayout);
            this.refreshTiles$.next();
            this.beforeSizeLayout = undefined;
        }
    }

    public cancelDrag(tiles: DejaTile[]) {
        if (this.moveTimout) {
            this.moveTimout.unsubscribe();
            this.moveTimout = undefined;
        }

        Observable.from(tiles)
            .filter((tile) => !!tile)
            .do((tile) => {
                tile.isDragging = false;
                tile.isDropping = true;
            })
            .delay(1000)
            .subscribe((tile) => { tile.isDropping = false; });

        // Restore original layout
        if (this.originalLayout) {
            this.restoreLayout(this.originalLayout);
        }

        this.endDrag();
    }

    public drop(tiles: DejaTile[]) {
        let changed: DejaTile[];

        if (this.moveTimout) {
            this.moveTimout.unsubscribe();
            this.moveTimout = undefined;
        }

        if (this.validLayout) {
            this.restoreLayout(this.validLayout);

            if (this._cursor !== 'move') {
                // Only one tile can be resized at time
                const tile = tiles[0];
                tile.percentBounds = new Rect(this.validLayout.validBounds);
                tile.isDragging = false;
            } else {
                Observable.from(tiles)
                    .filter((tile) => !!tile)
                    .do((tile) => {
                        const left = this.validLayout.validBounds.left + this.dragRelativePosition[tile.id].left;
                        const top = this.validLayout.validBounds.top + this.dragRelativePosition[tile.id].top;
                        tile.percentBounds = new Rect(left, top, tile.percentBounds.width, tile.percentBounds.height);
                        tile.isDragging = false;
                        tile.isDropping = true;
                        if (tile.id === '#temp') {
                            tile.makeId();
                            this.tilesDic[tile.id] = tile;
                            delete this.tilesDic['#temp'];

                            this.addTiles([tile]);
                        }
                    })
                    .delay(1000)
                    .subscribe((tile) => { tile.isDropping = false; });
            }

            changed = this.tiles.filter((t) => !Rect.equals(t.percentBounds, this.originalLayout[t.id] && this.originalLayout[t.id].bounds));
            this.endDrag();
        } else {
            this.removeTemporaryTile();
            this.cancelDrag(tiles);
        }

        if (changed) {
            const event = new CustomEvent('DejaTilesEvent', { cancelable: true }) as IDejaTilesEvent;
            event.tiles = this.tiles.map((tile) => tile.toTileModel());
            this.layoutChanged.emit(event);
        }

        return changed;
    }

    public endDrag() {
        this.originalLayout = undefined;
        this.validLayout = undefined;
        this.targetBounds = undefined;
        this.dragging$.next(false);
        this.dragDropInfos$.next(null);
        this.dragTarget = undefined;
        this.copyTiles(null);
        this.refreshTiles$.next();
    }

    public drag(tiles: DejaTile[], pageX: number, pageY: number) {
        // Search related coords
        const offset = new Position(pageX - this.dragPageOffset.left, pageY - this.dragPageOffset.top);
        const offsetLeft = offset.left + this.getPixelSize(this.dragOriginalPosition.left);
        const offsetTop = offset.top + this.getPixelSize(this.dragOriginalPosition.top);

        const sizemin = this.getTileMinPixelSize();
        const sizemax = this.getTileMaxPixelSize();

        if (this._cursor !== 'move') {
            // Only one tile can be resized at time
            const tile = tiles[0];
            const bounds = this.getPixelBounds(tile.percentBounds);
            const offsetRight = offsetLeft + bounds.width;
            const offsetBottom = offsetTop + bounds.height;
            const right = bounds.right;
            const bottom = bounds.bottom;
            switch (this._cursor) {
                case 'nw-resize':
                    bounds.left = Math.max(Math.min(offsetLeft, bounds.right - sizemin.width), bounds.right - sizemax.width);
                    bounds.right = right;
                    bounds.top = Math.max(Math.min(offsetTop, bounds.bottom - sizemin.height), bounds.bottom - sizemax.height);
                    bounds.bottom = bottom;
                    this.size(tile, new Position(offsetLeft, offsetTop), Directions.left + Directions.top);
                    break;
                case 'sw-resize':
                    bounds.left = Math.max(Math.min(offsetLeft, bounds.right - sizemin.width), bounds.right - sizemax.width);
                    bounds.right = right;
                    bounds.bottom = Math.max(Math.min(offsetBottom, bounds.top + sizemax.height), bounds.top + sizemin.height);
                    this.size(tile, new Position(offsetLeft, offsetBottom), Directions.left + Directions.bottom);
                    break;
                case 'w-resize':
                    bounds.left = Math.max(Math.min(offsetLeft, bounds.right - sizemin.width), bounds.right - sizemax.width);
                    bounds.right = right;
                    this.size(tile, new Position(offsetLeft, 0), Directions.left);
                    break;
                case 'ne-resize':
                    bounds.right = Math.max(Math.min(offsetRight, bounds.left + sizemax.width), bounds.left + sizemin.width);
                    bounds.top = Math.max(Math.min(offsetTop, bounds.bottom - sizemin.height), bounds.bottom - sizemax.height);
                    bounds.bottom = bottom;
                    this.size(tile, new Position(offsetRight, offsetTop), Directions.right + Directions.top);
                    break;
                case 'se-resize':
                    bounds.right = Math.max(Math.min(offsetRight, bounds.left + sizemax.width), bounds.left + sizemin.width);
                    bounds.bottom = Math.max(Math.min(offsetBottom, bounds.top + sizemax.height), bounds.top + sizemin.height);
                    this.size(tile, new Position(offsetRight, offsetBottom), Directions.right + Directions.bottom);
                    break;
                case 'e-resize':
                    bounds.right = Math.max(Math.min(offsetRight, bounds.left + sizemax.width), bounds.left + sizemin.width);
                    this.size(tile, new Position(offsetRight, 0), Directions.right);
                    break;
                case 'n-resize':
                    bounds.top = Math.max(Math.min(offsetTop, bounds.bottom - sizemin.height), bounds.bottom - sizemax.height);
                    bounds.bottom = bottom;
                    this.size(tile, new Position(0, offsetTop), Directions.top);
                    break;
                case 's-resize':
                    bounds.bottom = Math.max(Math.min(offsetBottom, bounds.top + sizemax.height), bounds.top + sizemin.height);
                    this.size(tile, new Position(0, offsetBottom), Directions.bottom);
                    break;
                default:
                    throw new Error('Invalid direction');
            }
            tile.pixelBounds = bounds;

        } else {
            tiles.forEach((tile) => { tile.pixelBounds = new Rect(offsetLeft + this.getPixelSize(this.dragRelativePosition[tile.id].left), offsetTop + this.getPixelSize(this.dragRelativePosition[tile.id].top), this.getPixelSize(tile.percentBounds.width), this.getPixelSize(tile.percentBounds.height)); });

            // Assign new drag and drop rectangle
            this.dragTarget = new Rect(this.getPercentSize(offsetLeft), this.getPercentSize(offsetTop), this.targetBounds.width, this.targetBounds.height, );

            this.move();
        }
    }

    public addTiles(newTiles: DejaTile[]) {
        if (!newTiles || newTiles.length === 0) {
            return;
        }

        newTiles.forEach((newTile) => {
            if (!this.tiles.find((t) => t.id === newTile.id)) {
                newTile.percentBounds = this.getFreePlace(newTile.percentBounds);
                this._tiles.push(newTile);
            }
        });

        const event = new CustomEvent('DejaTilesAddEvent', { cancelable: true }) as IDejaTilesAddEvent;
        event.tiles = this.tiles.map((tile) => tile.toTileModel());
        event.added = newTiles.map((tile) => tile.toTileModel());
        event.cancel$ = new Subject();

        // Delete provider if cut operation
        const deleteSourceProvider$ = this.clipboardService && this.clipboardService.get('tiles-provider') as Subject<DejaTile[]>;

        // Hide originals if cut
        let sourceTiles: DejaTile[];
        if (deleteSourceProvider$) {
            sourceTiles = this.clipboardService.get('tiles') as DejaTile[];
            sourceTiles.forEach((tile) => {
                tile.isHidden = true;
            });
        }

        const deleteSourceTiles = () => {
            if (sourceTiles) {
                deleteSourceProvider$.next(sourceTiles);
                this.clipboardService.clear();
            }
        };

        newTiles.forEach((tile) => {
            tile.isPending = true;
        });

        const validateNewTiles = (tiles: DejaTile[]) => {
            tiles.forEach((tile) => {
                tile.isPending = false;
            });
            // Remove original tiles if cut operation
            deleteSourceTiles();

            const e = new CustomEvent('DejaTilesModelEvent', { cancelable: false }) as IDejaTilesModelEvent;
            e.tiles = this._tiles.map((tile) => tile.toTileModel());
            e.added = tiles.map((tile) => tile.toTileModel());
            this.modelChanged.emit(e);
        };

        const cancelSubscription = event.cancel$
            .first()
            .subscribe((value) => {
                if (value) {
                    // Canceled, hide and remove added after effect
                    Observable.from(newTiles)
                        .do((tile) => tile.isHidden = true)
                        .delay(1000)
                        .reduce((acc, curr) => {
                            acc.push(curr);
                            return acc;
                        }, [])
                        .first()
                        .subscribe((tiles) => this.deleteTiles(tiles));

                    // Reshow original tiles if cut operation
                    if (sourceTiles) {
                        sourceTiles.forEach((tile) => {
                            tile.isHidden = false;
                            tile.isCutted = true;
                        });
                    }
                } else {
                    validateNewTiles(newTiles);
                }
            });

        // Add immediately
        Observable.timer(1000)
            .first()
            .filter(() => !event.defaultPrevented)
            .subscribe(() => {
                cancelSubscription.unsubscribe();
                validateNewTiles(newTiles);
            });

        // Get total rectangle
        let bounds: Rect;
        newTiles.forEach((tile) => {
            bounds = bounds ? Rect.union(bounds, tile.percentBounds) : new Rect(tile.percentBounds);
        });

        this.refreshTiles$.next({ ensureBounds: bounds });

        this.contentAdding.emit(event);
    }

    private size(tile: DejaTile, pixelpos: Position, directions: Directions) {
        // Calc new tile bounds
        const percentPos = new Position(this.getPercentSize(pixelpos.left), this.getPercentSize(pixelpos.top));
        const dragBounds = tile.percentBounds.clone();
        const newTargetBounds = tile.percentBounds.clone();
        let minWidth: number;
        let minHeight: number;
        let maxWidth: number;
        let maxHeight: number;

        // tslint:disable-next-line:no-bitwise
        if (directions & Directions.left) {
            minWidth = this.getTileMinPercentWidth();
            maxWidth = this.getTileMaxPercentWidth();
            const dleft = percentPos.left;
            const tleft = dragBounds.left < dleft ? minWidth * Math.ceil(dleft / minWidth) : minWidth * Math.floor(dleft / minWidth);
            const twidth = Math.min(maxWidth, Math.max(minWidth, newTargetBounds.right - tleft));
            dragBounds.width = dragBounds.right - dleft;
            dragBounds.left = dleft;
            newTargetBounds.left = newTargetBounds.right - twidth;
            newTargetBounds.width = twidth;
        }
        // tslint:disable-next-line:no-bitwise
        if (directions & Directions.right) {
            minWidth = minWidth || this.getTileMinPercentWidth();
            maxWidth = maxWidth || this.getTileMaxPercentWidth();
            const dright = percentPos.left;
            const tright = dragBounds.right < dright ? minWidth * Math.ceil(dright / minWidth) : minWidth * Math.floor(dright / minWidth);
            dragBounds.width = dright - dragBounds.left;
            newTargetBounds.width = Math.min(maxWidth, Math.max(minWidth, tright - newTargetBounds.left));
        }
        // tslint:disable-next-line:no-bitwise
        if (directions & Directions.top) {
            minHeight = this.getTileMinPercentHeight();
            maxHeight = this.getTileMaxPercentHeight();
            const dtop = percentPos.top;
            const ttop = dragBounds.top < dtop ? minHeight * Math.ceil(dtop / minHeight) : minHeight * Math.floor(dtop / minHeight);
            const theight = Math.min(maxHeight, Math.max(minHeight, newTargetBounds.bottom - ttop));
            dragBounds.height = dragBounds.bottom - dtop;
            dragBounds.top = dtop;
            newTargetBounds.top = newTargetBounds.bottom - theight;
            newTargetBounds.height = theight;
        }
        // tslint:disable-next-line:no-bitwise
        if (directions & Directions.bottom) {
            minHeight = minHeight || this.getTileMinPercentHeight();
            maxHeight = maxHeight || this.getTileMaxPercentHeight();
            const dbottom = percentPos.top;
            const tbottom = dragBounds.bottom < dbottom ? minHeight * Math.ceil(dbottom / minHeight) : minHeight * Math.floor(dbottom / minHeight);
            dragBounds.height = dbottom - dragBounds.top;
            newTargetBounds.height = Math.min(maxHeight, Math.max(minHeight, tbottom - newTargetBounds.top));
        }

        if (Rect.equals(newTargetBounds, this.destination)) {
            // Nothing change, wait for timers
            return;
        }

        // Restore a previous layout if exists for this position
        if (tile.isExpanded) {
            const ensureBounds = this.ensureTarget(newTargetBounds, dragBounds, directions);
            tile.percentBounds = ensureBounds;
            this.refreshTiles$.next();
        } else {
            // Restore the original layout before moving something
            this.restoreLayout(this.originalLayout);

            this.destination = newTargetBounds.clone();

            // Check if location is free without pushing tiles
            const result = this.tiles.find((t) => !t.isDragging && t.percentBounds.intersectWith(newTargetBounds));

            if (!result) {
                this.targetBounds = newTargetBounds;

                // Save layout
                this.validLayout = this.saveLayout();
                this.validLayout.targetBounds = this.validLayout.validBounds = newTargetBounds;
                this.refreshTiles$.next();
            } else {
                // Location must be freed
                if (newTargetBounds) {
                    // Ensure new destination
                    const ensureBounds = this.ensureTarget(newTargetBounds, dragBounds, directions);
                    if (ensureBounds) {
                        this.targetBounds = ensureBounds;
                        this.validLayout = this.saveLayout();
                        this.validLayout.targetBounds = newTargetBounds;
                        this.validLayout.validBounds = ensureBounds;
                        this.refreshTiles$.next();
                    }
                }
            }
        }
    }

    private move() {
        const minWidth = this.getTileMinPercentWidth();
        const minHeight = this.getTileMinPercentHeight();

        // Search a new target
        const newTargetBounds = this.ensureContainer(new Rect(minWidth * Math.round(this.dragTarget.left / minWidth), minHeight * Math.round(this.dragTarget.top / minHeight), this.dragTarget.width, this.dragTarget.height, ));

        if (this.lastTargetBounds && Math.abs(newTargetBounds.left - this.lastTargetBounds.left) < 3 && Math.abs(newTargetBounds.top - this.lastTargetBounds.top) < 3) {
            // Nothing change, wait for timers
            return;
        }
        this.lastTargetBounds = newTargetBounds;

        if (this.moveTimout) {
            this.moveTimout.unsubscribe();
            this.moveTimout = undefined;
        }

        // Restore the original layout before moving something
        this.restoreLayout(this.originalLayout);

        // Check if location is free without pushing tiles
        const result = this.tiles.find((tile: DejaTile) => !tile.isDragging && tile.percentBounds.intersectWith(newTargetBounds));

        if (!result) {
            this.targetBounds = newTargetBounds.clone();
            this.destination = newTargetBounds.clone();

            // Save layout
            this.validLayout = this.saveLayout();
            this.validLayout.targetBounds = this.validLayout.validBounds = newTargetBounds;
            this.refreshTiles$.next();
        } else {
            // Location must be freed, timer
            this.moveTimout = Observable.timer(500)
                .first()
                .subscribe(() => {
                    // console.log('moveTimer timer');
                    this.moveTimout = undefined;

                    this.destination = newTargetBounds.clone();
                    if (newTargetBounds) {
                        // Ensure new destination
                        const ensureBounds = this.ensureTarget(newTargetBounds, this.dragTarget, Directions.all);
                        if (ensureBounds) {
                            this.targetBounds = ensureBounds;
                            this.validLayout = this.saveLayout();
                            this.validLayout.targetBounds = newTargetBounds;
                            this.validLayout.validBounds = ensureBounds;
                            this.refreshTiles$.next();
                        }
                    }
                });
        }
    }

    // Ensure that the specified bounds are inside the tiles area. Return the corrected rectangle.
    private ensureContainer(percentBounds: Rect): Rect {
        if (percentBounds.left < 0) {
            percentBounds = percentBounds.offset(-percentBounds.left, 0);
        }

        if (percentBounds.top < 0) {
            percentBounds = percentBounds.offset(0, -percentBounds.top);
        }

        const maxPercentWidth = this.getMaxPercentWidth();
        if (maxPercentWidth && percentBounds.right > maxPercentWidth) {
            percentBounds = percentBounds.offset(maxPercentWidth - percentBounds.right, 0);
        }

        const maxPercentHeight = this.getMaxPercentHeight();
        if (maxPercentHeight && percentBounds.bottom > maxPercentHeight) {
            percentBounds = percentBounds.offset(0, maxPercentHeight - percentBounds.bottom);
        }

        return percentBounds;
    }

    // Ensure that a tile can be dropped at the specified bounds. Return the corrected rectangle.
    private ensureTarget(bounds: Rect, effectiveBounds?: Rect, directions?: Directions, originalBounds?: Rect): Rect {
        if (!effectiveBounds) {
            effectiveBounds = bounds;
        }

        // Backup bounds
        if (!originalBounds) {
            originalBounds = bounds.clone();
        }

        if (!directions) {
            directions = Directions.all;
        } else {
            // We always can escape to the bottom in case of
            // tslint:disable-next-line:no-bitwise
            directions |= Directions.bottom;
        }

        const tilesToPush = {} as { [direction: number]: DejaTile[] };
        tilesToPush[Directions.left] = [];
        tilesToPush[Directions.right] = [];
        tilesToPush[Directions.top] = [];
        tilesToPush[Directions.bottom] = [];

        // tslint:disable-next-line:prefer-for-of
        for (const id in this.tilesDic) {
            if (this.tilesDic[id]) {
                const tile = this.tilesDic[id];
                if (!tile.isDragging && !tile.isExpanded) {
                    if (tile.percentBounds.intersectWith(bounds)) {
                        const swapTargetRect = new Rect(this.dragOriginalPosition.left, this.dragOriginalPosition.top, bounds.width, bounds.height);
                        if (tile.percentBounds.left === effectiveBounds.left && tile.percentBounds.top === effectiveBounds.top && tile.percentBounds.width === effectiveBounds.width && tile.percentBounds.height === effectiveBounds.height && effectiveBounds.adjacent(swapTargetRect)) {
                            // swap
                            tile.percentBounds = swapTargetRect;
                            return bounds;
                        } else {
                            const hol = tile.percentBounds.left - effectiveBounds.left;      // Ce qui depasse a  gauche
                            const hor = effectiveBounds.right - tile.percentBounds.right;    // Ce qui depasse a  droite
                            const vot = tile.percentBounds.top - effectiveBounds.top;        // Ce qui depasse en haut
                            const vob = effectiveBounds.bottom - tile.percentBounds.bottom;  // Ce qui depasse en bas
                            const hoe = Math.max(0, Math.min(tile.percentBounds.right, effectiveBounds.right) - Math.max(tile.percentBounds.left, effectiveBounds.left)) / Math.min(tile.percentBounds.width, effectiveBounds.width);
                            const voe = Math.max(0, Math.min(tile.percentBounds.bottom, effectiveBounds.bottom) - Math.max(tile.percentBounds.top, effectiveBounds.top)) / Math.min(tile.percentBounds.height, effectiveBounds.height);

                            // Calc prefered direction
                            let preferedDirection: Directions;
                            // tslint:disable-next-line:no-bitwise
                            if (voe >= hoe && directions & Directions.horizontal) {
                                // horizontal
                                // tslint:disable-next-line:no-bitwise
                                preferedDirection = hor >= hol && directions & Directions.left ? Directions.left : Directions.right;
                            } else {
                                // vertical
                                // tslint:disable-next-line:no-bitwise
                                preferedDirection = vob >= vot && directions & Directions.top ? Directions.top : Directions.bottom;
                            }
                            tilesToPush[preferedDirection].push(tile);
                        }
                    }
                }
            }
        }

        // try first horizontal move
        let remain = 0;
        if (tilesToPush[Directions.left].length) {
            remain = this.pushHorizontal(bounds, -1, tilesToPush[Directions.left]);
            if (remain) {
                bounds = this.ensureContainer(bounds.offset(remain, 0));
                // tslint:disable-next-line:no-bitwise
                return this.ensureTarget(bounds, effectiveBounds, directions & ~Directions.left, originalBounds);
            }
        }

        // Now try right
        if (tilesToPush[Directions.right].length) {
            remain = this.pushHorizontal(bounds, 1, tilesToPush[Directions.right]);
        }

        if (remain > 0) {
            // No horizontal place, restore original position
            this.restoreLayout(this.originalLayout);
            // tslint:disable-next-line:no-bitwise
            return this.ensureTarget(originalBounds, effectiveBounds, directions & Directions.vertical);
        } else {
            // Try top
            if (tilesToPush[Directions.top].length) {
                remain = this.pushVertical(bounds, -1, tilesToPush[Directions.top]);
                if (remain) {
                    bounds = this.ensureContainer(bounds.offset(0, remain));
                    return this.ensureTarget(bounds, effectiveBounds, Directions.bottom);
                }
            }

            // And finally bottom
            remain = this.pushVertical(bounds, 1, tilesToPush[Directions.bottom]);
            if (remain) {
                // Destination is not available, keep tile at the original place
                return null;
            }
        }

        return bounds;
    }

    private saveLayout(): ILayoutInfos {
        const layout = {} as ILayoutInfos;
        layout.height = this.getTileMinPercentHeight();
        this.tiles.forEach((tile) => {
            const y = this.getPixelSize(tile.percentBounds.top || 0);
            const h = this.getPixelSize(tile.percentBounds.height || this.tileMinHeight);
            if (y + h > layout.height) {
                layout.height = y + h;
            }
            layout[tile.id] = {
                bounds: tile.percentBounds.clone(),
                id: tile.id,
            } as ILayoutInfo;
        });

        return layout;
    }

    private getPixelBounds(rect: Rect) { return Rect.fromLTRB(Math.round(rect.left * this.hundredPercentWith / 100), Math.round(rect.top * this.hundredPercentWith / 100), Math.round(rect.right * this.hundredPercentWith / 100), Math.round(rect.bottom * this.hundredPercentWith / 100)); }

    private getPixelSize(value: number, unit?: string): number {
        if (!unit || unit === '%') {
            return Math.round(value * this.hundredPercentWith / 100);
        } else {
            return value;
        }
    }

    private getSizePercentLimit(prop: string): number {
        const unit = this[prop + 'Unit'];
        if (!unit || unit === 'px') {
            return this.getPercentSize(this[prop]);
        } else {
            return this[prop];
        }
    }

    private getSizePixelLimit(prop: string): number {
        const unit = this[prop + 'Unit'];
        if (!unit || unit === 'px') {
            return this[prop];
        } else {
            return this.getPixelSize(this[prop]);
        }
    }

    private getTileMinPixelSize(): Size { return new Size(this.getSizePixelLimit('tileMinWidth'), this.getSizePixelLimit('tileMinHeight')); }

    private getTileMaxPixelSize(): Size { return new Size(this.getSizePixelLimit('tileMaxWidth'), this.getSizePixelLimit('tileMaxHeight')); }

    private getTileMinPercentWidth(): number { return this.getSizePercentLimit('tileMinWidth'); }

    private getTileMaxPercentWidth(): number { return this.getSizePercentLimit('tileMaxWidth'); }

    private getTileMinPercentHeight(): number { return this.getSizePercentLimit('tileMinHeight'); }

    private getTileMaxPercentHeight(): number { return this.getSizePercentLimit('tileMaxHeight'); }

    private getMaxPercentWidth(): number { return this.getSizePercentLimit('maxWidth'); }

    private getMaxPercentHeight(): number { return this.getSizePercentLimit('maxHeight'); }

    private getCursorFromHTMLElement(x: number, y: number, element: HTMLElement) {
        const tileElement = this.getTileElementFromHTMLElement(element);
        if (!tileElement) {
            return null;
        }

        const bounds = tileElement.getBoundingClientRect();

        if (x < bounds.left + 10) {
            if (y < bounds.top + 10) {
                return 'nw-resize';
            } else if (y > bounds.bottom - 10) {
                return 'sw-resize';
            } else {
                return 'w-resize';
            }
        } else if (x > bounds.right - 10) {
            if (y < bounds.top + 10) {
                return 'ne-resize';
            } else if (y > bounds.bottom - 10) {
                return 'se-resize';
            } else {
                return 'e-resize';
            }
        } else {
            if (y < bounds.top + 10) {
                return 'n-resize';
            } else if (y > bounds.bottom - 10) {
                return 's-resize';
            } else {
                return 'move';
            }
        }
    }

    private extractValueAndUnit(prop: string, value: string) {
        const regexp = /(\d+)(.*)/i;
        const matches = regexp.exec(value);

        if (matches && matches.length >= 1) {
            this[prop] = parseInt(matches[1], 10);
            if (matches.length >= 2) {
                this[prop + 'Unit'] = matches[2];
            } else {
                this[prop + 'Unit'] = 'px';
            }
        }
    };

    private restoreLayout(layout: ILayoutInfos) {
        this.tiles.forEach((tile) => {
            const config = layout[tile.id] as ILayoutInfo;
            tile.percentBounds = config.bounds.clone();
        });
    }

    private calcHorizontalOverflow(direction: number, tiles: DejaTile[], offset: number, blackList?: Object): number {
        let overflow = 0;
        blackList = blackList || {};

        tiles.forEach((t) => {
            if (!blackList[t.id]) {
                blackList[t.id] = t.id;

                const tryBounds = t.percentBounds.offset(direction * offset, 0);
                let roffset = 0;
                const maxWidth = this.getMaxPercentWidth();
                if (tryBounds.left < 0) {
                    roffset = -tryBounds.left;
                } else if (maxWidth && tryBounds.right > maxWidth) {
                    roffset = tryBounds.right - maxWidth;
                }

                const adjacentTiles = this.tiles.filter((tile: DejaTile) => !tile.isDragging && !tile.equalsTo(t) && tile.percentBounds.intersectWith(tryBounds));

                if (adjacentTiles.length) {
                    roffset += this.calcHorizontalOverflow(direction, adjacentTiles, offset, blackList);
                }

                if (roffset > overflow) {
                    overflow = roffset;
                }
            }
        });

        return overflow;
    }

    private moveHorizontal(direction: number, tiles: DejaTile[], offset: number, targetBounds: { [id: number]: Rect }) {
        tiles.forEach((t) => {
            if (!targetBounds[t.id]) {
                // Offset tile
                const newBounds = targetBounds[t.id] = t.percentBounds.offset(direction * offset, 0);
                const adjacentTiles = this.tiles.filter((tile: DejaTile) => !tile.isDragging && !tile.equalsTo(t) && tile.percentBounds.intersectWith(newBounds));

                if (adjacentTiles.length) {
                    this.moveHorizontal(direction, adjacentTiles, offset, targetBounds);
                }
            }
        });
    }

    private pushHorizontal(bounds: Rect, direction: number, tiles?: DejaTile[], offset?: number): number {
        let overflow = 0;
        const targetBounds = {} as { [id: number]: Rect };

        if (!offset) {
            offset = 0;
            tiles.forEach((t) => {
                const ho = direction > 0 ? Math.max(0, bounds.right - t.percentBounds.left) : Math.max(0, t.percentBounds.right - bounds.left);
                if (ho > offset) {
                    offset = ho;
                }
            });
        }

        if (offset > 0) {
            // Calc overflow space if all specified tiles are moved
            overflow = this.calcHorizontalOverflow(direction, tiles, offset);
            offset -= overflow;
            if (offset > 0) {
                this.moveHorizontal(direction, tiles, offset, targetBounds);

                //  bounds array to tiles
                this.tiles.forEach((t) => {
                    if (targetBounds[t.id]) {
                        t.percentBounds = targetBounds[t.id];
                    }
                });
            }
        }

        return overflow;
    }

    private calcVerticalOverflow(direction: number, tiles: DejaTile[], offset: number, blackList?: Object): number {
        let overflow = 0;
        blackList = blackList || {};

        tiles.forEach((t) => {
            if (!blackList[t.id]) {
                blackList[t.id] = t.id;

                // Offset tile
                const tryBounds = t.percentBounds.offset(0, direction * offset);
                let roffset = 0;
                const maxHeight = this.getMaxPercentHeight();
                if (tryBounds.top < 0) {
                    roffset = -tryBounds.top;
                } else if (maxHeight && tryBounds.bottom > maxHeight) {
                    roffset = tryBounds.bottom - maxHeight;
                }

                const adjacentTiles = this.tiles.filter((tile: DejaTile) => !tile.isDragging && !tile.equalsTo(t) && tile.percentBounds.intersectWith(tryBounds));

                if (adjacentTiles.length) {
                    roffset += this.calcVerticalOverflow(direction, adjacentTiles, offset, blackList);
                }

                if (roffset > overflow) {
                    overflow = roffset;
                }
            }
        });

        return overflow;
    }

    private moveVertical(direction: number, tiles: DejaTile[], offset: number, targetBounds: { [id: number]: Rect }) {
        tiles.forEach((t) => {
            if (!targetBounds[t.id]) {
                // Offset tile
                const newBounds = targetBounds[t.id] = t.percentBounds.offset(0, direction * offset);
                const adjacentTiles = this.tiles.filter((tile: DejaTile) => !tile.isDragging && !tile.equalsTo(t) && tile.percentBounds.intersectWith(newBounds));

                if (adjacentTiles.length) {
                    this.moveVertical(direction, adjacentTiles, offset, targetBounds);
                }
            }
        });
    }

    private pushVertical(bounds: Rect, direction: number, tiles: DejaTile[], offset?: number): number {
        let overflow = 0;
        const targetBounds = {} as { [id: number]: Rect };

        if (!offset) {
            offset = 0;
            tiles.forEach((t) => {
                const vo = direction > 0 ? Math.max(0, bounds.bottom - t.percentBounds.top) : Math.max(0, t.percentBounds.bottom - bounds.top);
                if (vo > offset) {
                    offset = vo;
                }
            });
        }

        if (offset > 0) {
            // Calc overflow space if all specified tiles are moved
            overflow = this.calcVerticalOverflow(direction, tiles, offset);
            offset -= overflow;
            if (offset > 0) {
                this.moveVertical(direction, tiles, offset, targetBounds);

                //  bounds array to tiles
                this._tiles.forEach((t) => {
                    if (targetBounds[t.id]) {
                        t.percentBounds = targetBounds[t.id];
                    }
                });
            }
        }

        return overflow;
    }

    private createTile(tile: IDejaTile) {
        const newTile = new DejaTile(tile);
        this.tiles.push(newTile);
        this.tilesDic[newTile.id] = newTile;
        return newTile;
    }

    private copyTiles(tiles: DejaTile[], isCut?: boolean) {
        if (!this.clipboardService) {
            if (!tiles) {
                return;
            }
            throw new Error('DejaClipboardService must be imported by your application to use the copyTiles methode of DejaTilesComponent.');
        }

        const tt = this.clipboardService.get('tiles') as DejaTile[];
        if (tt) {
            tt.forEach((tile) => tile.isCutted = false);
        }
        this.clipboardService.set('tiles', tiles);
        if (isCut) {
            tiles.forEach((tile) => tile.isCutted = true);
            this.clipboardService.set('tiles-provider', this.deleteTiles$);
        } else {
            this.clipboardService.set('tiles-provider', undefined);
        }
    }

    private removeTemporaryTile() {
        let index = this.tiles.length;
        while (--index >= 0) {
            const tile = this.tiles[index];
            if (tile.id === '#temp') {
                this.tiles.splice(index, 1);
            }
        }
        delete this.tilesDic['#temp'];
    }
}
