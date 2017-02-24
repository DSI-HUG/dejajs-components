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
import { DejaTile, DejaTileComponent, DejaTileSelectionChangedEvent, IDejaTile, IDejaTileEvent } from './index';
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

    private _models = [] as IDejaTile[];

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    constructor(el: ElementRef, private layoutProvider: DejaTilesLayoutProvider) {
        this.layoutProvider.container = el.nativeElement as HTMLElement;

        this.layoutProvider.selectedTiles$.subscribe((selectedTiles) => {
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
        this.layoutProvider.tilemaxwidth = value;
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
        this.layoutProvider.designMode$.next(coerceBooleanProperty(value));
    };

    @Input()
    public set models(value: IDejaTile[]) {
        this.writeValue(value);
    }

    public get models() {
        return this._models;
    }

    public get tiles() {
        return this.layoutProvider.tiles;
    }

    @Input()
    public set selectedTiles(selectedTiles: IDejaTile[]) {
        this.layoutProvider.selectedTiles$.next(selectedTiles);
    }

    // ************* ControlValueAccessor Implementation **************
    // From ControlValueAccessor interface
    public writeValue(value: any) {
        this._models = value || [];
        this.layoutProvider.tiles = (value && value.map((tile) => new DejaTile(tile))) || [];
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
        const index = this._models.indexOf(tile);
        this._models.splice(index, 1);
        this.onChangeCallback(this._models);
    }

    public ensureVisible(tile: IDejaTile) {
        this.layoutProvider.ensureVisible$.next(tile);
    }

    public expandTile(tile: IDejaTile, pixelheight: number) {
        this.layoutProvider.expandTile(tile, pixelheight);
    }

    public cancelExpand() {
        this.layoutProvider.cancelExpand();
    }

    public refresh() {
        this.layoutProvider.refreshTiles$.next(true);
    }

    protected onDragStart() {
        // Disallow HTML drag and drop in design mode
        return !this.layoutProvider.isDesignMode;
    }

    public getFreePlace(pageX?: number, pageY?: number, width?: number, height?: number) {
        if (!this._models || this._models.length === 0) {
            return new Rect(0, 0, width, height);
        }

        // Check if we drag on a tile
        const containerElement = this.tilesContainer.nativeElement as HTMLElement;
        const containerBounds = containerElement.getBoundingClientRect();

        const x = pageX ? (pageX - containerBounds.left) : 0;
        const y = pageY ? (pageY - containerBounds.top) : 0;

        return this.layoutProvider.getFreePlace(new Rect(this.layoutProvider.getPercentSize(x), this.layoutProvider.getPercentSize(y), width, height));
    }
}
