/*
 * *
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/deja-js/blob/master/LICENSE
 * /
 *
 */

import { Component, ContentChild, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output, SimpleChange, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { coerceBooleanProperty } from '@angular/material/core/coercion/boolean-property';
import { Observable, Subscription } from 'rxjs/Rx';
import { setTimeout } from 'timers';
import { Position, Rect } from '../../common/core/graphics';
import { DejaTileSelectionChangedEvent, IDejaTile, IDejaTileEvent, IDejaTileList } from './index';
import { DejaTilesLayoutProvider } from './tiles-layout.provider';

const noop = () => { };

const DejaTilesComponentValueAccessor = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DejaTilesComponent),
};

@Component({
    providers: [
        DejaTilesComponentValueAccessor,
    ],
    selector: 'deja-tiles',
    styleUrls: [
        './tiles.component.scss',
    ],
    templateUrl: './tiles.component.html',
})
export class DejaTilesComponent implements ControlValueAccessor {

    @Input() public maxwidth = '100%';
    @Input() public maxheight: string;
    @Input() public tileminwidth = '10%';
    @Input() public tilemaxwidth = '100%';
    @Input() public tileminheight = '10%';
    @Input() public tilemaxheight = '100%';
    @Output() public tileTitleEditClick = new EventEmitter();
    @Output() public selectionChanged = new EventEmitter();
    @ContentChild('tileTemplate') public tileTemplate;
    @ViewChild('tilesContainer') private tilesContainer: ElementRef;

    private _tiles = [] as IDejaTileList;
    private dragInfos: IDejaTileDragDropInfos;
    private dragging = false;
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;
    private _selectedTiles: IDejaTile[];
    private _layoutProvider: DejaTilesLayoutProvider;
    private width: number;
    private height: number;
    private cursor: string;
    private pressedTile: IDejaTile;
    private _designMode = false;

    private mouseMoveObs: Subscription;
    private mouseUpObs: Subscription;
    private globalMouseMoveObs: Subscription;
    private globalMouseUpObs: Subscription;
    private globalKeyUpObs: Subscription;

    private dragSelection: {
        pageOffset: Position,
        tilesOffset: Position,
        tilesRect: Rect,
    };

    constructor(private el: ElementRef) {
    }

    @Input()
    public set designMode(value: boolean) {
        this._designMode = coerceBooleanProperty(value);
        this.mouseMove = this._designMode;
        if (this._designMode) {
            this.globalMouseMove = false;
        } else {
            // Ensure no resizing cursor in readonly mode
            this.cursor = null;
        }
    }

    @Input()
    public set tiles(value: IDejaTile[]) {
        this._tiles = value;
        this._selectedTiles = this._tiles ? this._tiles.filter((t) => t.selected) : [];
    }

    public get tiles() {
        return this._tiles;
    }

    public get designMode() {
        return this._designMode;
    }

    public get selectedTiles() {
        return this._selectedTiles;
    }

    public set selectedTiles(selectedTiles: IDejaTile[]) {
        let event = {} as DejaTileSelectionChangedEvent;
        event.tiles = selectedTiles;
        this.selectionChanged.emit(event);
        this._selectedTiles = selectedTiles;
    }

    private get layoutProvider() {
        if (!this._layoutProvider) {
            this._layoutProvider = new DejaTilesLayoutProvider(this.maxwidth, this.maxheight, this.tileminwidth, this.tilemaxwidth, this.tileminheight, this.tilemaxheight, (width, height) => {
                this.width = width;
                this.height = height;
            });
        }
        return this._layoutProvider;
    }

    // ************* ControlValueAccessor Implementation **************
    // get accessor
    get value(): any {
        return this.tiles;
    }

    // set accessor including call the onchange callback
    set value(v: any) {
        this.writeValue(v);
        this.onChangeCallback(v);
    }

    // From ControlValueAccessor interface
    public writeValue(value: any) {
        this.tiles = value;
        if (this.tiles) {
            this.ensureIds();
            this.layoutProvider.refreshTiles(this.tiles, this.el.nativeElement.clientWidth);
        } else {
            this.tiles = [];
        }
    }

    // From ControlValueAccessor interface
    public registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    public registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
    // ************* End of ControlValueAccessor Implementation **************

    public removeTile(tile: IDejaTile) {
        let index = this.tiles.indexOf(tile);
        this.tiles.splice(index, 1);
        this.onChangeCallback(this.tiles);
    }

