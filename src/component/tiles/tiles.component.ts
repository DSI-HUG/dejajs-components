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

import { AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnChanges, Output, SimpleChange } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/material/core/coercion/boolean-property';
import { Observable, Subscription } from 'rxjs/Rx';
import { setTimeout } from 'timers';
import { Position, Rect } from '../../common/core/graphics';
import { DejaTileSelectionChangedEvent, IDejaTile, IDejaTileEvent } from './index';
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
export class DejaTilesComponent implements ControlValueAccessor, OnChanges, AfterViewInit {

    @Input() public maxwidth = '100%';
    @Input() public maxheight: string;
    @Input() public tileminwidth = '10%';
    @Input() public tilemaxwidth = '100%';
    @Input() public tileminheight = '10%';
    @Input() public tilemaxheight = '100%';
    @Output() public tileTitleEditClick = new EventEmitter();
    @Output() public selectionChanged = new EventEmitter();
    @ContentChild('tileTemplate') public tileTemplate;

    private tiles = [] as IDejaTile[];
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
    set designMode(value: boolean) {
        this._designMode = coerceBooleanProperty(value);
        this.mouseMove = this._designMode;
        if (this._designMode) {
            this.globalMouseMove = false;
        } else {
            // Ensure no resizing cursor in readonly mode
            this.cursor = null;
        }
    }

    get designMode() {
        return this._designMode;
    }

    public get selectedTiles() {
        return this._selectedTiles;
    }

    public set selectedTiles(selectedTiles: IDejaTile[]) {
        const event = {} as DejaTileSelectionChangedEvent;
        event.selectedTiles = selectedTiles;
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
        const index = this.tiles.indexOf(tile);
        this.tiles.splice(index, 1);
        this.onChangeCallback(this.tiles);
    }

    public ensureVisible(tile: IDejaTile) {
        let target = this.el.nativeElement as HTMLElement;
        const scrollElement = (target.ownerDocument as any).scrollingElement;

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

    public getFreePlace(pageX: number, pageY: number, width: number, height: number) {
        if (!this.tiles || this.tiles.length === 0) {
            return new Rect(0, 0, width, height);
        }

        // Check if we drag on a tile
        const containerElement = this.el.nativeElement as HTMLElement;
        const containerBounds = containerElement.getBoundingClientRect();

        pageX -= containerBounds.left;
        pageY -= containerBounds.top;

        // const minSize = this.layoutProvider.getTileMinPixelSize();
        // const tile = this.layoutProvider.HitTest(this.tiles, new Rect(pageX, pageY, minSize.width, minSize.height));
    }

    public ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        for (const propName in changes) {
            if (propName === 'designMode') {
                if (this.tiles) {
                    this.tiles.filter((t) => t.selected).forEach((t) => t.selected = false);
                }
                this.selectedTiles = [];
            }
        }
    }

    public ngAfterViewInit() {
        Observable.fromEvent(window, 'resize').subscribe(() => {
            this.refresh();
        });
    }

