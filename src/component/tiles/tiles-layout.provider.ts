/*
 * *
 *  @license
 *  Copyright Hôpital Universitaire de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/deja-js/blob/master/LICENSE
 * /
 *
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs/Rx';
import { Directions, Position, Rect, Size } from '../../common/core/graphics';
import { KeyCodes } from '../../common/core/';
import { DejaTileComponent, IDejaTile } from './index';

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

@Injectable()
export class DejaTilesLayoutProvider {
    public tileComponent = new Subject<DejaTileComponent>();
    public refreshTiles = new Subject();
    public ensureVisible = new Subject<IDejaTile>();
    public designMode = new BehaviorSubject<boolean>(false);
    public tileComponents = {} as { [id: string]: DejaTileComponent };
    public selectedTiles = new BehaviorSubject<IDejaTile[]>([]);
    public dragging = new BehaviorSubject<boolean>(false);
    public dragSelection = new Subject<IDragSelection>();
    public dragDropInfos = new Subject<IDragDropInfos>();
    public selectionRect = new Subject<Rect>();

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
    protected maxHeight: number;
    protected maxHeightUnit: string;

    private currentId = 0;
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
    private expandedTile: IDejaTile;
    private _container: HTMLElement;
    private _designMode = false;
    private currentTile: DejaTileComponent;
    private hundredPercentWith: number;
    private dragTarget: Rect;

    constructor() {
        Observable.from(this.tileComponent)
            .subscribe((tileComponent) => {
                const tile = tileComponent.tile;
                if (!tile.id) {
                    tile.id = '#' + this.currentId++;
                }
                this.tileComponents[tile.id] = tileComponent;
                this.refreshTiles.next();

                tileComponent.dispose.first().subscribe((disposedTile) => this.tileComponents[disposedTile.tile.id] = null);
            });

        Observable.from(this.refreshTiles)
            .debounceTime(30)
            .do(() => this.container.style.width = `100%`)
            .delay(10)
            .subscribe((resetWidth) => {
                const placeAtTheEnd = [] as DejaTileComponent[];

                const containerBounds = this.container.getBoundingClientRect();
                if (resetWidth || !this.hundredPercentWith) {
                    this.hundredPercentWith = containerBounds.width;
                }
                let height = 0;
                let width = containerBounds.width;

                Object.values(this.tileComponents)
                    .forEach((tileComponent: DejaTileComponent) => {
                        const tile = tileComponent.tile;
                        if (tile.bounds) {
                            const bounds = this.getPixelBounds(tile.bounds);
                            if (bounds.bottom > height) {
                                height = bounds.bottom;
                            }
                            if (bounds.right > width) {
                                width = bounds.right;
                            }
                            if (!tileComponent.isDragging) {
                                if (tile.bounds.top >= 0 && tile.bounds.left >= 0) {
                                    tileComponent.bounds.next(bounds);
                                } else {
                                    placeAtTheEnd.push(tileComponent);
                                }
                            }
                        } else {
                            placeAtTheEnd.push(tileComponent);
                        }
                    });

                let top = height;
                let left = 0;
                placeAtTheEnd.forEach((tileComponent) => {
                    const tile = tileComponent.tile;
                    tile.bounds = tile.bounds || new Rect(left, this.getPercentSize(top), 3 * this.getTileMinPercentWidth(), this.getTileMinPercentHeight());
                    const w = this.getPixelSize(tile.bounds.width);
                    const h = this.getPixelSize(tile.bounds.height);
                    const t = this.getPixelSize(tile.bounds.top);
                    const l = this.getPixelSize(tile.bounds.left);

                    if (left + w > width) {
                        top += h;
                        tile.bounds.left = 0;
                        tile.bounds.top = this.getPercentSize(t);
                    }

                    if (t + h > height) {
                        height = t + h;
                    }

                    tileComponent.bounds.next({
                        height: h,
                        left: l,
                        top: t,
                        width: w,
                    });
                    left += l;
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

                this.container.style.width = `${width}px`;
                this.container.style.height = `${height}px`;
            });

        Observable.from(this.ensureVisible)
            .map((tile) => this.tileComponents[tile.id])
            .filter((tileComponent) => !!tileComponent)
            .subscribe((tileComponent) => {
                const bounds = tileComponent.element.getBoundingClientRect();
                const containerBounds = this.container.getBoundingClientRect();

                if (bounds.left - containerBounds.left < this.container.scrollLeft) {
                    this.container.scrollLeft = bounds.left - containerBounds.left;
                } else if (bounds.right - containerBounds.right > this.container.scrollLeft + this.hundredPercentWith) {
                    this.container.scrollLeft = bounds.right - containerBounds.right;
                }
                if (bounds.top - containerBounds.top < this.container.scrollTop) {
                    this.container.scrollTop = bounds.top - containerBounds.top;
                } else if (bounds.bottom - containerBounds.bottom > this.container.scrollTop + this.hundredPercentWith) {
                    this.container.scrollTop = bounds.bottom - containerBounds.bottom;
                }
            });

        Observable.from(this.designMode)
            .subscribe((value) => this._designMode = value);

        Observable.from(this.selectedTiles)
            .subscribe((tiles) => {
                Object.values(this.tileComponents)
                    .filter((tileComponent: DejaTileComponent) => tileComponent.isSelected)
                    .forEach((tileComponent: DejaTileComponent) => tileComponent.selected.next(false));

                if (tiles && tiles.length) {
                    tiles
                        .map((tile) => this.tileComponents[tile.id])
                        .forEach((tileComponent: DejaTileComponent) => tileComponent.selected.next(true));
                }
            });

        Observable.from(this.dragSelection)
            .subscribe((dragSelection) => {
                const mouseUp$ = Observable.fromEvent(this._container.ownerDocument, 'mouseup')
                    .do(() => this.selectionRect.next(null));

                Observable.fromEvent(this._container, 'mousemove')
                    .takeUntil(mouseUp$)
                    .filter((event: MouseEvent) => event.buttons === 1)
                    .subscribe((event: MouseEvent) => {
                        const containerBounds = this._container.getBoundingClientRect();

                        // Select all tiles between start position and current position
                        dragSelection.selectedRect = Rect.fromPoints(dragSelection.startPosition, new Position(event.pageX - containerBounds.left, event.pageY - containerBounds.top));
                        this.selectionRect.next(dragSelection.selectedRect);

                        const selectedTiles = this.HitTest(dragSelection.selectedRect);
                        this.selectedTiles.next(selectedTiles);
                    });
            });

        Observable.from(this.dragDropInfos)
            .subscribe((dragDropInfos) => {
                if (!dragDropInfos) {
                    return;
                }

                const mouseUp$ = Observable.fromEvent(this._container.ownerDocument, 'mouseup')
                    .do(() => this.drop(dragDropInfos.tiles));

                Observable.fromEvent(this._container.ownerDocument, 'keyup')
                    .takeUntil(mouseUp$)
                    .filter((event: KeyboardEvent) => event.keyCode === KeyCodes.Escape)
                    .subscribe(() => {
                        this.cancelDrag(dragDropInfos.tiles);
                    });

                Observable.fromEvent(this._container, 'mousemove')
                    .takeUntil(mouseUp$)
                    .filter((event: MouseEvent) => event.buttons === 1)
                    .subscribe((event: MouseEvent) => {
                        const containerBounds = this._container.getBoundingClientRect();
                        const x = event.pageX - containerBounds.left;
                        const y = event.pageY - containerBounds.top;

                        if (!dragDropInfos.enabled) {
                            if (Math.abs(dragDropInfos.startX - x) > 10 || Math.abs(dragDropInfos.startY - y) > 10) {
                                // Allow drag and drop of new tiles from outside the component
                                // TODO
                                // if (this.dragInfos.tiles.length === 1 && !this.tiles.find((t) => t === this.dragInfos.tiles[0])) {
                                //     const tile = this.dragInfos.tiles[0];
                                //     this.tiles.push(tile);
                                //     const bounds = tile.bounds;
                                //     this.dragInfos.startX = x - bounds.width / 2;
                                //     this.dragInfos.startY = y - bounds.height / 2;
                                //     tile.id = 'new';
                                //     tile.bounds = new Rect(this.layoutProvider.getPercentSize(x) - bounds.width / 2, this.layoutProvider.getPercentSize(y) - bounds.height / 2, bounds.width, bounds.height);
                                //     // TODO tile.dragging.next(true);
                                //     this.clearSelection();
                                //     tile.selected = true;
                                //     this.selectedTiles = [tile];
                                // }

                                // Start tile drag and drop
                                this.dragging.next(true);
                                dragDropInfos.enabled = true;
                                this.startDrag(dragDropInfos.tiles, x, y);
                            }
                        } else {
                            this.drag(dragDropInfos.tiles, x, y);
                        }
                    });

                //             } else if (this.dragInfos) {
                //                 if (event.buttons === 1) {
                //                     this.drag(event.pageX, event.pageY);
                //                 } else if (this.dragInfos.enabled) {
                //                     this.cancelDrag();
                //                 }
                // public cancelDrag() {
                //     if (this.dragInfos && this.dragInfos.enabled) {
                //         if (this.dragInfos.tiles.length === 1) {
                //             const tileComponent = this.dragInfos.tiles[0];
                //             // TODO
                //             if (tileComponent.tile.id === 'new') {
                //                 const index = this.tiles.indexOf(tileComponent.tile);
                //                 if (index >= 0) {
                //                     this.tiles.splice(index, 1);
                //                 }
                //             }
                //         }
                //         this.layoutProvider.cancelDrag(this.dragInfos.tiles);
                //     }
                //     this.endDrag();
                // }
            });
    }

    public set container(container: HTMLElement) {
        this._container = container;

        Observable.from(this.dragging)
            .subscribe((value) => {
                if (value) {
                    this._container.setAttribute('drag', '');
                } else {
                    this._container.removeAttribute('drag');
                }
            });

        const enter$ = Observable.fromEvent(container, 'mouseenter');
        const leave$ = Observable.fromEvent(container, 'mouseleave');
        const mouseUp$ = Observable.fromEvent(container.ownerDocument, 'mouseup');

        enter$
            .subscribe(() => {
                // Cursor provider
                if (this._designMode) {
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

                const mouseDown$ = Observable.fromEvent(container, 'mousedown')
                    .filter((event: MouseEvent) => event.buttons === 1)
                    .map((event: MouseEvent) => ({
                        event: event,
                        target: event.target as HTMLElement,
                        clickedTile: this.getTileComponentFromHTMLElement(event.target as HTMLElement)
                    }));

                // Pressed and selected tile observers
                mouseDown$
                    .takeUntil(leave$)
                    .subscribe(({event, target, clickedTile}) => {
                        if (this.currentTile) {
                            this.currentTile.pressed.next(false);
                        }
                        this.currentTile = clickedTile;
                        if (this.currentTile) {
                            this.currentTile.pressed.next(true);

                            if (event.ctrlKey) {
                                // Multi-selection is available in design mode, selection on the mouse up
                            } else {
                                if (!this.currentTile.isSelected || this._cursor !== 'move') {
                                    this.selectedTiles.next([this.currentTile.tile]);
                                }

                                if (this._designMode) {
                                    const containerBounds = this._container.getBoundingClientRect();
                                    const x = event.pageX - containerBounds.left;
                                    const y = event.pageY - containerBounds.top;

                                    this.dragDropInfos.next({
                                        enabled: false,
                                        startX: x,
                                        startY: y,
                                        tiles: Object.values(this.tileComponents).filter((tileComponent) => tileComponent.isSelected),
                                    } as IDragDropInfos);
                                }
                            }

                            Observable.merge(mouseUp$, leave$)
                                .first()
                                .filter(() => !!this.currentTile)
                                .subscribe((e: MouseEvent) => {
                                    if (this.currentTile.isPressed) {
                                        this.currentTile.pressed.next(false);
                                        // Multi-selection
                                        if (e.ctrlKey) {
                                            const selectedTiles = Object.values(this.tileComponents).filter((tileComponent) => tileComponent.isSelected);
                                            if (!this.currentTile.isSelected) {
                                                selectedTiles.push(this.currentTile);
                                            } else {
                                                const index = selectedTiles.findIndex((tileComponent) => tileComponent === this.currentTile);
                                                if (index >= 0) {
                                                    selectedTiles.splice(index, 1);
                                                }
                                            }
                                            this.selectedTiles.next(selectedTiles.map((tileComponent) => tileComponent.tile));
                                        }
                                    }

                                    this.currentTile = undefined;
                                });
                        } else {
                            if (target === this.container || target.parentElement === this.container) {
                                if (event.buttons === 1) {
                                    // Start drag selection
                                    const containerBounds = this._container.getBoundingClientRect();
                                    this.dragSelection.next({
                                        startPosition: new Position(event.pageX - containerBounds.left, event.pageY - containerBounds.top),
                                        selectedRect: new Rect(),
                                    } as IDragSelection);
                                }

                                // Unselect all tiles
                                if (this.currentTile) {
                                    this.currentTile.pressed.next(false);
                                }
                                this.selectedTiles.next(null);
                            }
                        }
                    });
            });
    }

    public get container() {
        return this._container;
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

    public getTileComponentFromHTMLElement(element: HTMLElement): DejaTileComponent {
        const tileElement = this.getTileElementFromHTMLElement(element);
        return tileElement && this.tileComponents[tileElement.id];
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

    public set maxheight(value: string) {
        this.extractValueAndUnit('maxHeight', value);
    }

    public get isDesignMode() {
        return this._designMode;
    }

    private get targetBounds() {
        return this._targetBounds;
    }

    private set targetBounds(targetBounds: Rect) {
        this._targetBounds = targetBounds;
        if (targetBounds) {
            this.selectionRect.next(new Rect({
                height: this.getPixelSize(targetBounds.height || 0),
                left: this.getPixelSize(targetBounds.left || 0),
                top: this.getPixelSize(targetBounds.top || 0),
                width: this.getPixelSize(targetBounds.width || 0),
            }));
        } else {
            this.selectionRect.next(undefined);
        }
    }

    public getFreePlace(idealBounds: Rect) {
        const containerBounds = this.container.getBoundingClientRect();
        const percentHeight = this.getPercentSize(containerBounds.height);
        const freePlaces = [] as Rect[];
        const tiles = Object.values(this.tileComponents).map((tileComponent: DejaTileComponent) => tileComponent.tile);
        for (let x = 0; x < this.maxWidth - idealBounds.width; x += this.tileMinWidth) {
            for (let y = 0; y < percentHeight - idealBounds.height; y += this.tileMinHeight) {
                const currentBounds = new Rect(x, y, idealBounds.width, idealBounds.height);

                if (tiles.filter((t) => t.bounds.intersectWith(currentBounds)).length === 0) {
                    freePlaces.push(currentBounds);
                }
            }
        }

        if (freePlaces.length > 0) {
            // add at the nearest free place
            freePlaces.sort((bounds1, bounds2) => {
                const calcDistance = (bounds) => {
                    return Math.min(Math.abs(bounds.left - idealBounds.left), Math.abs(bounds.right - idealBounds.right)) + 2 * Math.min(Math.abs(bounds.top - idealBounds.top), Math.abs(bounds.bottom - idealBounds.bottom));
                };
                return calcDistance(bounds1) - calcDistance(bounds2);
            });

            return freePlaces[0];
        }

        // Add at the end
        return new Rect(0, percentHeight, idealBounds.width, idealBounds.height);
    }

    public HitTest(pixelBounds: Rect): IDejaTile[] {
        const percentBounds = new Rect(this.getPercentSize(pixelBounds.left), this.getPercentSize(pixelBounds.top), this.getPercentSize(pixelBounds.width), this.getPercentSize(pixelBounds.height));
        return Object.values(this.tileComponents)
            .map((tileComponent: DejaTileComponent) => tileComponent.tile)
            .filter((t) => t.bounds.intersectWith(percentBounds));
    }

    public getPercentSize(value: number): number {
        return Math.round(value * 100 / this.hundredPercentWith);
    }

    public startDrag(tiles: DejaTileComponent[], pageX: number, pageY: number) {
        // Save layout
        const savedLayout = this.saveLayout();

        // Bring all tiles together
        let targetBounds: Rect;
        tiles.forEach((tileComponent) => {
            targetBounds = targetBounds ? Rect.union(targetBounds, tileComponent.tile.bounds) : tileComponent.tile.bounds;
            tileComponent.dragging.next(true);
        });

        this.dragRelativePosition = {};
        tiles.forEach((tileComponent) => {
            const t = tileComponent.tile;
            this.dragRelativePosition[t.id] = new Position(t.bounds.left - targetBounds.left, t.bounds.top - targetBounds.top);
        });

        this.dragPageOffset = new Position(pageX, pageY);

        this.dragOriginalPosition = new Position(targetBounds.left, targetBounds.top);

        this.targetBounds = savedLayout.targetBounds = savedLayout.validBounds = targetBounds;
        this.originalLayout = savedLayout;
        this.validLayout = undefined;
    }

    public expandTile(tile: IDejaTile, pixelheight: number) {
        // Save layout
        if (this.beforeSizeLayout) {
            this.restoreLayout(this.beforeSizeLayout);
        } else {
            this.beforeSizeLayout = this.saveLayout();
        }
        this.expandedTile = tile;
        tile.expanded = true;
        const percentHeight = Math.ceil(pixelheight * 100 / this.hundredPercentWith);
        const bottom = tile.bounds.top + percentHeight;
        this.size(tile, new Position(0, this.getPixelSize(bottom)), Directions.bottom);
    }

    public cancelExpand() {
        if (this.beforeSizeLayout) {
            this.expandedTile.expanded = false;
            this.restoreLayout(this.beforeSizeLayout);
            this.refreshTiles.next();
            this.beforeSizeLayout = undefined;
        }
    }

    public cancelDrag(tiles: DejaTileComponent[]) {
        if (this.moveTimout) {
            this.moveTimout.unsubscribe();
            this.moveTimout = undefined;
        }

        Observable.from(tiles)
            .filter((tileComponent) => !!tileComponent)
            .do((tileComponent) => {
                tileComponent.dragging.next(false);
                tileComponent.dropping.next(true);
            })
            .delay(1000)
            .subscribe((tileComponent) => {
                tileComponent.dropping.next(false);
            });

        // Restore original layout
        this.restoreLayout(this.originalLayout);

        this.endDrag();
    }

    public drop(tiles: DejaTileComponent[]) {
        let changed: IDejaTile[];

        if (this.moveTimout) {
            this.moveTimout.unsubscribe();
            this.moveTimout = undefined;
        }

        if (this.validLayout) {
            this.restoreLayout(this.validLayout);
        }

        if (this._cursor !== 'move') {
            // Only one tile can be resized at time
            const tileComponent = tiles[0];
            const tile = tileComponent.tile;
            tile.bounds = new Rect(this.validLayout.validBounds);
            tileComponent.dragging.next(false);
        } else {
            Observable.from(tiles)
                .filter((tileComponent) => !!tileComponent)
                .do((tileComponent) => {
                    const t = tileComponent.tile;
                    const left = this.validLayout.validBounds.left + this.dragRelativePosition[t.id].left;
                    const top = this.validLayout.validBounds.top + this.dragRelativePosition[t.id].top;
                    t.bounds = new Rect(left, top, t.bounds.width, t.bounds.height);
                    tileComponent.dragging.next(false);
                    tileComponent.dropping.next(true);
                })
                .delay(1000)
                .subscribe((tileComponent) => {
                    tileComponent.dropping.next(false);
                });
        }

        if (this.validLayout) {
            changed = Object.values(this.tileComponents)
                .map((tileComponent: DejaTileComponent) => tileComponent.tile)
                .filter((t) => !Rect.equals(t.bounds, this.originalLayout[t.id] && this.originalLayout[t.id].bounds));
        }

        //             if (tileComponent.tile.id === 'new') {
        //                 // TODO tile.id = this.getCurrentId();
        //             }        
        this.endDrag();

        return changed;
    }

    public endDrag() {
        this.originalLayout = undefined;
        this.validLayout = undefined;
        this.targetBounds = undefined;
        this.dragging.next(false);
        this.dragDropInfos.next(null);
        this.dragTarget = undefined;
        this.refreshTiles.next();
    }

    public drag(tiles: DejaTileComponent[], pageX: number, pageY: number) {
        // Search related coords
        const offset = new Position(pageX - this.dragPageOffset.left, pageY - this.dragPageOffset.top);
        const offsetLeft = offset.left + this.getPixelSize(this.dragOriginalPosition.left);
        const offsetTop = offset.top + this.getPixelSize(this.dragOriginalPosition.top);

        const sizemin = this.getTileMinPixelSize();
        const sizemax = this.getTileMaxPixelSize();

        if (this._cursor !== 'move') {
            // Only one tile can be resized at time
            const tileComponent = tiles[0];
            const tile = tileComponent.tile;
            const bounds = this.getPixelBounds(tile.bounds);
            const offsetRight = offsetLeft + bounds.width;
            const offsetBottom = offsetTop + bounds.height;
            switch (this._cursor) {
                case 'nw-resize':
                    bounds.left = Math.max(Math.min(offsetLeft, bounds.right - sizemin.width), bounds.right - sizemax.width);
                    bounds.top = Math.max(Math.min(offsetTop, bounds.bottom - sizemin.height), bounds.bottom - sizemax.height);
                    this.size(tile, new Position(offsetLeft, offsetTop), Directions.left + Directions.top);
                    break;
                case 'sw-resize':
                    bounds.left = Math.max(Math.min(offsetLeft, bounds.right - sizemin.width), bounds.right - sizemax.width);
                    bounds.bottom = Math.max(Math.min(offsetBottom, bounds.top + sizemax.height), bounds.top + sizemin.height);
                    this.size(tile, new Position(offsetLeft, offsetBottom), Directions.left + Directions.bottom);
                    break;
                case 'w-resize':
                    bounds.left = Math.max(Math.min(offsetLeft, bounds.right - sizemin.width), bounds.right - sizemax.width);
                    this.size(tile, new Position(offsetLeft, 0), Directions.left);
                    break;
                case 'ne-resize':
                    bounds.right = Math.max(Math.min(offsetRight, bounds.left + sizemax.width), bounds.left + sizemin.width);
                    bounds.top = Math.max(Math.min(offsetTop, bounds.bottom - sizemin.height), bounds.bottom - sizemax.height);
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
                    this.size(tile, new Position(0, offsetTop), Directions.top);
                    break;
                case 's-resize':
                    bounds.bottom = Math.max(Math.min(offsetBottom, bounds.top + sizemax.height), bounds.top + sizemin.height);
                    this.size(tile, new Position(0, offsetBottom), Directions.bottom);
                    break;
                default:
                    throw new Error('Invalid direction');
            }
            tileComponent.bounds.next(bounds);

        } else {
            tiles.forEach((tileComponent) => {
                const tile = tileComponent.tile;
                tileComponent.bounds.next({
                    height: this.getPixelSize(tile.bounds.height),
                    left: offsetLeft + this.getPixelSize(this.dragRelativePosition[tile.id].left),
                    top: offsetTop + this.getPixelSize(this.dragRelativePosition[tile.id].top),
                    width: this.getPixelSize(tile.bounds.width),
                });
            });

            // Assign new drag and drop rectangle
            this.dragTarget = new Rect(
                this.getPercentSize(offsetLeft),
                this.getPercentSize(offsetTop),
                this.targetBounds.width,
                this.targetBounds.height,
            );

            this.move();
        }
    }

    private size(tile: IDejaTile, pixelpos: Position, directions: Directions) {
        // Calc new tile bounds
        const percentPos = new Position(this.getPercentSize(pixelpos.left), this.getPercentSize(pixelpos.top));
        const dragBounds = tile.bounds.clone();
        const newTargetBounds = tile.bounds.clone();
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
        if (tile.expanded) {
            const ensureBounds = this.ensureTarget(newTargetBounds, dragBounds, directions);
            tile.bounds = ensureBounds;
            this.refreshTiles.next();
        } else {
            // Restore the original layout before moving something
            this.restoreLayout(this.originalLayout);

            this.destination = newTargetBounds.clone();

            // Check if location is free without pushing tiles
            const result = Object.values(this.tileComponents)
                .find((tileComponent: DejaTileComponent) => !tileComponent.isDragging && tileComponent.tile.bounds.intersectWith(newTargetBounds));

            if (!result) {
                this.targetBounds = newTargetBounds;

                // Save layout
                this.validLayout = this.saveLayout();
                this.validLayout.targetBounds = this.validLayout.validBounds = newTargetBounds;
                this.refreshTiles.next();
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
                        this.refreshTiles.next();
                    }
                }
            }
        }
    }

    private move() {
        const minWidth = this.getTileMinPercentWidth();
        const minHeight = this.getTileMinPercentHeight();

        // Search a new target
        const newTargetBounds = this.ensureContainer(new Rect(
            minWidth * Math.round(this.dragTarget.left / minWidth),
            minHeight * Math.round(this.dragTarget.top / minHeight),
            this.dragTarget.width,
            this.dragTarget.height,
        ));

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
        const result = Object.values(this.tileComponents)
            .find((tileComponent: DejaTileComponent) => !tileComponent.isDragging && tileComponent.tile.bounds.intersectWith(newTargetBounds));

        if (!result) {
            this.targetBounds = newTargetBounds.clone();
            this.destination = newTargetBounds.clone();

            // Save layout
            this.validLayout = this.saveLayout();
            this.validLayout.targetBounds = this.validLayout.validBounds = newTargetBounds;
            this.refreshTiles.next();
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
                            this.refreshTiles.next();
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

        const tilesToPush = {} as { [direction: number]: IDejaTile[] };
        tilesToPush[Directions.left] = [];
        tilesToPush[Directions.right] = [];
        tilesToPush[Directions.top] = [];
        tilesToPush[Directions.bottom] = [];

        // tslint:disable-next-line:prefer-for-of
        for (const id in this.tileComponents) {
            if (this.tileComponents[id]) {
                const tileComponent = this.tileComponents[id];
                const t = tileComponent.tile;
                if (!tileComponent.isDragging && !t.expanded) {
                    if (t.bounds.intersectWith(bounds)) {
                        const swapTargetRect = new Rect(this.dragOriginalPosition.left, this.dragOriginalPosition.top, bounds.width, bounds.height);
                        if (t.bounds.left === effectiveBounds.left && t.bounds.top === effectiveBounds.top && t.bounds.width === effectiveBounds.width && t.bounds.height === effectiveBounds.height && effectiveBounds.adjacent(swapTargetRect)) {
                            // swap
                            t.bounds = swapTargetRect;
                            return bounds;
                        } else {
                            const hol = t.bounds.left - effectiveBounds.left; // Ce qui dépasse Ã  gauche
                            const hor = effectiveBounds.right - t.bounds.right; // Ce qui dépasse Ã  droite
                            const vot = t.bounds.top - effectiveBounds.top; // Ce qui dépasse en haut
                            const vob = effectiveBounds.bottom - t.bounds.bottom; // Ce qui dépasse en bas
                            const hoe = Math.max(0, Math.min(t.bounds.right, effectiveBounds.right) - Math.max(t.bounds.left, effectiveBounds.left)) / Math.min(t.bounds.width, effectiveBounds.width);
                            const voe = Math.max(0, Math.min(t.bounds.bottom, effectiveBounds.bottom) - Math.max(t.bounds.top, effectiveBounds.top)) / Math.min(t.bounds.height, effectiveBounds.height);

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
                            tilesToPush[preferedDirection].push(t);
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
        Object.values(this.tileComponents)
            .map((tileComponent: DejaTileComponent) => tileComponent.tile)
            .forEach((tile) => {
                const y = this.getPixelSize(tile.bounds.top || 0);
                const h = this.getPixelSize(tile.bounds.height || this.tileMinHeight);
                if (y + h > layout.height) {
                    layout.height = y + h;
                }
                layout[tile.id] = {
                    bounds: tile.bounds.clone(),
                    id: tile.id,
                } as ILayoutInfo;
            });

        return layout;
    }

    private getPixelBounds(rect: Rect) {
        return Rect.fromLTRB(
            Math.round(rect.left * this.hundredPercentWith / 100),
            Math.round(rect.top * this.hundredPercentWith / 100),
            Math.round(rect.right * this.hundredPercentWith / 100),
            Math.round(rect.bottom * this.hundredPercentWith / 100)
        );
    }

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

    private getTileMinPixelSize(): Size {
        return new Size(this.getSizePixelLimit('tileMinWidth'), this.getSizePixelLimit('tileMinHeight'));
    }

    private getTileMaxPixelSize(): Size {
        return new Size(this.getSizePixelLimit('tileMaxWidth'), this.getSizePixelLimit('tileMaxHeight'));
    }

    private getTileMinPercentWidth(): number {
        return this.getSizePercentLimit('tileMinWidth');
    }

    private getTileMaxPercentWidth(): number {
        return this.getSizePercentLimit('tileMaxWidth');
    }

    private getTileMinPercentHeight(): number {
        return this.getSizePercentLimit('tileMinHeight');
    }

    private getTileMaxPercentHeight(): number {
        return this.getSizePercentLimit('tileMaxHeight');
    }

    private getMaxPercentWidth(): number {
        return this.getSizePercentLimit('maxWidth');
    }

    private getMaxPercentHeight(): number {
        return this.getSizePercentLimit('maxHeight');
    }

    // private getMaxPixelWidth(): number {
    //     return this.getSizePixelLimit('maxWidth');
    // }

    // private getMaxPixelHeight(): number {
    //     return this.getSizePixelLimit('maxHeight');
    // }

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
        Object.values(this.tileComponents)
            .map((tileComponent: DejaTileComponent) => tileComponent.tile)
            .forEach((tile) => {
                const config = layout[tile.id] as ILayoutInfo;
                tile.bounds = config.bounds.clone();
            });
    }

    private calcHorizontalOverflow(direction: number, tiles: IDejaTile[], offset: number, blackList?: Object): number {
        let overflow = 0;
        blackList = blackList || {};

        tiles.forEach((t) => {
            if (!blackList[t.id]) {
                blackList[t.id] = t.id;

                const tryBounds = t.bounds.offset(direction * offset, 0);
                let roffset = 0;
                const maxWidth = this.getMaxPercentWidth();
                if (tryBounds.left < 0) {
                    roffset = -tryBounds.left;
                } else if (maxWidth && tryBounds.right > maxWidth) {
                    roffset = tryBounds.right - maxWidth;
                }

                const adjacentTiles = Object.values(this.tileComponents)
                    .filter((tileComponent: DejaTileComponent) => !tileComponent.isDragging && t !== tileComponent.tile && tileComponent.tile.bounds.intersectWith(tryBounds))
                    .map((tileComponent: DejaTileComponent) => tileComponent.tile);
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

    private moveHorizontal(direction: number, tiles: IDejaTile[], offset: number, targetBounds: { [id: number]: Rect }) {
        tiles.forEach((t) => {
            if (!targetBounds[t.id]) {
                // Offset tile
                const newBounds = targetBounds[t.id] = t.bounds.offset(direction * offset, 0);
                const adjacentTiles = Object.values(this.tileComponents)
                    .filter((tileComponent: DejaTileComponent) => !tileComponent.isDragging && t !== tileComponent.tile && tileComponent.tile.bounds.intersectWith(newBounds))
                    .map((tileComponent: DejaTileComponent) => tileComponent.tile);
                if (adjacentTiles.length) {
                    this.moveHorizontal(direction, adjacentTiles, offset, targetBounds);
                }
            }
        });
    }

    private pushHorizontal(bounds: Rect, direction: number, tiles?: IDejaTile[], offset?: number): number {
        let overflow = 0;
        const targetBounds = {} as { [id: number]: Rect };

        if (!offset) {
            offset = 0;
            tiles.forEach((t) => {
                const ho = direction > 0 ? Math.max(0, bounds.right - t.bounds.left) : Math.max(0, t.bounds.right - bounds.left);
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

                // Copy bounds array to tiles
                Object.values(this.tileComponents)
                    .map((tileComponent: DejaTileComponent) => tileComponent.tile)
                    .forEach((t) => {
                        if (targetBounds[t.id]) {
                            t.bounds = targetBounds[t.id];
                        }
                    });
            }
        }

        return overflow;
    }

    private calcVerticalOverflow(direction: number, tiles: IDejaTile[], offset: number, blackList?: Object): number {
        let overflow = 0;
        blackList = blackList || {};

        tiles.forEach((t) => {
            if (!blackList[t.id]) {
                blackList[t.id] = t.id;

                // Offset tile
                const tryBounds = t.bounds.offset(0, direction * offset);
                let roffset = 0;
                const maxHeight = this.getMaxPercentHeight();
                if (tryBounds.top < 0) {
                    roffset = -tryBounds.top;
                } else if (maxHeight && tryBounds.bottom > maxHeight) {
                    roffset = tryBounds.bottom - maxHeight;
                }

                const adjacentTiles = Object.values(this.tileComponents)
                    .filter((tileComponent: DejaTileComponent) => !tileComponent.isDragging && t !== tileComponent.tile && tileComponent.tile.bounds.intersectWith(tryBounds))
                    .map((tileComponent: DejaTileComponent) => tileComponent.tile);
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

    private moveVertical(direction: number, tiles: IDejaTile[], offset: number, targetBounds: { [id: number]: Rect }) {
        tiles.forEach((t) => {
            if (!targetBounds[t.id]) {
                // Offset tile
                const newBounds = targetBounds[t.id] = t.bounds.offset(0, direction * offset);
                const adjacentTiles = Object.values(this.tileComponents)
                    .filter((tileComponent: DejaTileComponent) => !tileComponent.isDragging && t !== tileComponent.tile && tileComponent.tile.bounds.intersectWith(newBounds))
                    .map((tileComponent: DejaTileComponent) => tileComponent.tile);
                if (adjacentTiles.length) {
                    this.moveVertical(direction, adjacentTiles, offset, targetBounds);
                }
            }
        });
    }

    private pushVertical(bounds: Rect, direction: number, tiles: IDejaTile[], offset?: number): number {
        let overflow = 0;
        const targetBounds = {} as { [id: number]: Rect };

        if (!offset) {
            offset = 0;
            tiles.forEach((t) => {
                const vo = direction > 0 ? Math.max(0, bounds.bottom - t.bounds.top) : Math.max(0, t.bounds.bottom - bounds.top);
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

                // Copy bounds array to tiles
                Object.values(this.tileComponents)
                    .map((tileComponent: DejaTileComponent) => tileComponent.tile)
                    .forEach((t) => {
                        if (targetBounds[t.id]) {
                            t.bounds = targetBounds[t.id];
                        }
                    });
            }
        }

        return overflow;
    }
}

interface IDragSelection {
    startPosition: Position;
    selectedRect: Rect;
}

interface IDragDropInfos {
    enabled: boolean;
    startX: number;
    startY: number;
    tiles: DejaTileComponent[];
}
