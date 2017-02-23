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

import { AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, forwardRef, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/material/core/coercion/boolean-property';
import { Observable } from 'rxjs/Rx';
import { Rect } from '../../common/core/graphics';
import { DejaTileComponent, DejaTileSelectionChangedEvent, IDejaTile, IDejaTileEvent } from './index';
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
        DejaTilesLayoutProvider,
    ],
    selector: 'deja-tiles',
    styleUrls: [
        './tiles.component.scss',
    ],
    templateUrl: './tiles.component.html',
})
export class DejaTilesComponent implements ControlValueAccessor, AfterViewInit {
    @Output() public tileTitleEditClick = new EventEmitter();
    @Output() public selectionChanged = new EventEmitter();
    @ContentChild('tileTemplate') public tileTemplate;
    @ViewChildren(DejaTileComponent) public tileComponents: QueryList<DejaTileComponent>;
    @ViewChild('tilesContainer') private tilesContainer: ElementRef;

    private _tiles = [] as IDejaTile[];

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    constructor(el: ElementRef, private layoutProvider: DejaTilesLayoutProvider) {
        this.layoutProvider.container = el.nativeElement as HTMLElement;

        this.layoutProvider.selectedTiles.subscribe((selectedTiles) => {
            const event = {} as DejaTileSelectionChangedEvent;
            event.tiles = selectedTiles;
            this.selectionChanged.emit(event);
        });
    }

    @Input()
    public set tileminwidth(value: string) {
        this.layoutProvider.tileminwidth = value;
    }

    @Input()
    public set tilemaxwidth(value: string) {
        this.layoutProvider.tileminwidth = value;
    }

    @Input()
    public set tileminheight(value: string) {
        this.layoutProvider.tileminheight = value;
    }

    @Input()
    public set tilemaxheight(value: string) {
        this.layoutProvider.tilemaxheight = value;
    }

    @Input()
    public set maxwidth(value: string) {
        this.layoutProvider.maxwidth = value;
    }

    @Input()
    public set maxheight(value: string) {
        this.layoutProvider.maxheight = value;
    }

    @Input()
    public set designMode(value: boolean) {
        this.layoutProvider.designMode.next(coerceBooleanProperty(value));
    };

    @Input()
    public set tiles(value: IDejaTile[]) {
        this._tiles = value;
    }

    public get tiles() {
        return this._tiles;
    }

    @Input()
    public set selectedTiles(selectedTiles: IDejaTile[]) {
        this.layoutProvider.selectedTiles.next(selectedTiles);
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
        this.tiles = value || [];
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

    public ngAfterViewInit() {
        Observable.fromEvent(window, 'resize').subscribe(() => {
            this.refresh();
        });
    }

    public onTitleEditClicked(e: Event, tile: IDejaTile) {
        const event = e as IDejaTileEvent;
        event.tile = tile;
        this.tileTitleEditClick.emit(event);
    }

    public removeTile(tile: IDejaTile) {
        const index = this.tiles.indexOf(tile);
        this.tiles.splice(index, 1);
        this.onChangeCallback(this.tiles);
    }

    public ensureVisible(tile: IDejaTile) {
        this.layoutProvider.ensureVisible.next(tile);
    }

    public expandTile(tile: IDejaTile, pixelheight: number) {
        this.layoutProvider.expandTile(tile, pixelheight);
    }

    public cancelExpand() {
        this.layoutProvider.cancelExpand();
    }

    public refresh() {
        this.layoutProvider.refreshTiles.next();
    }

    protected onDragStart() {
        // Disallow HTML drag and drop in design mode
        return !this.layoutProvider.isDesignMode;
    }

    public getFreePlace(pageX?: number, pageY?: number, width?: number, height?: number) {
        if (!this.tiles || this.tiles.length === 0) {
            return new Rect(0, 0, width, height);
        }

        // Check if we drag on a tile
        const containerElement = this.tilesContainer.nativeElement as HTMLElement;
        const containerBounds = containerElement.getBoundingClientRect();

        const x = pageX ? (pageX - containerBounds.left) : 0;
        const y = pageY ? (pageY - containerBounds.top) : 0;

        return this.layoutProvider.getFreePlace(new Rect(this.layoutProvider.getPercentSize(x), this.layoutProvider.getPercentSize(y), width, height));
    }

    // public drop() {
    //     if (this.dragInfos.enabled) {
    //         this.layoutProvider.drop(this.dragInfos.tiles);

    //         if (this.dragInfos.tiles.length === 1) {
    //             const tileComponent = this.dragInfos.tiles[0];
    //             if (tileComponent.tile.id === 'new') {
    //                 // TODO tile.id = this.getCurrentId();
    //             }
    //         }
    //     }
    //     this.endDrag();
    //     this.onChangeCallback(this.tiles);
    // }

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

    // public set globalKeyUp(value: boolean) {
    //     if (value) {
    //         if (this.globalKeyUpObs) {
    //             return;
    //         }

    //         this.globalKeyUpObs = Observable.fromEvent(this.element.ownerDocument, 'keyup').subscribe((event: KeyboardEvent) => {
    //             if (event.keyCode === 27) {
    //                 this.cancelDrag();
    //             }
    //         });

    //     } else if (this.globalKeyUpObs) {
    //         this.globalKeyUpObs.unsubscribe();
    //         delete this.globalKeyUpObs;
    //     }
    // }

    // public set globalMouseMove(value: boolean) {
    //     if (value) {
    //         if (this.globalMouseMoveObs) {
    //             return;
    //         }

    //         let element = this.tilesContainer.nativeElement as HTMLElement;
    //         this.globalMouseMoveObs = Observable.fromEvent(element.ownerDocument, 'mousemove').subscribe((event: MouseEvent) => {
    //             let currentTile = this.layoutProvider.getTileComponentFromHTMLElement(event.target as HTMLElement);
    //             if (this.pressedTile && this.pressedTile.pressed && event.buttons === 1 && this.pressedTile === currentTile) {
    //                 return;
    //             }
    //             this.clearPressedTile();
    //         });

    //     } else if (this.globalMouseMoveObs) {
    //         this.globalMouseMoveObs.unsubscribe();
    //         delete this.globalMouseMoveObs;
    //     }
    // }

    // private clearPressedTile() {
    //     if (this.pressedTile) {
    //         this.pressedTile.pressed.next(false);
    //         delete this.pressedTile;
    //     }
    //     this.globalMouseMove = false;
    //     this.mouseUp = false;
    // }

    // private endDrag() {
    //     // console.log('EndDrag');
    //     if (this.dragInfos) {
    //         if (this.dragInfos.enabled) {
    //             this.dragInfos.enabled = false;
    //             setTimeout(() => {
    //                 this.dragging = this.dragInfos && this.dragInfos.enabled;
    //             }, 500);
    //         }
    //         this.globalKeyUp = false;
    //         // this.globalMouseUp = false;
    //         delete this.dragInfos;
    //     }
    // }
}