    protected onTitleEditClicked(e: Event, tile: IDejaTile) {
        const event = e as IDejaTileEvent;
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
            const target = event.target as HTMLElement;
            this.pressedTile = this.getTileFromHTMLElement(target);
            this.mouseUp = this.pressedTile !== undefined;
            if (this.designMode) {
                if (this.pressedTile) {
                    if (event.ctrlKey) {
                        // Multi-selection is available in design mode, selection on the mouse up
                    } else {
                        let selectedTiles = this.tiles.filter((t) => t.selected);
                        if (!this.pressedTile.selected || this.cursor !== 'move') {
                            selectedTiles.forEach((t) => t.selected = false);
                            this.pressedTile.selected = true;
                            selectedTiles = [this.pressedTile];
                        }

                        const containerElement = this.el.nativeElement as HTMLElement;
                        const containerBounds = containerElement.getBoundingClientRect();

                        const pageX = event.pageX - containerBounds.left;
                        const pageY = event.pageY - containerBounds.top;

                        this.dragInfos = {
                            cursor: this.cursor,
                            enabled: false,
                            offsetX: event.offsetX,
                            offsetY: event.offsetY,
                            startX: pageX,
                            startY: pageY,
                            tiles: selectedTiles,
                        };
                        this.globalMouseUp = true;
                        this.selectedTiles = selectedTiles;
                        return true; // Continue in case of drag and drop
                    }

                } else if (target === this.el.nativeElement || target.parentNode === this.el.nativeElement) {
                    // Start drag selection
                    const containerElement = this.el.nativeElement as HTMLElement;
                    const containerBounds = containerElement.getBoundingClientRect();

                    const pageX = event.pageX - containerBounds.left;
                    const pageY = event.pageY - containerBounds.top;

                    this.dragSelection = {
                        pageOffset: new Position(pageX, pageY),
                        tilesOffset: new Position(pageX - event.offsetX, pageY - event.offsetY),
                        tilesRect: new Rect(),
                    };

                    // Unselect all tiles
                    this.tiles.filter((t) => t.selected).forEach((t) => t.selected = false);
                    this.selectedTiles = [];

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

            const element = this.el.nativeElement as HTMLElement;
            this.mouseUpObs = Observable.fromEvent(element.ownerDocument, 'mouseup').subscribe((event: MouseEvent) => {
                if (this.pressedTile) {
                    this.pressedTile.pressed = false;
                    if (this.designMode) {
                        // Multi-selection is available in design mode
                        if (event.ctrlKey) {
                            const selectedTiles = this.selectedTiles;
                            if (this.pressedTile.selected) {
                                this.pressedTile.selected = false;
                                const index = this.selectedTiles.findIndex((t) => this.pressedTile === t);
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

            const element = this.el.nativeElement as HTMLElement;
            this.globalMouseUpObs = Observable.fromEvent(element.ownerDocument, 'mouseup').subscribe(() => {
                if (this.dragSelection) {
                    this.dragSelection = undefined;
                    return false;
                } else if (this.dragInfos) {
                    if (this.dragInfos.enabled) {
                        this.layoutProvider.drop(this.dragInfos.tiles);
                    }
                    this.endDrag();
                    this.onChangeCallback(this.tiles);
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

            const element = this.el.nativeElement as HTMLElement;
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

            const element = this.el.nativeElement as HTMLElement;
            this.globalMouseMoveObs = Observable.fromEvent(element.ownerDocument, 'mousemove').subscribe((event: MouseEvent) => {
                const currentTile = this.getTileFromHTMLElement(event.target as HTMLElement);
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

            const element = this.el.nativeElement as HTMLElement;
            this.mouseMoveObs = Observable.fromEvent(element, 'mousemove').subscribe((event: MouseEvent) => {
                if (this.dragSelection) {
                    if (event.buttons !== 1) {
                        this.dragSelection = undefined;
                        return;
                    }

                    // Unselect all tiles
                    this.tiles.filter((t) => t.selected).forEach((t) => t.selected = false);

                    const containerElement = this.el.nativeElement as HTMLElement;
                    const containerBounds = containerElement.getBoundingClientRect();

                    const pageX = event.pageX - containerBounds.left;
                    const pageY = event.pageY - containerBounds.top;

                    // And select all tiles between start position and current position
                    const pageRect = Rect.fromPoints(this.dragSelection.pageOffset, new Position(pageX, pageY));
                    this.dragSelection.tilesRect = pageRect.offset(-this.dragSelection.tilesOffset.left, -this.dragSelection.tilesOffset.top);

                    const selectedTiles = [];
                    this.layoutProvider.HitTest(this.tiles, this.dragSelection.tilesRect).forEach((t) => {
                        t.selected = true;
                        selectedTiles.push(t);
                    });

                    this.selectedTiles = selectedTiles;

                } else if (this.dragInfos) {
                    if (event.buttons === 1) {
                        const containerElement = this.el.nativeElement as HTMLElement;
                        const containerBounds = containerElement.getBoundingClientRect();

                        const pageX = event.pageX - containerBounds.left;
                        const pageY = event.pageY - containerBounds.top;

                        if (!this.dragInfos.enabled) {
                            if (Math.abs(this.dragInfos.startX - pageX) > 10 || Math.abs(this.dragInfos.startY - pageY) > 10) {
                                // Start tile drag and drop
                                this.dragging = true;
                                this.dragInfos.enabled = true;
                                this.globalKeyUp = true;
                                this.layoutProvider.startDrag(this.dragInfos.tiles, this.dragInfos.cursor, pageX, pageY);
                            }
                        } else {
                            this.layoutProvider.drag(this.dragInfos.tiles, pageX, pageY);
                        }
                    } else if (this.dragInfos.enabled) {
                        this.cancelDrag();
                    }

                } else if (event.buttons !== 1) {
                    const tileElement = this.getTileElementFromHTMLElement(event.target as HTMLElement);
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

    private clearPressedTile = () => {
        if (this.pressedTile) {
            this.pressedTile.pressed = false;
            delete this.pressedTile;
        }
        this.globalMouseMove = false;
        this.mouseUp = false;
    }

    private getTileElementFromHTMLElement(element: HTMLElement) {
        let parentElement = element;

        while (parentElement && !parentElement.hasAttribute('tile-index')) {
            element = parentElement;
            parentElement = parentElement.parentElement;
            if (parentElement === this.el.nativeElement) {
                return undefined;
            }
        }

        return parentElement;
    }

    private getTileFromHTMLElement(element: HTMLElement): IDejaTile {
        const tileElement = this.getTileElementFromHTMLElement(element);

        if (!tileElement) {
            return undefined;
        }

        const index = +tileElement.getAttribute('tile-index');
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
        const ids = {};
        this.tiles.map((t) => ids[t.id] = t.id);
        while (ids[sid]) {
            sid = '#' + (++id);
        }

        return sid;
    }

    private getCursor(event: MouseEvent, tileElement: HTMLElement) {
        const x = event.x;
        const y = event.y;
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

    private cancelDrag() {
        if (this.dragInfos && this.dragInfos.enabled) {
            this.layoutProvider.cancelDrag(this.dragInfos.tiles);
        }
        this.endDrag();
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
    offsetX: number;
    offsetY: number;
    tiles: IDejaTile[];
    cursor: string;
}
