/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Injectable, OnDestroy, Optional } from '@angular/core';
import { BehaviorSubject, from as observableFrom, fromEvent as observableFromEvent, merge as observableMerge, Subject, Subscription, timer as observableTimer } from 'rxjs';
import { debounceTime, delay, filter, first, map, reduce, take, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { DejaClipboardService } from '../../common/core/clipboard/clipboard.service';
import { Directions } from '../../common/core/graphics/directions';
import { Position } from '../../common/core/graphics/position';
import { Rect } from '../../common/core/graphics/rect';
import { Size } from '../../common/core/graphics/size';
import { KeyCodes } from '../../common/core/keycodes.enum';
import { IDragCursorInfos, IDragDropContext } from '../mouse-dragdrop/mouse-dragdrop.service';
import { DejaTile } from './tile.class';
import { IDejaTilesAddEvent, IDejaTilesEvent, IDejaTilesModelEvent, IDejaTilesRemoveEvent } from './tiles.event';

interface ILayoutInfo {
    id: string;
    bounds: Rect;
}

interface ILayoutInfos {
    [id: string]: any;
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
export class DejaTilesLayoutProvider implements OnDestroy {
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

    public layoutCompleted = new Subject<IDejaTilesEvent>();
    public layoutChanged = new Subject<IDejaTilesEvent>();
    public modelChanged = new Subject<IDejaTilesModelEvent>();
    public selectionChanged = new Subject<IDejaTilesEvent>();
    public contentAdding = new Subject<IDejaTilesAddEvent>();
    public contentRemoving = new Subject<IDejaTilesRemoveEvent>();

    protected _tileMinWidth = 10;
    protected _tileMinWidthUnit = '%';
    protected _tileMaxWidth = 100;
    protected _tileMaxWidthUnit = '%';
    protected _tileMinHeight = 10;
    protected _tileMinHeightUnit = '%';
    protected _tileMaxHeight = 100;
    protected _tileMaxHeightUnit = '%';
    protected _maxWidth = 100;
    protected _maxWidthUnit = '%';

    private tilesDic = {} as { [id: string]: DejaTile };
    private _tiles: DejaTile[];
    private _cursor: string;
    private _targetBounds = {} as Rect;
    private destination = {} as Rect;
    private lastTargetBounds: Rect;
    private moveTimOut: Subscription;
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
    private isAlive = true;

    private selectedIds = [] as string[];

    constructor(@Optional() private clipboardService: DejaClipboardService) {
        observableFrom(this.refreshTiles$).pipe(
            debounceTime(30),
            takeWhile(() => this.isAlive),
            tap(() => {
                this.container.style.width = '';
                this.container.style.height = '';
            }),
            delay(10),
            takeWhile(() => this.isAlive))
            .subscribe((params) => {
                const placeAtTheEnd = [] as DejaTile[];

                const containerBounds = this.container.getBoundingClientRect();
                if ((params && params.resetWidth) || !this.hundredPercentWith) {
                    this.hundredPercentWith = containerBounds.width;
                }
                let height = containerBounds.height - 20;
                let width = containerBounds.width - 20;
                let maxWidth = 0;
                let maxHeight = 0;
                const tiles = this.tiles || [];

                const selectedTileIds = [] as string[];
                tiles.forEach((tile: DejaTile) => {
                    if (tile.percentBounds && !tile.percentBounds.isEmpty()) {
                        const bounds = this.getPixelBounds(tile.percentBounds);
                        if (bounds.bottom > maxWidth) {
                            maxWidth = bounds.bottom;
                        }
                        if (bounds.right > maxHeight) {
                            maxHeight = bounds.right;
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

                let top = maxHeight;
                let left = 0;
                placeAtTheEnd.forEach((tile) => {
                    tile.percentBounds = tile.percentBounds || new Rect(this.getPercentSize(left), this.getPercentSize(top), 3 * this.getTileMinPercentWidth(), 3 * this.getTileMinPercentHeight());
                    let pixelBounds = this.getPixelBounds(tile.percentBounds);

                    if (pixelBounds.right > width) {
                        top = maxHeight;
                        left = 0;
                        tile.percentBounds.left = 0;
                        tile.percentBounds.top = this.getPercentSize(top);
                        pixelBounds = this.getPixelBounds(tile.percentBounds);
                    }

                    if (pixelBounds.bottom > maxHeight) {
                        maxHeight = pixelBounds.bottom;
                    }

                    tile.pixelBounds = this.getPixelBounds(tile.percentBounds);
                    left += pixelBounds.width;
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

                const minHeight = this.getPixelSize(2 * this._tileMinHeight, this._tileMinHeightUnit);
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

                const event = new CustomEvent('DejaTilesEvent', { cancelable: false }) as IDejaTilesEvent;
                if (placeAtTheEnd.length > 0) {
                    event.tiles = placeAtTheEnd;
                    this.layoutChanged.next(event);
                }

                event.tiles = tiles;
                this.layoutCompleted.next(event);
            });

        const ensureTile$ = observableFrom(this.ensureVisible$).pipe(
            delay(1),
            map((id) => this.tilesDic[id]),
            filter((tile) => !!tile),
            map((tile) => tile.percentBounds));

        observableMerge(this.ensureBounds$, ensureTile$).pipe(
            takeWhile(() => this.isAlive))
            .subscribe((percentBounds) => {
                const { left, right, top, bottom } = this.getPixelBounds(percentBounds);

                const findScrollContainer = (container: HTMLElement) => {
                    while (container && container.tagName !== 'DEJA-TILES') {
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

        observableFrom(this.dragSelection$).pipe(
            takeWhile(() => this.isAlive))
            .subscribe((dragSelection) => {
                const mouseUp$ = observableFromEvent(this._container.ownerDocument, 'mouseup').pipe(
                    tap(() => this.selectionRect$.next(null)));

                observableFromEvent(this._container, 'mousemove').pipe(
                    takeUntil(mouseUp$),
                    filter((event: MouseEvent) => event.buttons === 1))
                    .subscribe((event: MouseEvent) => {
                        const containerBounds = this._container.getBoundingClientRect();

                        // Select all tiles between start position and current position
                        dragSelection.selectedRect = Rect.fromPoints(dragSelection.startPosition, new Position(event.pageX - containerBounds.left, event.pageY - containerBounds.top));
                        this.selectionRect$.next(dragSelection.selectedRect);

                        const selection = this.HitTest(dragSelection.selectedRect);
                        this.selectedTiles = selection.map((tile) => tile.id);
                    });
            });

        const leave$ = observableFrom(this.dragleave$);

        observableFrom(this.dragDropInfos$).pipe(
            takeWhile(() => this.isAlive))
            .subscribe((dragDropInfos) => {
                if (!dragDropInfos || !dragDropInfos.tiles || !dragDropInfos.tiles.length) {
                    return;
                }

                const mousemove$ = observableFromEvent(this._container, 'mousemove');
                const mouseUp$ = observableFromEvent(this._container.ownerDocument, 'mouseup');
                const keyUp$ = observableFromEvent(this._container.ownerDocument, 'keyup');
                const escape$ = keyUp$.pipe(filter((event: KeyboardEvent) => event.keyCode === KeyCodes.Escape));
                const cancel$ = observableMerge(leave$, mousemove$.pipe(filter((event: MouseEvent) => event.buttons !== 1)), escape$);

                const kill$ = observableMerge(mouseUp$, cancel$);

                let mouseUp$sub: Subscription;

                const cancel$sub = cancel$.pipe(
                    take(1),
                    tap(() => mouseUp$sub.unsubscribe()))
                    .subscribe(() => {
                        this.removeTemporaryTile();
                        this.cancelDrag(dragDropInfos.tiles);
                    });

                mouseUp$sub = mouseUp$.pipe(
                    take(1),
                    tap(() => cancel$sub.unsubscribe()))
                    .subscribe(() => this.drop(dragDropInfos.tiles));

                const dragover$ = observableFrom(this.dragover$).pipe(
                    map((cursor) => cursor.originalEvent));

                observableMerge(mousemove$, dragover$).pipe(
                    takeUntil(kill$))
                    .subscribe((event: MouseEvent) => {
                        const containerBounds = this._container.getBoundingClientRect();
                        const x = event.pageX - containerBounds.left;
                        const y = event.pageY - containerBounds.top;
                        if (!dragDropInfos.enabled) {
                            if (Math.abs(dragDropInfos.startX - x) >= 10 || Math.abs(dragDropInfos.startY - y) >= 10) {
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
        observableFrom(this.deleteTiles$).pipe(
            takeWhile(() => this.isAlive))
            .subscribe((tilesToDelete) => this.deleteTiles(tilesToDelete));
    }

    public set container(container: HTMLElement) {
        this._container = container;

        if (this._container) {
            const leave$ = observableFromEvent(container, 'mouseleave');
            const mouseUp$ = observableFromEvent(container.ownerDocument, 'mouseup');

            observableFromEvent(container, 'mouseenter').pipe(
                takeWhile(() => this.isAlive))
                .subscribe(() => {
                    // Cursor provider
                    if (this.designMode) {
                        observableFromEvent(container, 'mousemove').pipe(
                            debounceTime(10),
                            takeUntil(leave$),
                            filter((event: MouseEvent) => event.buttons === 0))
                            .subscribe((event: MouseEvent) => {
                                this._cursor = this.getCursorFromHTMLElement(event.pageX, event.pageY, event.target as HTMLElement);
                                this.container.style.cursor = this._cursor;
                            });
                    } else {
                        this.container.style.cursor = '';
                    }

                    const mouseDown$ = observableFromEvent(container, 'mousedown').pipe(
                        filter((event: MouseEvent) => event.buttons === 1),
                        filter((event: MouseEvent) => !this.isElementInsideDejaEditor(event.target as HTMLElement)),
                        map((event: MouseEvent) => ({ event: event, target: event.target as HTMLElement, clickedTile: this.getTileComponentFromHTMLElement(event.target as HTMLElement) })));

                    // Pressed and selected tile observers
                    mouseDown$.pipe(takeUntil(leave$))
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

                                observableMerge(mouseUp$, leave$).pipe(
                                    first(),
                                    filter(() => !!this.currentTile))
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
    }

    public get container() {
        return this._container;
    }

    public set tiles(tiles: DejaTile[]) {
        this._tiles = tiles;
        this.tilesDic = this.tiles.reduce((dic, t) => {
            dic[t.id] = t;
            return dic;
        }, {} as { [id: string]: DejaTile });
        this.refreshTiles$.next({ resetWidth: true });
    }

    public get tiles() {
        return this._tiles || (this._tiles = []);
    }

    public set selectedTiles(selectedIds: string[]) {
        const selectedTiles = [] as DejaTile[];
        let raiseEvent = false;

        const idsDic = selectedIds.reduce((dic, id) => {
            dic[id] = true;
            return dic;
        }, {} as { [id: string]: boolean });

        const previousIdsDic = this.selectedIds.reduce((dic, id) => {
            dic[id] = true;
            return dic;
        }, {} as { [id: string]: boolean });

        if (this.tiles && this.tiles.length) {
            this.tiles.forEach((tile: DejaTile) => {
                if (idsDic[tile.id] !== previousIdsDic[tile.id]) {
                    raiseEvent = true;
                }
                tile.isSelected = idsDic[tile.id];
                if (tile.isSelected) {
                    selectedTiles.push(tile);
                }
            });
        } else {
            raiseEvent = this.selectedIds.length > 0;
        }

        this.selectedIds = selectedIds;

        if (raiseEvent) {
            const event = new CustomEvent('DejaTilesAddEvent', { cancelable: false }) as IDejaTilesEvent;
            event.tiles = selectedTiles;
            this.selectionChanged.next(event);
        }
    }

    public set tileMinWidth(value: string) {
        this.extractValueAndUnit('_tileMinWidth', value);
    }

    public set tileMaxWidth(value: string) {
        this.extractValueAndUnit('_tileMaxWidth', value);
    }

    public set tileMinHeight(value: string) {
        this.extractValueAndUnit('_tileMinHeight', value);
    }

    public set tileMaxHeight(value: string) {
        this.extractValueAndUnit('_tileMaxHeight', value);
    }

    public set maxWidth(value: string) {
        this.extractValueAndUnit('_maxWidth', value);
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

    public ngOnDestroy() {
        this.isAlive = false;
        this._container = undefined;
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
            const newTile = new DejaTile();
            newTile.percentBounds = new Rect(targetBounds.left + tile.percentBounds.left - bounds.left, targetBounds.top + tile.percentBounds.top - bounds.top, tile.percentBounds.width, tile.percentBounds.height);
            newTile.templateModel = tile.templateModel;
            newTile.color = tile.color;
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

    public isElementInsideDejaEditor(element: HTMLElement) {
        let tileElement = element;

        while (tileElement && tileElement !== this.container) {
            if (tileElement.tagName === 'DEJA-EDITOR') {
                return true;
            }
            tileElement = tileElement.parentElement;
        }

        return false;
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
        event.removed = tilesToDelete;

        tilesToDelete.forEach((tile) => {
            delete this.tilesDic[tile.id];
            tile.delete();
        });

        let index = this.tiles.length;
        while (--index >= 0) {
            const tile = this.tiles[index];
            if (!this.tilesDic[tile.id]) {
                this.tiles.splice(index, 1);
            }
        }

        this.refreshTiles$.next({ resetWidth: true });

        event.tiles = this.tiles;
        this.modelChanged.next(event);
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
        event.tiles = this.tiles;
        event.removed = tilesToRemove;
        event.cancel$ = new Subject();

        const cancelSubscription = event.cancel$.pipe(
            first())
            .subscribe((value) => {
                if (value) {
                    tilesToRemove.forEach((tile) => tile.isHidden = false);
                } else {
                    this.deleteTiles(tilesToRemove);
                }
            });

        // Forward event
        this.contentRemoving.next(event);

        // Remove immediately
        if (!event.defaultPrevented) {
            cancelSubscription.unsubscribe();
            this.deleteTiles(tilesToRemove);
        }
    }

    public getFreePlace(idealBounds: Rect) {
        const freePlaces = [] as Rect[];

        let maxHeight = 0;
        this.tiles.forEach((t) => {
            if (t.percentBounds.bottom > maxHeight) {
                maxHeight = t.percentBounds.bottom;
            }
        });

        for (let x = 0; x <= this._maxWidth - idealBounds.width; x += this._tileMinWidth) {
            for (let y = 0; y <= maxHeight - idealBounds.height; y += this._tileMinHeight) {
                const currentBounds = new Rect(x, y, idealBounds.width, idealBounds.height);

                if (this.tiles.filter((t) => t.percentBounds.intersectWith(currentBounds)).length === 0) {
                    freePlaces.push(currentBounds);
                }
            }
        }

        if (freePlaces.length > 0) {
            // add at the nearest free place
            freePlaces.sort((bounds1, bounds2) => {
                const calcDistance = (bounds: Rect) => Math.min(Math.abs(bounds.left - idealBounds.left), Math.abs(bounds.right - idealBounds.right)) + 200 * Math.min(Math.abs(bounds.top - idealBounds.top), Math.abs(bounds.bottom - idealBounds.bottom));
                return calcDistance(bounds1) - calcDistance(bounds2);
            });

            return freePlaces[0];
        }

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
        if (!this.designMode || !this._container) {
            return false;
        }

        const tile = dragContext.DejaTile as DejaTile;
        if (!tile) {
            return false;
        }

        const containerBounds = this._container.getBoundingClientRect();
        const { pageX, pageY } = dragCursor.originalEvent;

        const x = pageX - containerBounds.left;
        const y = pageY - containerBounds.top;

        // Create a temporary tile for drag and drop
        const tempTile = tile.clone();
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

    public expandTile(tile: DejaTile, pixelHeight: number) {
        // Save layout
        const t = tile.id ? this.tilesDic[tile.id] : this.tiles.find((tt) => tt.equalsTo(tile));

        if (this.beforeSizeLayout) {
            this.restoreLayout(this.beforeSizeLayout);
        } else {
            this.beforeSizeLayout = this.saveLayout();
        }
        this.expandedTile = t;
        t.isExpanded = true;
        const percentHeight = Math.ceil(pixelHeight * 100 / this.hundredPercentWith);
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
        if (this.moveTimOut) {
            this.moveTimOut.unsubscribe();
            this.moveTimOut = undefined;
        }

        observableFrom(tiles).pipe(
            filter((tile) => !!tile),
            tap((tile) => {
                tile.isDragging = false;
                tile.isDropping = true;
            }),
            delay(1000))
            .subscribe((tile) => { tile.isDropping = false; });

        // Restore original layout
        if (this.originalLayout) {
            this.restoreLayout(this.originalLayout);
        }

        this.endDrag();
    }

    public drop(tiles: DejaTile[]) {
        let changed: DejaTile[];

        if (this.moveTimOut) {
            this.moveTimOut.unsubscribe();
            this.moveTimOut = undefined;
        }

        if (this.validLayout) {
            this.restoreLayout(this.validLayout);

            if (this._cursor !== 'move') {
                // Only one tile can be resized at time
                const tile = tiles[0];
                tile.percentBounds = new Rect(this.validLayout.validBounds);
                tile.isDragging = false;
            } else {
                observableFrom(tiles).pipe(
                    filter((tile) => !!tile),
                    tap((tile) => {
                        const left = this.validLayout.validBounds.left + this.dragRelativePosition[tile.id].left;
                        const top = this.validLayout.validBounds.top + this.dragRelativePosition[tile.id].top;
                        tile.percentBounds = new Rect(left, top, tile.percentBounds.width, tile.percentBounds.height);
                        tile.isDragging = false;
                        tile.isDropping = true;
                        if (tile.isTemporary) {
                            delete this.tilesDic[tile.id];
                            tile.makeId();
                            this.tilesDic[tile.id] = tile;
                            this.addTiles([tile]);
                        }
                    }),
                    delay(1000))
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
            event.tiles = this.tiles;
            this.layoutChanged.next(event);
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

        const sizeMin = this.getTileMinPixelSize();
        const sizeMax = this.getTileMaxPixelSize();

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
                    bounds.left = Math.max(Math.min(offsetLeft, bounds.right - sizeMin.width), bounds.right - sizeMax.width);
                    bounds.right = right;
                    bounds.top = Math.max(Math.min(offsetTop, bounds.bottom - sizeMin.height), bounds.bottom - sizeMax.height);
                    bounds.bottom = bottom;
                    this.size(tile, new Position(offsetLeft, offsetTop), Directions.left + Directions.top);
                    break;
                case 'sw-resize':
                    bounds.left = Math.max(Math.min(offsetLeft, bounds.right - sizeMin.width), bounds.right - sizeMax.width);
                    bounds.right = right;
                    bounds.bottom = Math.max(Math.min(offsetBottom, bounds.top + sizeMax.height), bounds.top + sizeMin.height);
                    this.size(tile, new Position(offsetLeft, offsetBottom), Directions.left + Directions.bottom);
                    break;
                case 'w-resize':
                    bounds.left = Math.max(Math.min(offsetLeft, bounds.right - sizeMin.width), bounds.right - sizeMax.width);
                    bounds.right = right;
                    this.size(tile, new Position(offsetLeft, 0), Directions.left);
                    break;
                case 'ne-resize':
                    bounds.right = Math.max(Math.min(offsetRight, bounds.left + sizeMax.width), bounds.left + sizeMin.width);
                    bounds.top = Math.max(Math.min(offsetTop, bounds.bottom - sizeMin.height), bounds.bottom - sizeMax.height);
                    bounds.bottom = bottom;
                    this.size(tile, new Position(offsetRight, offsetTop), Directions.right + Directions.top);
                    break;
                case 'se-resize':
                    bounds.right = Math.max(Math.min(offsetRight, bounds.left + sizeMax.width), bounds.left + sizeMin.width);
                    bounds.bottom = Math.max(Math.min(offsetBottom, bounds.top + sizeMax.height), bounds.top + sizeMin.height);
                    this.size(tile, new Position(offsetRight, offsetBottom), Directions.right + Directions.bottom);
                    break;
                case 'e-resize':
                    bounds.right = Math.max(Math.min(offsetRight, bounds.left + sizeMax.width), bounds.left + sizeMin.width);
                    this.size(tile, new Position(offsetRight, 0), Directions.right);
                    break;
                case 'n-resize':
                    bounds.top = Math.max(Math.min(offsetTop, bounds.bottom - sizeMin.height), bounds.bottom - sizeMax.height);
                    bounds.bottom = bottom;
                    this.size(tile, new Position(0, offsetTop), Directions.top);
                    break;
                case 's-resize':
                    bounds.bottom = Math.max(Math.min(offsetBottom, bounds.top + sizeMax.height), bounds.top + sizeMin.height);
                    this.size(tile, new Position(0, offsetBottom), Directions.bottom);
                    break;
                default:
                    throw new Error('Invalid direction');
            }
            tile.pixelBounds = bounds;

        } else {
            tiles.forEach((tile) => { tile.pixelBounds = new Rect(offsetLeft + this.getPixelSize(this.dragRelativePosition[tile.id].left), offsetTop + this.getPixelSize(this.dragRelativePosition[tile.id].top), this.getPixelSize(tile.percentBounds.width), this.getPixelSize(tile.percentBounds.height)); });

            // Assign new drag and drop rectangle
            this.dragTarget = new Rect(this.getPercentSize(offsetLeft), this.getPercentSize(offsetTop), this.targetBounds.width, this.targetBounds.height);

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
                this.tiles.push(newTile);
                this.tilesDic[newTile.id] = newTile;
            }
        });

        const event = new CustomEvent('DejaTilesAddEvent', { cancelable: true }) as IDejaTilesAddEvent;
        event.tiles = this.tiles;
        event.added = newTiles;
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
            e.tiles = this.tiles;
            e.added = tiles;
            this.modelChanged.next(e);
        };

        const cancelSubscription = event.cancel$.pipe(
            first())
            .subscribe((value) => {
                if (value) {
                    // Canceled, hide and remove added after effect
                    observableFrom(newTiles).pipe(
                        tap((tile) => tile.isHidden = true),
                        delay(1000),
                        reduce((acc: DejaTile[], cur: DejaTile) => [...acc, cur], []),
                        first())
                        .subscribe((tiles: DejaTile[]) => this.deleteTiles(tiles));

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

        // Get total rectangle
        let bounds: Rect;
        newTiles.forEach((tile) => {
            bounds = bounds ? Rect.union(bounds, tile.percentBounds) : new Rect(tile.percentBounds);
        });

        this.refreshTiles$.next({ ensureBounds: bounds });

        this.contentAdding.next(event);

        if (!event.defaultPrevented) {
            // Add immediately
            cancelSubscription.unsubscribe();
            validateNewTiles(newTiles);
        }
    }

    private size(tile: DejaTile, pixelPos: Position, directions: Directions) {
        // Calc new tile bounds
        const percentPos = new Position(this.getPercentSize(pixelPos.left), this.getPercentSize(pixelPos.top));
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
            const dLeft = percentPos.left;
            const tLeft = dragBounds.left < dLeft ? minWidth * Math.ceil(dLeft / minWidth) : minWidth * Math.floor(dLeft / minWidth);
            const tWidth = Math.min(maxWidth, Math.max(minWidth, newTargetBounds.right - tLeft));
            dragBounds.width = dragBounds.right - dLeft;
            dragBounds.left = dLeft;
            newTargetBounds.left = newTargetBounds.right - tWidth;
            newTargetBounds.width = tWidth;
        }
        // tslint:disable-next-line:no-bitwise
        if (directions & Directions.right) {
            minWidth = minWidth || this.getTileMinPercentWidth();
            maxWidth = maxWidth || this.getTileMaxPercentWidth();
            const dRight = percentPos.left;
            const tRight = dragBounds.right < dRight ? minWidth * Math.ceil(dRight / minWidth) : minWidth * Math.floor(dRight / minWidth);
            dragBounds.width = dRight - dragBounds.left;
            newTargetBounds.width = Math.min(maxWidth, Math.max(minWidth, tRight - newTargetBounds.left));
        }
        // tslint:disable-next-line:no-bitwise
        if (directions & Directions.top) {
            minHeight = this.getTileMinPercentHeight();
            maxHeight = this.getTileMaxPercentHeight();
            const dTop = percentPos.top;
            const tTop = dragBounds.top < dTop ? minHeight * Math.ceil(dTop / minHeight) : minHeight * Math.floor(dTop / minHeight);
            const tHeight = Math.min(maxHeight, Math.max(minHeight, newTargetBounds.bottom - tTop));
            dragBounds.height = dragBounds.bottom - dTop;
            dragBounds.top = dTop;
            newTargetBounds.top = newTargetBounds.bottom - tHeight;
            newTargetBounds.height = tHeight;
        }
        // tslint:disable-next-line:no-bitwise
        if (directions & Directions.bottom) {
            minHeight = minHeight || this.getTileMinPercentHeight();
            maxHeight = maxHeight || this.getTileMaxPercentHeight();
            const dBottom = percentPos.top;
            const tBottom = dragBounds.bottom < dBottom ? minHeight * Math.ceil(dBottom / minHeight) : minHeight * Math.floor(dBottom / minHeight);
            dragBounds.height = dBottom - dragBounds.top;
            newTargetBounds.height = Math.min(maxHeight, Math.max(minHeight, tBottom - newTargetBounds.top));
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
        const newTargetBounds = this.ensureContainer(new Rect(minWidth * Math.round(this.dragTarget.left / minWidth), minHeight * Math.round(this.dragTarget.top / minHeight), this.dragTarget.width, this.dragTarget.height));

        if (this.lastTargetBounds && Math.abs(newTargetBounds.left - this.lastTargetBounds.left) < minWidth && Math.abs(newTargetBounds.top - this.lastTargetBounds.top) < minHeight) {
            // Nothing change, wait for timers
            return;
        }
        this.lastTargetBounds = newTargetBounds;

        if (this.moveTimOut) {
            this.moveTimOut.unsubscribe();
            this.moveTimOut = undefined;
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
            this.moveTimOut = observableTimer(500).pipe(
                first())
                .subscribe(() => {
                    // console.log('moveTimer timer');
                    this.moveTimOut = undefined;

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

        const leftTilesToPush = [] as DejaTile[];
        const rightTilesToPush = [] as DejaTile[];
        const topTilesToPush = [] as DejaTile[];
        const bottomTilesToPush = [] as DejaTile[];

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
                            const hol = tile.percentBounds.left - effectiveBounds.left;      // Ce qui depasse a gauche
                            const hor = effectiveBounds.right - tile.percentBounds.right;    // Ce qui depasse a droite
                            const vot = tile.percentBounds.top - effectiveBounds.top;        // Ce qui depasse en haut
                            const vob = effectiveBounds.bottom - tile.percentBounds.bottom;  // Ce qui depasse en bas
                            const hoe = Math.max(0, Math.min(tile.percentBounds.right, effectiveBounds.right) - Math.max(tile.percentBounds.left, effectiveBounds.left)) / Math.min(tile.percentBounds.width, effectiveBounds.width);
                            const voe = Math.max(0, Math.min(tile.percentBounds.bottom, effectiveBounds.bottom) - Math.max(tile.percentBounds.top, effectiveBounds.top)) / Math.min(tile.percentBounds.height, effectiveBounds.height);

                            // Calc preferred direction
                            let preferredDirection: Directions;
                            // tslint:disable-next-line:no-bitwise
                            if (voe >= hoe && directions & Directions.horizontal) {
                                // horizontal
                                // tslint:disable-next-line:no-bitwise
                                preferredDirection = hor >= hol && (directions & Directions.left) ? Directions.left : Directions.right;
                            } else {
                                // vertical
                                // tslint:disable-next-line:no-bitwise
                                preferredDirection = vob >= vot && (directions & Directions.top) ? Directions.top : Directions.bottom;
                            }

                            switch (preferredDirection) {
                                case Directions.left:
                                    leftTilesToPush.push(tile);
                                    break;
                                case Directions.top:
                                    topTilesToPush.push(tile);
                                    break;
                                case Directions.right:
                                    rightTilesToPush.push(tile);
                                    break;
                                default:
                                    bottomTilesToPush.push(tile);
                                    break;
                            }
                        }
                    }
                }
            }
        }

        // try first horizontal move
        let remain = 0;
        if (leftTilesToPush.length) {
            remain = this.pushHorizontal(bounds, -1, leftTilesToPush);
            if (remain) {
                bounds = this.ensureContainer(bounds.offset(remain, 0));
                // tslint:disable-next-line:no-bitwise
                return this.ensureTarget(bounds, effectiveBounds, directions & ~Directions.left, originalBounds);
            }
        }

        // Now try right
        if (rightTilesToPush.length) {
            remain = this.pushHorizontal(bounds, 1, rightTilesToPush);
        }

        if (remain > 0) {
            // No horizontal place, restore original position
            this.restoreLayout(this.originalLayout);
            // tslint:disable-next-line:no-bitwise
            return this.ensureTarget(originalBounds, effectiveBounds, directions & Directions.vertical);
        } else {
            // Try top
            if (topTilesToPush.length) {
                remain = this.pushVertical(bounds, -1, topTilesToPush);
                if (remain) {
                    bounds = this.ensureContainer(bounds.offset(0, remain));
                    return this.ensureTarget(bounds, effectiveBounds, Directions.bottom);
                }
            }

            // And finally bottom
            remain = this.pushVertical(bounds, 1, bottomTilesToPush);
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
            const h = this.getPixelSize(tile.percentBounds.height || this._tileMinHeight);
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
        const self = this as { [prop: string]: any };
        const unit = self[`${prop}Unit`];
        if (!unit || unit === 'px') {
            return this.getPercentSize(self[prop]);
        } else {
            return self[prop];
        }
    }

    private getSizePixelLimit(prop: string): number {
        const self = this as { [prop: string]: any };
        const unit = self[`${prop}Unit`];
        if (!unit || unit === 'px') {
            return self[prop];
        } else {
            return this.getPixelSize(self[prop]);
        }
    }

    private getTileMinPixelSize(): Size {
        return new Size(this.getSizePixelLimit('_tileMinWidth'), this.getSizePixelLimit('_tileMinHeight'));
    }

    private getTileMaxPixelSize(): Size {
        return new Size(this.getSizePixelLimit('_tileMaxWidth'), this.getSizePixelLimit('_tileMaxHeight'));
    }

    private getTileMinPercentWidth(): number {
        return Math.max(1, this.getSizePercentLimit('_tileMinWidth'));
    }

    private getTileMaxPercentWidth(): number {
        return Math.max(5, this.getSizePercentLimit('_tileMaxWidth'));
    }

    private getTileMinPercentHeight(): number {
        return Math.max(1, this.getSizePercentLimit('_tileMinHeight'));
    }

    private getTileMaxPercentHeight(): number {
        return Math.max(5, this.getSizePercentLimit('_tileMaxHeight'));
    }

    private getMaxPercentWidth(): number {
        return Math.max(5, this.getSizePercentLimit('_maxWidth'));
    }

    private getMaxPercentHeight(): number {
        return Math.max(5, this.getSizePercentLimit('_maxHeight'));
    }

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
            const self = this as { [prop: string]: any };
            self[prop] = parseInt(matches[1], 10);
            if (matches.length >= 2) {
                self[`${prop}Unit`] = matches[2];
            } else {
                self[`${prop}Unit`] = 'px';
            }
        }
    }

    private restoreLayout(layout: ILayoutInfos) {
        this.tiles.forEach((tile) => {
            const config = layout[tile.id] as ILayoutInfo;
            tile.percentBounds = config.bounds.clone();
        });
    }

    private calcHorizontalOverflow(direction: number, tiles: DejaTile[], offset: number, blackList?: { [id: string]: string }): number {
        let overflow = 0;
        blackList = blackList || {};

        tiles.forEach((t) => {
            if (!blackList[t.id]) {
                blackList[t.id] = t.id;

                const tryBounds = t.percentBounds.offset(direction * offset, 0);
                let rightOffset = 0;
                const maxWidth = this.getMaxPercentWidth();
                if (tryBounds.left < 0) {
                    rightOffset = -tryBounds.left;
                } else if (maxWidth && tryBounds.right > maxWidth) {
                    rightOffset = tryBounds.right - maxWidth;
                }

                const adjacentTiles = this.tiles.filter((tile: DejaTile) => !tile.isDragging && !tile.equalsTo(t) && tile.percentBounds.intersectWith(tryBounds));

                if (adjacentTiles.length) {
                    rightOffset += this.calcHorizontalOverflow(direction, adjacentTiles, offset, blackList);
                }

                if (rightOffset > overflow) {
                    overflow = rightOffset;
                }
            }
        });

        return overflow;
    }

    private moveHorizontal(direction: number, tiles: DejaTile[], offset: number, targetBounds: { [id: string]: Rect }) {
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
        const targetBounds = {} as { [id: string]: Rect };

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

    private calcVerticalOverflow(direction: number, tiles: DejaTile[], offset: number, blackList?: { [id: string]: string }): number {
        let overflow = 0;
        blackList = blackList || {};

        tiles.forEach((t) => {
            if (!blackList[t.id]) {
                blackList[t.id] = t.id;

                // Offset tile
                const tryBounds = t.percentBounds.offset(0, direction * offset);
                let rightOffset = 0;
                const maxHeight = this.getMaxPercentHeight();
                if (tryBounds.top < 0) {
                    rightOffset = -tryBounds.top;
                } else if (maxHeight && tryBounds.bottom > maxHeight) {
                    rightOffset = tryBounds.bottom - maxHeight;
                }

                const adjacentTiles = this.tiles.filter((tile: DejaTile) => !tile.isDragging && !tile.equalsTo(t) && tile.percentBounds.intersectWith(tryBounds));

                if (adjacentTiles.length) {
                    rightOffset += this.calcVerticalOverflow(direction, adjacentTiles, offset, blackList);
                }

                if (rightOffset > overflow) {
                    overflow = rightOffset;
                }
            }
        });

        return overflow;
    }

    private moveVertical(direction: number, tiles: DejaTile[], offset: number, targetBounds: { [id: string]: Rect }) {
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
        const targetBounds = {} as { [id: string]: Rect };

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
                this.tiles.forEach((t) => {
                    if (targetBounds[t.id]) {
                        t.percentBounds = targetBounds[t.id];
                    }
                });
            }
        }

        return overflow;
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
            if (tile.isTemporary) {
                delete this.tilesDic[tile.id];
                this.tiles.splice(index, 1);
            }
        }
    }
}