    public ensureVisible(tile: IDejaTile) {
        let target = this.el.nativeElement as HTMLElement;
        let scrollElement = target;

        if (tile) {
            let left = tile.l;
            let right = tile.r;
            let top = tile.t;
            let bottom = tile.b;

            while (target && target.tagName !== 'BODY') {
                left += target.offsetLeft;
                right += target.offsetLeft;
                top += target.offsetTop;
                bottom += target.offsetTop;
                target = target.offsetParent as HTMLElement;
            }

            if (left < scrollElement.scrollLeft) {
                scrollElement.scrollLeft = left;
            } else if (right > scrollElement.scrollLeft + scrollElement.clientWidth) {
                scrollElement.scrollLeft = right;
            }
            if (top < scrollElement.scrollTop) {
                scrollElement.scrollTop = top;
            } else if (bottom > scrollElement.scrollTop + scrollElement.clientHeight) {
                scrollElement.scrollTop = bottom;
            }
        }
    }

    public expandTile(tile: IDejaTile, pixelheight: number) {
        this.layoutProvider.expandTile(tile, pixelheight);
    }

    public cancelExpand() {
        this.layoutProvider.cancelExpand();
    }

    public refresh() {
        if (this.tiles) {
            this.ensureIds();
            this.layoutProvider.refreshTiles(this.tiles, this.el.nativeElement.clientWidth);
        }
    }

    public getFreePlace(pageX?: number, pageY?: number, width?: number, height?: number) {
        if (!this.tiles || this.tiles.length === 0) {
            return new Rect(0, 0, width, height);
        }

        // Check if we drag on a tile
        let containerElement = this.tilesContainer.nativeElement as HTMLElement;
        let containerBounds = containerElement.getBoundingClientRect();

        const x = pageX ? (pageX - containerBounds.left) : 0;
        const y = pageY ? (pageY - containerBounds.top) : 0;

        return this.layoutProvider.getFreePlace(this.tiles, new Rect(this.layoutProvider.getPercentSize(x), this.layoutProvider.getPercentSize(y), width, height));
    }

    public startDrag(tiles: IDejaTile[], pageX: number, pageY: number, cursor?: string) {
        let containerElement = this.tilesContainer.nativeElement as HTMLElement;
        let containerBounds = containerElement.getBoundingClientRect();

        let x = pageX - containerBounds.left;
        let y = pageY - containerBounds.top;

        this.dragInfos = {
            cursor: cursor,
            enabled: false,
            startX: x,
            startY: y,
            tiles: tiles,
        };
        this.globalMouseUp = true;
        this.selectedTiles = tiles;
    }

    public drag(pageX: number, pageY: number) {
        const containerElement = this.tilesContainer.nativeElement as HTMLElement;
        const containerBounds = containerElement.getBoundingClientRect();

        const x = pageX - containerBounds.left;
        const y = pageY - containerBounds.top;

        if (!this.dragInfos.enabled) {
            if (Math.abs(this.dragInfos.startX - x) > 10 || Math.abs(this.dragInfos.startY - y) > 10) {
                // Allow drag and drop of new tiles from outside the component
                if (this.dragInfos.tiles.length === 1 && !this.tiles.find((t) => t === this.dragInfos.tiles[0])) {
                    const tile = this.dragInfos.tiles[0];
                    this.tiles.push(tile);
                    const bounds = tile.bounds;
                    this.dragInfos.startX = x - bounds.width / 2;
                    this.dragInfos.startY = y - bounds.height / 2;
                    tile.id = 'new';
                    tile.bounds = new Rect(this.layoutProvider.getPercentSize(x) - bounds.width / 2, this.layoutProvider.getPercentSize(y) - bounds.height / 2, bounds.width, bounds.height);
                    tile.dragging = true;
                    this.clearSelection();
                    tile.selected = true;
                    this.selectedTiles = [tile];
                }

                // Start tile drag and drop
                this.dragging = true;
                this.dragInfos.enabled = true;
                this.globalKeyUp = true;
                this.layoutProvider.startDrag(this.dragInfos.tiles, this.dragInfos.cursor, x, y);
            }
        } else {
            this.layoutProvider.drag(this.dragInfos.tiles, x, y);
        }
    }

    public drop() {
        if (this.dragInfos.enabled) {
            this.layoutProvider.drop(this.dragInfos.tiles);

            if (this.dragInfos.tiles.length === 1) {
                const tile = this.dragInfos.tiles[0];
                if (tile.id === 'new') {
                    tile.id = this.getCurrentId();
                }
            }
        }
        this.endDrag();
        this.onChangeCallback(this.tiles);
    }

    public cancelDrag() {
        if (this.dragInfos && this.dragInfos.enabled) {
            if (this.dragInfos.tiles.length === 1) {
                const tile = this.dragInfos.tiles[0];
                if (tile.id === 'new') {
                    const index = this.tiles.indexOf(tile);
                    if (index >= 0) {
                        this.tiles.splice(index, 1);
                    }
                }
            }
            this.layoutProvider.cancelDrag(this.dragInfos.tiles);
        }
        this.endDrag();
    }

