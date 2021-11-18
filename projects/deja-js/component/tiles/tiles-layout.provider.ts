/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

/* eslint-disable rxjs/finnish */
import { Injectable, Optional } from '@angular/core';
import { DejaClipboardService, Destroy, KeyCodes } from '@deja-js/component/core';
import { Directions, Position, Rect, Size } from '@deja-js/component/core/graphics';
import { DragCursorInfos } from '@deja-js/component/v2/mouse-dragdrop';
import { BehaviorSubject, debounceTime, delay, filter, from, fromEvent, map, mergeWith, of, reduce, Subject, Subscription, switchMap, take, takeUntil, tap, timer } from 'rxjs';

import { DejaTile } from './tile.class';
import { IDejaTilesAddedEvent, IDejaTilesAddEvent, IDejaTilesDeletedEvent, IDejaTilesEvent, IDejaTilesRemoveEvent } from './tiles.event';
import { IDejaTilesRefreshParams } from './tiles-refresh-params.interface';


interface ILayoutInfo {
    id: string;
    bounds: Rect;
}

interface ILayoutInfos {
    [id: string]: ILayoutInfo | number | Rect;
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
    currentTile: DejaTile;
    tiles?: Array<DejaTile>;
}

export interface ITileDragDropContext {
    tile: DejaTile;
}

@Injectable()
export class DejaTilesLayoutProvider extends Destroy {
    public refreshTiles$ = new Subject<IDejaTilesRefreshParams>();
    public ensureVisible$ = new Subject<string>();
    public ensureBounds$ = new Subject<Rect>();
    public dragging$ = new BehaviorSubject<boolean>(false);
    public dragSelection$ = new Subject<IDragSelection>();
    public dragDropInfos$ = new Subject<IDragDropInfos>();
    public selectionRect$ = new Subject<Rect>();
    public dragover$ = new Subject<DragCursorInfos>();
    public dragleave$ = new Subject<void>();
    public deleteTiles$ = new Subject<Array<DejaTile>>();
    public designMode = false;

    public layoutCompleted = new Subject<IDejaTilesEvent>();
    public layoutChanged = new Subject<IDejaTilesEvent>();
    public tilesAdded = new Subject<IDejaTilesAddedEvent>();
    public tilesDeleted = new Subject<IDejaTilesDeletedEvent>();
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

    private tilesDic = new Map<string, DejaTile>();
    private _tiles: Array<DejaTile>;
    private _cursor: string;
    private _targetBounds = new Rect();
    private destination = new Rect();
    private lastTargetBounds: Rect;
    private moveTimOut: Subscription;
    private originalLayout: ILayoutInfos;
    private validLayout: ILayoutInfos;
    private dragPageOffset = new Position();
    private dragOriginalPosition = new Position();
    private dragRelativePosition: Map<string, Position>;
    private _container: HTMLElement;
    private currentTile: DejaTile;
    private hundredPercentWith: number;
    private dragTarget: Rect;

    private selectedIds = new Array<string>();