    protected ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        for (let propName in changes) {
            if (propName === 'designMode') {
                this.clearSelection();
            }
        }
    }

    protected ngAfterViewInit() {
        Observable.fromEvent(window, 'resize').subscribe(() => {
            this.refresh();
        });
    }

    protected onTitleEditClicked(e: Event, tile: IDejaTile) {
        let event = e as IDejaTileEvent;
        event.tile = tile;
        this.tileTitleEditClick.emit(event);
    }

    protected onDragStart() {
        // Disallow HTML drag and drop in design mode
        return !this.designMode;
    }

    @HostListener('mousedown', ['$event'])
    protected onMouseDown(event: MouseEvent) {
        if (event.buttons === 1 && this.tiles) {
            let target = event.target as HTMLElement;
            this.pressedTile = this.getTileFromHTMLElement(target);
            this.mouseUp = this.pressedTile !== undefined;
            if (this.designMode) {
                if (this.pressedTile) {
                    if (event.ctrlKey) {
                        // Multi-selection is available in design mode, selection on the mouse up
                    } else {
                        let selectedTiles = this.tiles.filter((t) => t.selected);
                        if (!this.pressedTile.selected || this.cursor !== 'move') {
                            this.clearSelection();
                            this.pressedTile.selected = true;
                            selectedTiles = [this.pressedTile];
                        }

                        this.startDrag(selectedTiles, event.pageX, event.pageY, this.cursor);
                        return true; // Continue in case of drag and drop
                    }

                } else if (target === this.el.nativeElement || target === this.tilesContainer.nativeElement) {
                    // Start drag selection
                    let containerElement = this.tilesContainer.nativeElement as HTMLElement;
                    let containerBounds = containerElement.getBoundingClientRect();

                    let pageX = event.pageX - containerBounds.left;
                    let pageY = event.pageY - containerBounds.top;

                    this.dragSelection = {
                        pageOffset: new Position(pageX, pageY),
                        tilesOffset: new Position(pageX - event.offsetX, pageY - event.offsetY),
                        tilesRect: new Rect(),
                    };

                    // Unselect all tiles
                    this.clearPressedTile();
                    this.clearSelection();

                    event.preventDefault();
                    return false;
                }
            } else if (this.pressedTile) {
                this.pressedTile.pressed = true;
                this.globalMouseMove = true;
                return true; // Continue in case of drag and drop
            }
        }
    }

    public set mouseUp(value: boolean) {
        if (value) {
            if (this.mouseUpObs) {
                return;
            }

            let element = this.el.nativeElement as HTMLElement;
            this.mouseUpObs = Observable.fromEvent(element.ownerDocument, 'mouseup').subscribe((event: MouseEvent) => {
                if (this.pressedTile) {
                    this.pressedTile.pressed = false;
                    if (this.designMode) {
                        // Multi-selection is available in design mode
                        if (event.ctrlKey) {
                            let selectedTiles = this.selectedTiles;
                            if (this.pressedTile.selected) {
                                this.pressedTile.selected = false;
                                let index = this.selectedTiles.findIndex((t) => this.pressedTile === t);
                                selectedTiles.splice(index, 1);
                            } else {
                                this.pressedTile.selected = true;
                                selectedTiles.push(this.pressedTile);
                            }
                            this.selectedTiles = selectedTiles;
                        }
                    }
                }
            });

        } else if (this.mouseUpObs) {
            this.mouseUpObs.unsubscribe();
            delete this.mouseUpObs;
        }
    }

    public set globalMouseUp(value: boolean) {
        if (value) {
            if (this.globalMouseUpObs) {
                return;
            }

            let element = this.el.nativeElement as HTMLElement;
            this.globalMouseUpObs = Observable.fromEvent(element.ownerDocument, 'mouseup').subscribe(() => {
                if (this.dragSelection) {
                    this.dragSelection = undefined;
                    return false;
                } else if (this.dragInfos) {
                    this.drop();
                    return false;
                }
            });

        } else if (this.globalMouseUpObs) {
            this.globalMouseUpObs.unsubscribe();
            delete this.globalMouseUpObs;
        }
    }

    public set globalKeyUp(value: boolean) {
        if (value) {
            if (this.globalKeyUpObs) {
                return;
            }

            let element = this.el.nativeElement as HTMLElement;
            this.globalKeyUpObs = Observable.fromEvent(element.ownerDocument, 'keyup').subscribe((event: KeyboardEvent) => {
                if (event.keyCode === 27) {
                    this.cancelDrag();
                }
            });

        } else if (this.globalKeyUpObs) {
            this.globalKeyUpObs.unsubscribe();
            delete this.globalKeyUpObs;
        }
    }

    public set globalMouseMove(value: boolean) {
        if (value) {
            if (this.globalMouseMoveObs) {
                return;
            }

            let element = this.tilesContainer.nativeElement as HTMLElement;
            this.globalMouseMoveObs = Observable.fromEvent(element.ownerDocument, 'mousemove').subscribe((event: MouseEvent) => {
                let currentTile = this.getTileFromHTMLElement(event.target as HTMLElement);
                if (this.pressedTile && this.pressedTile.pressed && event.buttons === 1 && this.pressedTile === currentTile) {
                    return;
                }
                this.clearPressedTile();
            });

        } else if (this.globalMouseMoveObs) {
            this.globalMouseMoveObs.unsubscribe();
            delete this.globalMouseMoveObs;
        }
    }

    public set mouseMove(value: boolean) {
        if (value) {
            if (this.mouseMoveObs) {
                return;
            }

            let containerElement = this.tilesContainer.nativeElement as HTMLElement;
            this.mouseMoveObs = Observable.fromEvent(containerElement, 'mousemove').subscribe((event: MouseEvent) => {
                if (this.dragSelection) {
                    if (event.buttons !== 1) {
                        this.dragSelection = undefined;
                        return;
                    }

                    // Unselect all tiles
                    this.clearSelection();

                    let containerBounds = containerElement.getBoundingClientRect();

                    let pageX = event.pageX - containerBounds.left;
                    let pageY = event.pageY - containerBounds.top;

                    // And select all tiles between start position and current position
                    let pageRect = Rect.fromPoints(this.dragSelection.pageOffset, new Position(pageX, pageY));
                    this.dragSelection.tilesRect = pageRect.offset(-this.dragSelection.tilesOffset.left, -this.dragSelection.tilesOffset.top);

                    let selectedTiles = [];
                    this.layoutProvider.HitTest(this.tiles, this.dragSelection.tilesRect).forEach((t) => {
                        t.selected = true;
                        selectedTiles.push(t);
                    });

                    this.selectedTiles = selectedTiles;

                } else if (this.dragInfos) {
                    if (event.buttons === 1) {
                        this.drag(event.pageX, event.pageY);
                    } else if (this.dragInfos.enabled) {
                        this.cancelDrag();
                    }

                } else if (event.buttons !== 1) {
                    let tileElement = this.getTileElementFromHTMLElement(event.target as HTMLElement);
                    if (tileElement) {
                        this.cursor = this.getCursor(event, tileElement);
                    } else {
                        this.cursor = null;
                    }
                }
            });
        } else if (this.mouseMoveObs) {
            this.mouseMoveObs.unsubscribe();
            delete this.mouseMoveObs;
        }
    }

    private clearPressedTile() {
        if (this.pressedTile) {
            this.pressedTile.pressed = false;
            delete this.pressedTile;
        }
        this.globalMouseMove = false;
        this.mouseUp = false;
    }

    private clearSelection() {
        this.tiles && this.tiles.filter((t) => t.selected).forEach((t) => t.selected = false);
        this.selectedTiles = [];
    }

    private getTileElementFromHTMLElement(element: HTMLElement) {
        let parentElement = element;

        while (parentElement && !parentElement.hasAttribute('tile-index')) {
            element = parentElement;
            parentElement = parentElement.parentElement;
            if (parentElement === this.tilesContainer.nativeElement) {
                return undefined;
            }
        }

        return parentElement;
    }

    private getTileFromHTMLElement(element: HTMLElement): IDejaTile {
        let tileElement = this.getTileElementFromHTMLElement(element);

        if (!tileElement) {
            return undefined;
        }

        let index = +tileElement.getAttribute('tile-index');
        return this.tiles[index];
    }

    private ensureIds() {
        this.tiles.forEach((t) => {
            if (!t.id) {
                t.id = this.getCurrentId();
            }
        });
    }

    private getCurrentId(): string {
        let id = 0;
        let sid = '#' + id;
        let ids = {};
        this.tiles.map((t) => ids[t.id] = t.id);
        while (ids[sid]) {
            sid = '#' + (++id);
        }

        return sid;
    }

    private getCursor(event: MouseEvent, tileElement: HTMLElement) {
        let x = event.x;
        let y = event.y;
        let bounds = tileElement.getBoundingClientRect();

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

    private endDrag() {
        // console.log('EndDrag');
        if (this.dragInfos) {
            if (this.dragInfos.enabled) {
                this.dragInfos.enabled = false;
                setTimeout(() => {
                    this.dragging = this.dragInfos && this.dragInfos.enabled;
                }, 500);
            }
            this.globalKeyUp = false;
            this.globalMouseUp = false;
            delete this.dragInfos;
        }
    }
}

interface IDejaTileDragDropInfos {
    enabled: boolean;
    startX: number;
    startY: number;
    tiles: IDejaTile[];
    cursor: string;
}