    public constructor(@Optional() private clipboardService: DejaClipboardService) {
        super();

        this.refreshTiles$.pipe(
            debounceTime(30),
            tap(() => {
                // Size the container
                this.container.style.width = '';
                this.container.style.height = '';
            }),
            delay(10),
            takeUntil(this.destroyed$)
        ).subscribe(params => {
            const placeAtTheEnd = new Array<DejaTile>();

            const containerBounds = this.container.getBoundingClientRect();
            if (params?.resetWidth || !this.hundredPercentWith) {
                this.hundredPercentWith = containerBounds.width;
            }
            let height = containerBounds.height;
            let width = containerBounds.width;
            let maxWidth = 0;
            let maxHeight = 0;
            const tiles = this.tiles || new Array<DejaTile>();

            const selectedTileIds = new Array<string>();
            tiles.forEach((tile: DejaTile) => {
                if (tile.percentBounds && !tile.percentBounds.isEmpty()) {
                    const bounds = this.getPixelBounds(tile.percentBounds);
                    if (bounds.bottom > maxWidth) {
                        maxWidth = bounds.right;
                    }
                    if (bounds.right > maxHeight) {
                        maxHeight = bounds.bottom;
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
                if (tile.pixelBounds && tile.pixelBounds.bottom > height) {
                    height = tile.pixelBounds.bottom;
                }
            });

            let top = maxHeight;
            let left = 0;
            placeAtTheEnd.forEach(tile => {
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

            if (params?.ensureVisible) {
                this.ensureVisible$.next(params.ensureVisible);
            }
            if (params?.ensureBounds) {
                this.ensureBounds$.next(params.ensureBounds);
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

        const ensureTile$ = this.ensureVisible$.pipe(
            delay(1),
            map(id => this.tilesDic.get(id)),
            filter(tile => !!tile),
            map(tile => tile.percentBounds));

        this.ensureBounds$.pipe(
            mergeWith(ensureTile$),
            takeUntil(this.destroyed$)
        ).subscribe(percentBounds => {
            const { left, right, top, bottom } = this.getPixelBounds(percentBounds);

            const findScrollContainer = (container: HTMLElement): HTMLElement => {
                // eslint-disable-next-line no-loops/no-loops
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

        this.dragSelection$.pipe(
            switchMap(dragSelection => {
                const mouseUp$ = fromEvent<MouseEvent>(this._container.ownerDocument, 'mouseup').pipe(
                    tap(() => this.selectionRect$.next(null))
                );

                const mouseMove$ = fromEvent<MouseEvent>(this._container, 'mousemove');
                return mouseMove$.pipe(
                    // eslint-disable-next-line rxjs/no-unsafe-takeuntil
                    takeUntil(mouseUp$),
                    filter(event => event.buttons === 1),
                    tap(event => {
                        const containerBounds = this._container.getBoundingClientRect();

                        // Select all tiles between start position and current position
                        dragSelection.selectedRect = Rect.fromPoints(dragSelection.startPosition, new Position(event.pageX - containerBounds.left, event.pageY - containerBounds.top));
                        this.selectionRect$.next(dragSelection.selectedRect);

                        const selection = this.hitTest(dragSelection.selectedRect);
                        this.selectedTiles = selection.map(tile => tile.id);
                    })
                );
            }),
            takeUntil(this.destroyed$)
        ).subscribe();

        const leave$ = this.dragleave$;

        this.dragDropInfos$.pipe(
            switchMap(dragDropInfos => {
                const tiles = dragDropInfos && ((dragDropInfos.tiles?.length && dragDropInfos.tiles) || (dragDropInfos.currentTile && [dragDropInfos.currentTile]));
                if (!tiles) {
                    return of(null as MouseEvent);
                }

                const externalDrop = !dragDropInfos.tiles;
                const mouseMove$ = fromEvent<MouseEvent>(this._container, 'mousemove');
                const keyUp$ = fromEvent<KeyboardEvent>(this._container.ownerDocument, 'keyup');
                const escape$ = keyUp$.pipe(filter(event => event.code === KeyCodes.Escape));

                const mouseButtonReleased$ = mouseMove$.pipe(
                    filter(event => event.buttons !== 1)
                );

                const cancel$ = leave$.pipe(
                    mergeWith(mouseButtonReleased$, escape$),
                    tap(() => {
                        this.removeTemporaryTile();
                        this.cancelDrag(tiles);
                    })
                );

                const mouseUp$ = fromEvent<MouseEvent>(this._container.ownerDocument, 'mouseup').pipe(
                    tap(() => this.drop(tiles))
                );

                const kill$ = mouseUp$.pipe(
                    mergeWith(cancel$)
                );

                const dragover$ = this.dragover$.pipe(
                    map(cursor => cursor.originalEvent)
                );

                return mouseMove$.pipe(
                    mergeWith(dragover$),
                    // eslint-disable-next-line rxjs/no-unsafe-takeuntil
                    takeUntil(kill$),
                    tap(event => {
                        const containerBounds = this._container.getBoundingClientRect();
                        const x = event.pageX - containerBounds.left;
                        const y = event.pageY - containerBounds.top;
                        if (!dragDropInfos.enabled) {
                            if (Math.abs(dragDropInfos.startX - x) >= 15 || Math.abs(dragDropInfos.startY - y) >= 15) {
                                if (externalDrop) {
                                    // Allow drag and drop of new tiles from outside the component
                                    const tempTile = dragDropInfos.currentTile;

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
                                    this.tilesDic.set(tempTile.id, tempTile);

                                    // Start tile drag and drop
                                    this.dragging$.next(true);
                                    dragDropInfos.enabled = true;
                                    this.startDrag(tiles, this.getPixelSize(idealBounds.left + idealBounds.width / 2), this.getPixelSize(idealBounds.top + idealBounds.height / 2));

                                } else {
                                    // Start tile drag and drop
                                    this.dragging$.next(true);
                                    dragDropInfos.enabled = true;
                                    this.startDrag(tiles, dragDropInfos.startX, dragDropInfos.startY);
                                }

                            }
                        } else {
                            this.drag(tiles, x, y);
                        }
                    })
                );
            }),
            takeUntil(this.destroyed$)
        ).subscribe();

        // Delete stream for clipboard
        this.deleteTiles$.pipe(
            takeUntil(this.destroyed$)
        ).subscribe(tilesToDelete => this.deleteTiles(tilesToDelete));
    }

    public set container(container: HTMLElement) {
        this._container = container;

        if (this._container) {
            const leave$ = fromEvent<MouseEvent>(container, 'mouseleave');
            const mouseUp$ = fromEvent<MouseEvent>(container.ownerDocument, 'mouseup');
            const mouseEnter$ = fromEvent<MouseEvent>(container, 'mouseenter');

            // Cursor provider
            mouseEnter$.pipe(
                switchMap(() => {
                    if (this.designMode) {
                        const leaveCursor$ = leave$.pipe(
                            tap(() => this.container.style.cursor = '')
                        );

                        const mouseMove$ = fromEvent<MouseEvent>(container, 'mousemove');
                        return mouseMove$.pipe(
                            // eslint-disable-next-line rxjs/no-unsafe-takeuntil
                            takeUntil(leaveCursor$),
                            filter(event => !!this.container && event.buttons === 0),
                            map(event => this._cursor = this.getCursorFromHtmlElement(event.pageX, event.pageY, event.target as HTMLElement))
                        );
                    } else {
                        return of('');
                    }
                }),
                takeUntil(this.destroyed$)
            ).subscribe(cursor => this.container.style.cursor = cursor);

            mouseEnter$.pipe(
                switchMap(() => {
                    const mouseDownEvent$ = fromEvent<MouseEvent>(container, 'mousedown');
                    const mouseDown$ = mouseDownEvent$.pipe(
                        filter(event => event.buttons === 1),
                        filter(event => !this.isElementInsideDejaEditor(event.target as HTMLElement)),
                        map(event => ({ event: event, clickedTile: this.getTileComponentFromHTMLElement(event.target as HTMLElement) })));

                    // Pressed and selected tile observers
                    return mouseDown$.pipe(
                        // eslint-disable-next-line rxjs/no-unsafe-takeuntil
                        takeUntil(leave$),
                        switchMap(({ event, clickedTile }) => {
                            const target = event.target as HTMLElement;
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
                                            currentTile: this.currentTile,
                                            tiles: this.tiles.filter(tile => tile.isSelected)
                                        } as IDragDropInfos);
                                    }
                                }

                                return mouseUp$.pipe(
                                    take(1),
                                    filter(() => !!this.currentTile)
                                );
                            } else if (target === this.container || target.parentElement === this.container) {
                                if (event.buttons === 1) {
                                    // Start drag selection
                                    const containerBounds = this._container.getBoundingClientRect();
                                    this.dragSelection$.next({ startPosition: new Position(event.pageX - containerBounds.left, event.pageY - containerBounds.top), selectedRect: new Rect() } as IDragSelection);
                                }

                                // Unselect all tiles
                                if (this.currentTile) {
                                    this.currentTile.isPressed = false;
                                }
                                this.selectedTiles = [];
                            }

                            return of(null as MouseEvent);
                        })
                    );
                }),
                filter(mouseUpEvent => !!mouseUpEvent),
                takeUntil(this.destroyed$)
            ).subscribe(mouseUpEvent => {
                if (this.currentTile.isPressed) {
                    this.currentTile.isPressed = false;
                    // Multi-selection
                    if (mouseUpEvent.ctrlKey) {
                        this.currentTile.isSelected = !this.currentTile.isSelected;
                        this.selectedTiles = this.tiles
                            .filter(tile => tile.isSelected)
                            .map(tile => tile.id);
                    }
                }

                if (this.designMode) {
                    this._cursor = this.getCursorFromHtmlElement(mouseUpEvent.pageX, mouseUpEvent.pageY, mouseUpEvent.target as HTMLElement);
                    this.container.style.cursor = this._cursor;
                }

                this.currentTile = undefined;
            });
        }
    }

    public get container(): HTMLElement {
        return this._container;
    }

    public set tiles(tiles: Array<DejaTile>) {
        this._tiles = tiles;
        this.tilesDic = this.tiles.reduce((dic, t) => dic.set(t.id, t), new Map<string, DejaTile>());
        this.refreshTiles$.next({ resetWidth: true });
    }

    public get tiles(): DejaTile[] {
        return this._tiles || (this._tiles = new Array<DejaTile>());
    }

    public set selectedTiles(selectedIds: Array<string>) {
        const selectedTiles = new Array<DejaTile>();
        let raiseEvent = false;

        const idsDic = selectedIds.reduce((set, id) => set.add(id), new Set<string>());

        const previousIdsDic = this.selectedIds.reduce((set, id) => set.add(id), new Set<string>());

        if (this.tiles?.length) {
            this.tiles.forEach((tile: DejaTile) => {
                if (idsDic.has(tile.id) !== previousIdsDic.has(tile.id)) {
                    raiseEvent = true;
                }
                tile.isSelected = idsDic.has(tile.id);
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

    private get targetBounds(): Rect {
        return this._targetBounds;
    }

    private set targetBounds(targetBounds: Rect) {
        this._targetBounds = targetBounds;
        if (targetBounds) {
            this.selectionRect$.next(new Rect({
                height: this.getPixelSize(targetBounds.height || 0),
                left: this.getPixelSize(targetBounds.left || 0),
                top: this.getPixelSize(targetBounds.top || 0),
                width: this.getPixelSize(targetBounds.width || 0)
            }));
        } else {
            this.selectionRect$.next(null);
        }
    }

    public copySelection(): DejaTile[] {
        const selectedTiles = this.tiles.filter(tile => tile.isSelected);
        if (selectedTiles.length) {
            this.copyTiles(selectedTiles, false);
        }
        return selectedTiles;
    }

    public cutSelection(): DejaTile[] {
        const selectedTiles = this.tiles.filter(tile => tile.isSelected);
        if (selectedTiles.length) {
            this.copyTiles(selectedTiles, true);
        }
        return selectedTiles;
    }

    public deleteSelection(): DejaTile[] {
        const selectedTiles = this.tiles.filter(tile => tile.isSelected);
        if (selectedTiles.length) {
            this.removeTiles(selectedTiles.map(tile => tile.id));
        }
        return selectedTiles;
    }

    public paste(): DejaTile[] {
        if (!this.clipboardService || !this.clipboardService.isAvailable('tiles')) {
            return new Array<DejaTile>();
        }

        const sourceTiles = this.clipboardService.get('tiles') as Array<DejaTile>;

        // Unselect all tiles
        this.tiles.forEach(tile => tile.isSelected = false);

        // Get max rectangle
        let bounds: Rect;
        sourceTiles.forEach(tile => {
            bounds = bounds ? Rect.union(bounds, tile.percentBounds) : new Rect(tile.percentBounds);
        });

        const targetBounds = this.getFreePlace(new Rect(0, 0, bounds.width, bounds.height));

        const newTiles = sourceTiles.map(tile => {
            const newTile = tile.clone();
            newTile.percentBounds = new Rect(targetBounds.left + tile.percentBounds.left - bounds.left, targetBounds.top + tile.percentBounds.top - bounds.top, tile.percentBounds.width, tile.percentBounds.height);
            newTile.isSelected = true;
            return newTile;
        });

        this.addTiles(newTiles);

        return newTiles;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public getTileElementFromHTMLElement(element: HTMLElement): HTMLElement {
        let tileElement = element;

        // eslint-disable-next-line no-loops/no-loops
        while (tileElement && tileElement.tagName !== 'DEJA-TILE') {
            tileElement = tileElement.parentElement;
            if (tileElement === this.container) {
                return undefined;
            }
        }

        if (tileElement?.parentElement !== this.container) {
            return undefined; // For nested tiles components
        }

        return tileElement;
    }

    public isElementInsideDejaEditor(element: HTMLElement): boolean {
        let tileElement = element;

        // eslint-disable-next-line no-loops/no-loops
        while (tileElement && tileElement !== this.container) {
            if (tileElement.tagName === 'DEJA-EDITOR') {
                return true;
            }
            tileElement = tileElement.parentElement;
        }

        return false;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public getTileComponentFromHTMLElement(element: HTMLElement): DejaTile {
        const tileElement = this.getTileElementFromHTMLElement(element);
        return tileElement && this.tilesDic.get(tileElement.id);
    }

    public deleteTiles(tilesToDelete: Array<DejaTile>): void {
        if (!tilesToDelete || tilesToDelete.length === 0) {
            return;
        }

        // For event after removed finished
        const event = new CustomEvent('DejaTilesDeletedEvent', { cancelable: false }) as IDejaTilesDeletedEvent;
        event.tiles = tilesToDelete;

        tilesToDelete.forEach(tile => {
            this.tilesDic.delete(tile.id);
            tile.delete();
        });

        let index = this.tiles.length;
        // eslint-disable-next-line no-loops/no-loops
        while (--index >= 0) {
            const tile = this.tiles[index];
            if (!this.tilesDic.has(tile.id)) {
                this.tiles.splice(index, 1);
            }
        }

        this.refreshTiles$.next({ resetWidth: true });

        event.tiles = this.tiles;
        this.tilesDeleted.next(event);
    }

    public removeTiles(tileIdsToRemove: Array<string>): void {
        if (!tileIdsToRemove || tileIdsToRemove.length === 0) {
            return;
        }

        const tilesToRemove = tileIdsToRemove.map(id => this.tilesDic.get(id));

        // Delete selected tiles components
        tilesToRemove.forEach(tile => {
            tile.isHidden = true;
        });

        const event = new CustomEvent('DejaTilesRemoveEvent', { cancelable: true }) as IDejaTilesRemoveEvent;
        event.tiles = this.tiles;
        event.removed = tilesToRemove;
        event.cancel$ = new Subject<void>();

        const cancelSubscription = event.cancel$.pipe(
            take(1),
            takeUntil(this.destroyed$)
        ).subscribe(value => {
            if (value) {
                tilesToRemove.forEach(tile => tile.isHidden = false);
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

    public getFreePlace(idealBounds: Rect): Rect {
        const freePlaces = new Array<Rect>();

        const tiles = this.tiles.filter(t => !t.isDragging);

        let maxHeight = 0;
        tiles.forEach(t => {
            if (t.percentBounds.bottom > maxHeight) {
                maxHeight = t.percentBounds.bottom;
            }
        });

        // eslint-disable-next-line no-loops/no-loops
        for (let x = 0; x <= this._maxWidth - idealBounds.width; x += this._tileMinWidth) {
            // eslint-disable-next-line no-loops/no-loops
            for (let y = 0; y <= maxHeight - idealBounds.height; y += this._tileMinHeight) {
                const currentBounds = new Rect(x, y, idealBounds.width, idealBounds.height);

                if (!tiles.find(t => t.percentBounds.intersectWith(currentBounds))) {
                    freePlaces.push(currentBounds);
                }
            }
        }

        if (freePlaces.length > 0) {
            // add at the nearest free place
            freePlaces.sort((bounds1, bounds2) => {
                const calcDistance = (bounds: Rect): number => Math.min(Math.abs(bounds.left - idealBounds.left), Math.abs(bounds.right - idealBounds.right)) + 200 * Math.min(Math.abs(bounds.top - idealBounds.top), Math.abs(bounds.bottom - idealBounds.bottom));
                return calcDistance(bounds1) - calcDistance(bounds2);
            });

            return freePlaces[0];
        }

        // Add at the end
        return new Rect(0, maxHeight, idealBounds.width, idealBounds.height);
    }

    public moveTile(id: string, bounds: Rect): void {
        const tile = this.tiles.find(t => t.id === id);
        if (tile) {
            tile.percentBounds = bounds;
            this.refreshTiles$.next(null);
        }
    }

    public hitTest(pixelBounds: Rect): DejaTile[] {
        const percentBounds = new Rect(this.getPercentSize(pixelBounds.left), this.getPercentSize(pixelBounds.top), this.getPercentSize(pixelBounds.width), this.getPercentSize(pixelBounds.height));
        return this.tiles.filter(t => t.percentBounds.intersectWith(percentBounds));
    }

    public getPercentSize(value: number): number {
        return Math.round(value * 100 / this.hundredPercentWith);
    }

    // Drag and drop from outside provider
    public dragEnter(dragContext: ITileDragDropContext, dragCursor: DragCursorInfos): boolean {
        if (!this.designMode || !this._container) {
            return false;
        }

        const tile = dragContext.tile;
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
            currentTile: tempTile
        } as IDragDropInfos);

        return true;
    }

    public startDrag(tiles: Array<DejaTile>, pageX: number, pageY: number): void {
        // Save layout
        const savedLayout = this.saveLayout();

        // Bring all tiles together
        let targetBounds: Rect;
        tiles.forEach(tile => {
            targetBounds = targetBounds ? Rect.union(targetBounds, tile.percentBounds) : tile.percentBounds;
            tile.isDragging = true;
        });

        this.dragRelativePosition = new Map<string, Position>();
        tiles.forEach(tile => this.dragRelativePosition.set(tile.id, new Position(tile.percentBounds.left - targetBounds.left, tile.percentBounds.top - targetBounds.top)));

        this.dragPageOffset = new Position(pageX, pageY);

        this.dragOriginalPosition = new Position(targetBounds.left, targetBounds.top);

        this.targetBounds = savedLayout.targetBounds = savedLayout.validBounds = targetBounds;
        this.originalLayout = savedLayout;
        this.validLayout = undefined;
    }

    public cancelDrag(tiles: Array<DejaTile>): void {
        this.clearMoveTimer();

        from(tiles).pipe(
            filter(tile => !!tile),
            takeUntil(this.destroyed$)
        ).subscribe(tile => {
            tile.isDragging = false;
            tile.isDropping = true;
        });

        // Restore original layout
        if (this.originalLayout) {
            this.restoreLayout(this.originalLayout);
        }

        this.endDrag();
    }

    public drop(tiles: Array<DejaTile>): DejaTile[] {
        let changed: Array<DejaTile>;
        this.clearMoveTimer();

        if (this.validLayout) {
            this.restoreLayout(this.validLayout);

            if (this._cursor !== 'move') {
                // Only one tile can be resized at time
                const tile = tiles[0];
                tile.percentBounds = new Rect(this.validLayout.validBounds);
                tile.isDragging = false;
            } else {
                from(tiles).pipe(
                    filter(tile => !!tile),
                    tap(tile => {
                        const left = this.validLayout.validBounds.left + this.dragRelativePosition.get(tile.id).left;
                        const top = this.validLayout.validBounds.top + this.dragRelativePosition.get(tile.id).top;
                        tile.percentBounds = new Rect(left, top, tile.percentBounds.width, tile.percentBounds.height);
                        tile.isDragging = false;
                        tile.isDropping = true;
                        if (tile.isTemporary) {
                            this.tilesDic.delete(tile.id);
                            tile.makeId();
                            this.tilesDic.set(tile.id, tile);
                            this.addTiles([tile]);
                        }
                    }),
                    delay(1000),
                    takeUntil(this.destroyed$)
                ).subscribe(tile => tile.isDropping = false);
            }

            changed = this.tiles.filter(t => {
                const layoutInfo = this.originalLayout[t.id] as ILayoutInfo;
                return !Rect.equals(t.percentBounds, layoutInfo?.bounds);
            });
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

    public endDrag(): void {
        this.originalLayout = undefined;
        this.validLayout = undefined;
        this.targetBounds = undefined;
        this.dragging$.next(false);
        this.dragDropInfos$.next(null);
        this.dragTarget = undefined;
        this.copyTiles(null);
        this.refreshTiles$.next(null);
    }

    public drag(tiles: Array<DejaTile>, pageX: number, pageY: number): void {
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
                // throw new Error('Invalid direction');
            }
            tile.pixelBounds = bounds;

        } else {
            tiles.forEach(tile => {
                tile.pixelBounds = new Rect(offsetLeft + this.getPixelSize(this.dragRelativePosition.get(tile.id).left), offsetTop + this.getPixelSize(this.dragRelativePosition.get(tile.id).top), this.getPixelSize(tile.percentBounds.width), this.getPixelSize(tile.percentBounds.height));
            });

            // Assign new drag and drop rectangle
            this.dragTarget = new Rect(this.getPercentSize(offsetLeft), this.getPercentSize(offsetTop), this.targetBounds.width, this.targetBounds.height);

            this.move();
        }
    }

    public addTiles(newTiles: Array<DejaTile>): void {
        if (!newTiles || newTiles.length === 0) {
            return;
        }

        newTiles.forEach(newTile => {
            if (!this.tiles.find(t => t.id === newTile.id)) {
                if (this.tiles.find(t => newTile.percentBounds && t.percentBounds?.intersectWith(newTile.percentBounds))) {
                    newTile.percentBounds = undefined;
                }

                if (!newTile.percentBounds) {
                    newTile.percentBounds = this.getFreePlace(newTile.idealBounds);
                }

                this.tiles.push(newTile);
                this.tilesDic.set(newTile.id, newTile);
            }
        });

        const event = new CustomEvent('DejaTilesAddEvent', { cancelable: true }) as IDejaTilesAddEvent;
        event.tiles = this.tiles;
        event.added = newTiles;
        event.cancel$ = new Subject<void>();

        // Delete provider if cut operation
        const deleteSourceProvider$ = this.clipboardService?.get('tiles-provider') as Subject<Array<DejaTile>>;

        // Hide originals if cut
        let sourceTiles: Array<DejaTile>;
        if (deleteSourceProvider$) {
            sourceTiles = this.clipboardService.get('tiles') as Array<DejaTile>;
            sourceTiles.forEach(tile => {
                tile.isHidden = true;
            });
        }

        const deleteSourceTiles = (): void => {
            if (sourceTiles) {
                deleteSourceProvider$.next(sourceTiles);
                this.clipboardService.clear();
            }
        };

        const validateNewTiles = (tiles: Array<DejaTile>): void => {
            // Remove original tiles if cut operation
            deleteSourceTiles();

            const e = new CustomEvent('DejaTileAddedEvent', { cancelable: false }) as IDejaTilesAddedEvent;
            e.tiles = this.tiles;
            e.added = tiles;
            this.tilesAdded.next(e);
        };

        // Get total rectangle
        let bounds: Rect;
        newTiles.forEach(tile => {
            bounds = bounds ? Rect.union(bounds, tile.percentBounds) : new Rect(tile.percentBounds);
        });

        this.refreshTiles$.next({ ensureBounds: bounds });

        this.contentAdding.next(event);

        if (!event.defaultPrevented) {
            // Add immediately
            validateNewTiles(newTiles);
        } else {
            event.cancel$.pipe(
                take(1),
                filter(value => !value),
                takeUntil(this.destroyed$)
            ).subscribe(validateNewTiles);

            event.cancel$.pipe(
                take(1),
                filter(value => !!value),
                switchMap(() => {
                    // Reshow original tiles if cut operation
                    if (sourceTiles) {
                        sourceTiles.forEach(tile => {
                            tile.isHidden = false;
                            tile.isCutted = true;
                        });
                    }

                    // Canceled, hide and remove added after effect
                    return from(newTiles);
                }),
                tap(tile => tile.isHidden = true),
                delay(1000),
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                reduce((acc, cur) => [...acc, cur], new Array<DejaTile>()),
                take(1),
                takeUntil(this.destroyed$)
            ).subscribe(tiles => this.deleteTiles(tiles));
        }
    }

    private size(tile: DejaTile, pixelPos: Position, directions: Directions): void {
        // Calc new tile bounds
        const percentPos = new Position(this.getPercentSize(pixelPos.left), this.getPercentSize(pixelPos.top));
        const dragBounds = tile.percentBounds.clone();
        const newTargetBounds = tile.percentBounds.clone();
        let minWidth: number;
        let minHeight: number;
        let maxWidth: number;
        let maxHeight: number;

        // eslint-disable-next-line no-bitwise
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
        // eslint-disable-next-line no-bitwise
        if (directions & Directions.right) {
            minWidth = minWidth || this.getTileMinPercentWidth();
            maxWidth = maxWidth || this.getTileMaxPercentWidth();
            const dRight = percentPos.left;
            const tRight = dragBounds.right < dRight ? minWidth * Math.ceil(dRight / minWidth) : minWidth * Math.floor(dRight / minWidth);
            dragBounds.width = dRight - dragBounds.left;
            newTargetBounds.width = Math.min(maxWidth, Math.max(minWidth, tRight - newTargetBounds.left));
        }
        // eslint-disable-next-line no-bitwise
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
        // eslint-disable-next-line no-bitwise
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

        // Restore the original layout before moving something
        this.restoreLayout(this.originalLayout);

        this.destination = newTargetBounds.clone();

        // Check if location is free without pushing tiles
        const result = this.tiles.find(t => !t.isDragging && t.percentBounds.intersectWith(newTargetBounds));

        if (!result) {
            this.targetBounds = newTargetBounds;

            // Save layout
            this.validLayout = this.saveLayout();
            this.validLayout.targetBounds = this.validLayout.validBounds = newTargetBounds;
            this.refreshTiles$.next(null);
        } else if (newTargetBounds) {
            // Location must be freed
            // Ensure new destination
            const ensureBounds = this.ensureTarget(newTargetBounds, dragBounds, directions);
            if (ensureBounds) {
                this.targetBounds = ensureBounds;
                this.validLayout = this.saveLayout();
                this.validLayout.targetBounds = newTargetBounds;
                this.validLayout.validBounds = ensureBounds;
                this.refreshTiles$.next(null);
            }
        }
    }

    private clearMoveTimer(): void {
        if (this.moveTimOut) {
            this.moveTimOut.unsubscribe();
            this.moveTimOut = undefined;
        }
    }

    private move(): void {
        const minWidth = this.getTileMinPercentWidth();
        const minHeight = this.getTileMinPercentHeight();

        // Search a new target
        let newTargetBounds = this.ensureContainer(new Rect(minWidth * Math.round(this.dragTarget.left / minWidth), minHeight * Math.round(this.dragTarget.top / minHeight), this.dragTarget.width, this.dragTarget.height));

        if (this.lastTargetBounds && Math.abs(newTargetBounds.left - this.lastTargetBounds.left) < minWidth && Math.abs(newTargetBounds.top - this.lastTargetBounds.top) < minHeight) {
            // Nothing change, wait for timers
            return;
        }
        this.lastTargetBounds = newTargetBounds;

        // Check if location is free without pushing tiles
        const maxOverlaps = this.tiles
            .filter(tile => !tile.isDragging)
            .reduce((overlaps, tile) => {
                const overlapsInfos = Rect.overlapInfos(tile.percentBounds, newTargetBounds);
                return Math.max(Math.min(overlapsInfos.height, overlapsInfos.width), overlaps);
            }, 0);

        // Restore the original layout before moving something if the user move back in an empty original position
        if (!this.tiles.find(t => {
            const config = this.originalLayout[t.id] as ILayoutInfo;
            return config?.bounds.intersectWith(newTargetBounds);
        })) {
            this.restoreLayout(this.originalLayout);
        }

        if (maxOverlaps === 0) {
            this.clearMoveTimer();

            this.targetBounds = newTargetBounds.clone();
            this.destination = newTargetBounds.clone();

            // Save layout
            this.validLayout = this.saveLayout();
            this.validLayout.targetBounds = this.validLayout.validBounds = newTargetBounds;
            this.refreshTiles$.next(null);

        } else {
            if (!Rect.equals(this.targetBounds, newTargetBounds)) {
                this.clearMoveTimer();
            }

            if (maxOverlaps > 3) {
                const timerBounds = newTargetBounds.clone();
                this.moveTimOut = timer(500).pipe(
                    take(1),
                    takeUntil(this.destroyed$)
                ).subscribe(() => {
                    // Restore the original layout before moving something
                    this.restoreLayout(this.originalLayout);

                    this.destination = timerBounds;

                    // Ensure new destination
                    const ensureBounds = this.ensureTarget(timerBounds, this.dragTarget, Directions.all);

                    if (ensureBounds) {
                        this.targetBounds = ensureBounds;
                        this.validLayout = this.saveLayout();
                        this.validLayout.targetBounds = timerBounds;
                        this.validLayout.validBounds = ensureBounds;
                        this.refreshTiles$.next(null);
                    }
                });
            }

            // Find best location between last valid bounds and current bounds
            const freePlaces = new Array<Rect>();
            const tiles = this.tiles.filter(t => !t.isDragging);

            // eslint-disable-next-line no-loops/no-loops
            for (let x = Math.min(this.targetBounds.left, newTargetBounds.left); x <= Math.max(this.targetBounds.left, newTargetBounds.left); x++) {
                // eslint-disable-next-line no-loops/no-loops
                for (let y = Math.min(this.targetBounds.top, newTargetBounds.top); y <= Math.max(this.targetBounds.top, newTargetBounds.top); y++) {
                    const currentBounds = new Rect(x, y, newTargetBounds.width, newTargetBounds.height);

                    if (!tiles.find(t => t.percentBounds.intersectWith(currentBounds))) {
                        freePlaces.push(currentBounds);
                    }
                }
            }

            if (freePlaces.length > 0) {
                // add at the nearest free place
                freePlaces.sort((bounds1, bounds2) => {
                    const calcDistance = (bounds: Rect): number => Math.min(Math.abs(bounds.left - newTargetBounds.left), Math.abs(bounds.right - newTargetBounds.right)) + 200 * Math.min(Math.abs(bounds.top - newTargetBounds.top), Math.abs(bounds.bottom - newTargetBounds.bottom));
                    return calcDistance(bounds1) - calcDistance(bounds2);
                });

                newTargetBounds = freePlaces[0];

                this.targetBounds = newTargetBounds.clone();
                this.destination = newTargetBounds.clone();

                // Save layout
                this.validLayout = this.saveLayout();
                this.validLayout.targetBounds = this.validLayout.validBounds = newTargetBounds;
                this.refreshTiles$.next(null);
            }
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
    private ensureTarget(bounds: Rect, effectiveBounds?: Rect, directions?: Directions, originalBounds?: Rect, retryCount = 10): Rect {
        if (!effectiveBounds) {
            effectiveBounds = bounds;
        }

        // Backup bounds
        if (!originalBounds) {
            originalBounds = bounds.clone();
        }

        if (!directions) {
            directions = Directions.all;
        }

        const leftTilesToPush = new Array<DejaTile>();
        const rightTilesToPush = new Array<DejaTile>();
        const topTilesToPush = new Array<DejaTile>();
        const bottomTilesToPush = new Array<DejaTile>();

        // eslint-disable-next-line no-loops/no-loops
        const swap = this.tiles
            .filter(tile => !tile.isDragging && tile.percentBounds.intersectWith(bounds))
            .find(tile => {
                const swapTargetRect = new Rect(this.dragOriginalPosition.left, this.dragOriginalPosition.top, bounds.width, bounds.height);
                if (Math.abs(tile.percentBounds.left - effectiveBounds.left) < 1 &&
                    Math.abs(tile.percentBounds.top - effectiveBounds.top) < 1 &&
                    Math.abs(tile.percentBounds.width - effectiveBounds.width) < 1 &&
                    Math.abs(tile.percentBounds.height - effectiveBounds.height) < 1 &&
                    (Math.abs(effectiveBounds.left - swapTargetRect.right) <= 4 || Math.abs(effectiveBounds.right - swapTargetRect.left) <= 4 || Math.abs(effectiveBounds.top - swapTargetRect.bottom) <= 4 || Math.abs(effectiveBounds.bottom - swapTargetRect.top) <= 4)) {
                    // swap
                    tile.percentBounds = swapTargetRect;
                    return true;
                } else {
                    const hol = tile.percentBounds.left - effectiveBounds.left; // Ce qui depasse a gauche
                    const hor = effectiveBounds.right - tile.percentBounds.right; // Ce qui depasse a droite
                    const vot = tile.percentBounds.top - effectiveBounds.top; // Ce qui depasse en haut
                    const vob = effectiveBounds.bottom - tile.percentBounds.bottom; // Ce qui depasse en bas
                    const hoe = Math.max(0, Math.min(tile.percentBounds.right, effectiveBounds.right) - Math.max(tile.percentBounds.left, effectiveBounds.left)) / Math.min(tile.percentBounds.width, effectiveBounds.width);
                    const voe = Math.max(0, Math.min(tile.percentBounds.bottom, effectiveBounds.bottom) - Math.max(tile.percentBounds.top, effectiveBounds.top)) / Math.min(tile.percentBounds.height, effectiveBounds.height);

                    // Calc preferred direction
                    let preferredDirection: Directions;
                    // eslint-disable-next-line no-bitwise
                    if (voe >= hoe && directions & Directions.horizontal) {
                        // horizontal
                        // eslint-disable-next-line no-bitwise
                        preferredDirection = hor >= hol && (directions & Directions.left) ? Directions.left : Directions.right;
                        // eslint-disable-next-line no-bitwise
                    } else if (directions & Directions.vertical) {
                        // vertical
                        // eslint-disable-next-line no-bitwise
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
                return undefined;
            });

        if (swap) {
            return bounds;
        }

        // try first horizontal move
        let remain = 0;
        if (leftTilesToPush.length) {
            remain = this.pushHorizontal(bounds, -1, leftTilesToPush);
            if (remain) {
                bounds = this.ensureContainer(bounds.offset(remain, 0));
                // eslint-disable-next-line no-bitwise
                return retryCount ? this.ensureTarget(bounds, effectiveBounds, directions & ~Directions.left, originalBounds, retryCount - 1) : null;
            }
        }

        // Now try right
        if (rightTilesToPush.length) {
            remain = this.pushHorizontal(bounds, 1, rightTilesToPush);
        }

        if (remain > 0) {
            // No horizontal place, restore original position
            this.restoreLayout(this.originalLayout);
            // eslint-disable-next-line no-bitwise
            return retryCount ? this.ensureTarget(originalBounds, effectiveBounds, directions & Directions.vertical, undefined, retryCount - 1) : null;
        } else {
            // Try top
            if (topTilesToPush.length) {
                remain = this.pushVertical(bounds, -1, topTilesToPush);
                if (remain) {
                    bounds = this.ensureContainer(bounds.offset(0, remain));
                    return retryCount ? this.ensureTarget(bounds, effectiveBounds, Directions.bottom, undefined, retryCount - 1) : null;
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
        this.tiles.forEach(tile => {
            const y = this.getPixelSize(tile.percentBounds.top || 0);
            const h = this.getPixelSize(tile.percentBounds.height || this._tileMinHeight);
            if (y + h > layout.height) {
                layout.height = y + h;
            }
            layout[tile.id] = {
                bounds: tile.percentBounds.clone(),
                id: tile.id
            } as ILayoutInfo;
        });

        return layout;
    }

    private getPixelBounds(rect: Rect): Rect {
        return Rect.fromLTRB(Math.round(rect.left * this.hundredPercentWith / 100), Math.round(rect.top * this.hundredPercentWith / 100), Math.round(rect.right * this.hundredPercentWith / 100), Math.round(rect.bottom * this.hundredPercentWith / 100));
    }

    private getPixelSize(value: number, unit?: string): number {
        if (!unit || unit === '%') {
            return Math.round(value * this.hundredPercentWith / 100);
        } else {
            return value;
        }
    }

    private getSizePercentLimit(prop: string): number {
        const self = this as Record<string, unknown>;
        const unit = self[`${prop}Unit`];
        if (!unit || unit === 'px') {
            return this.getPercentSize(self[prop] as number);
        } else {
            return self[prop] as number;
        }
    }

    private getSizePixelLimit(prop: string): number {
        const self = this as Record<string, unknown>;
        const unit = self[`${prop}Unit`];
        if (!unit || unit === 'px') {
            return self[prop] as number;
        } else {
            return this.getPixelSize(self[prop] as number);
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

    private getCursorFromHtmlElement(x: number, y: number, element: HTMLElement): string {
        const tileElement = this.getTileElementFromHTMLElement(element);
        if (!tileElement) {
            return null;
        }

        const bounds = tileElement.getBoundingClientRect();

        if (x < bounds.left + 15) {
            if (y < bounds.top + 15) {
                return 'nw-resize';
            } else if (y > bounds.bottom - 15) {
                return 'sw-resize';
            } else {
                return 'w-resize';
            }
        } else if (x > bounds.right - 15) {
            if (y < bounds.top + 15) {
                return 'ne-resize';
            } else if (y > bounds.bottom - 15) {
                return 'se-resize';
            } else {
                return 'e-resize';
            }
        } else if (y < bounds.top + 15) {
            return 'n-resize';
        } else if (y > bounds.bottom - 15) {
            return 's-resize';
        } else {
            return 'move';
        }
    }

    private extractValueAndUnit(prop: string, value: string): void {
        const regexp = /(\d+)(.*)/i;
        const matches = regexp.exec(value);

        if (matches?.length >= 1) {
            const self = this as Record<string, unknown>;
            self[prop] = parseInt(matches[1], 10);
            if (matches.length >= 2) {
                self[`${prop}Unit`] = matches[2];
            } else {
                self[`${prop}Unit`] = 'px';
            }
        }
    }

    private restoreLayout(layout: ILayoutInfos): void {
        this.tiles.forEach(tile => {
            const config = layout[tile.id] as ILayoutInfo;
            if (config) {
                tile.percentBounds = config.bounds.clone();
            }
        });
    }

    private calcHorizontalOverflow(direction: number, tiles: Array<DejaTile>, offset: number, blackList?: Set<string>): number {
        let overflow = 0;
        blackList = blackList || new Set<string>();

        tiles.forEach(t => {
            if (!blackList.has(t.id)) {
                blackList.add(t.id);

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

    private moveHorizontal(direction: number, tiles: Array<DejaTile>, offset: number, targetBounds: Map<string, Rect>): void {
        tiles.forEach(t => {
            if (!targetBounds.has(t.id)) {
                // Offset tile
                const newBounds = t.percentBounds.offset(direction * offset, 0);
                targetBounds.set(t.id, newBounds);
                const adjacentTiles = this.tiles.filter((tile: DejaTile) => !tile.isDragging && !tile.equalsTo(t) && tile.percentBounds.intersectWith(newBounds));

                if (adjacentTiles.length) {
                    this.moveHorizontal(direction, adjacentTiles, offset, targetBounds);
                }
            }
        });
    }

    private pushHorizontal(bounds: Rect, direction: number, tiles?: Array<DejaTile>, offset?: number): number {
        let overflow = 0;
        const targetBounds = new Map<string, Rect>();

        if (!offset) {
            offset = 0;
            tiles.forEach(t => {
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
                this.tiles.forEach(t => {
                    if (targetBounds.has(t.id)) {
                        t.percentBounds = targetBounds.get(t.id);
                    }
                });
            }
        }

        return overflow;
    }

    private calcVerticalOverflow(direction: number, tiles: Array<DejaTile>, offset: number, blackList?: Set<string>): number {
        let overflow = 0;
        blackList = blackList || new Set<string>();

        tiles.forEach(t => {
            if (!blackList.has(t.id)) {
                blackList.add(t.id);

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

    private moveVertical(direction: number, tiles: Array<DejaTile>, offset: number, targetBounds: Map<string, Rect>): void {
        tiles.forEach(t => {
            if (!targetBounds.has(t.id)) {
                // Offset tile
                const newBounds = t.percentBounds.offset(0, direction * offset);
                targetBounds.set(t.id, newBounds);
                const adjacentTiles = this.tiles.filter((tile: DejaTile) => !tile.isDragging && !tile.equalsTo(t) && tile.percentBounds.intersectWith(newBounds));

                if (adjacentTiles.length) {
                    this.moveVertical(direction, adjacentTiles, offset, targetBounds);
                }
            }
        });
    }

    private pushVertical(bounds: Rect, direction: number, tiles: Array<DejaTile>, offset?: number): number {
        let overflow = 0;
        const targetBounds = new Map<string, Rect>();

        if (!offset) {
            offset = 0;
            tiles.forEach(t => {
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
                this.tiles.forEach(t => targetBounds.has(t.id) && (t.percentBounds = targetBounds.get(t.id)));
            }
        }

        return overflow;
    }

    private copyTiles(tiles: Array<DejaTile>, isCut?: boolean): void {
        if (!this.clipboardService) {
            if (!tiles) {
                return;
            }
            throw new Error('DejaClipboardService must be imported by your application to use the copyTiles methode of DejaTilesComponent.');
        }

        const tt = this.clipboardService.get('tiles') as Array<DejaTile>;
        if (tt) {
            tt.forEach(tile => tile.isCutted = false);
        }
        this.clipboardService.set('tiles', tiles);
        if (isCut) {
            tiles.forEach(tile => tile.isCutted = true);
            this.clipboardService.set('tiles-provider', this.deleteTiles$);
        } else {
            this.clipboardService.set('tiles-provider', undefined);
        }
    }

    private removeTemporaryTile(): void {
        let index = this.tiles.length;
        // eslint-disable-next-line no-loops/no-loops
        while (--index >= 0) {
            const tile = this.tiles[index];
            if (tile.isTemporary) {
                this.tilesDic.delete(tile.id);
                this.tiles.splice(index, 1);
            }
        }
    }
}
