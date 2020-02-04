/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, OnDestroy, Optional, Output, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { IDejaMouseDroppableContext, IDropCursorInfos } from '@deja-js/component/mouse-dragdrop';
import { KeyCodes, Position, Rect } from '@deja-js/core';
import { from as observableFrom, fromEvent as observableFromEvent, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, filter, takeWhile } from 'rxjs/operators';
import { DejaTileGroup } from './tile-group.class';
import { DejaTile } from './tile.class';
import { DejaTilesLayoutProvider, IDejaTilesRefreshParams } from './tiles-layout.provider';
import { IDejaTileGroupModelEvent, IDejaTilesAddedEvent, IDejaTilesAddEvent, IDejaTilesDeletedEvent, IDejaTilesEvent, IDejaTilesRemoveEvent } from './tiles.event';

const noop = () => { };

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DejaTilesLayoutProvider],
    selector: 'deja-tiles',
    styleUrls: [
        './tiles.component.scss',
    ],
    templateUrl: './tiles.component.html',
})
export class DejaTilesComponent implements AfterViewInit, ControlValueAccessor, OnDestroy {
    /**
     * Raised when the selected items has changed
     */
    @Output() public selectionChanged = new EventEmitter<IDejaTilesEvent>();

    /**
     * Raised when the layout has changed with a drag and drop
     */
    @Output() public layoutChanged = new EventEmitter<IDejaTilesEvent>();

    /**
     * Raised when the layout is completed and all tiles are binded
     */
    @Output() public layoutCompleted = new EventEmitter<IDejaTilesEvent>();

    /**
     * Raised before some tiles will be added to the data model with a paste
     */
    @Output() public contentAdding = new EventEmitter<IDejaTilesAddEvent>();

    /**
     * Raised before some tiles will be removed from the data model with a delete
     */
    @Output() public contentRemoving = new EventEmitter<IDejaTilesRemoveEvent>();

    /**
     * Raised when a tile group model has changed
     */
    @Output() public tileGroupChanged = new EventEmitter<IDejaTileGroupModelEvent>();

    /**
     * Raised when tiles are added
     */
    @Output() public tilesAdded = new EventEmitter<IDejaTilesAddedEvent>();

    /**
     * Raised when tiles are deleted
     */
    @Output() public tilesDeleted = new EventEmitter<IDejaTilesDeletedEvent>();

    /**
     * Raised when some tiles are copied in the clipboard service. Can result from a copy or paste operation on the tiles.
     */
    @Output() public contentCopied = new EventEmitter<IDejaTilesEvent>();

    /**
     * Tab index of the focusable element
     */
    @Input() public tabIndex = 0;

    @ContentChild('tileTemplate')
    public tileTemplate: any;

    // NgModel implementation
    public onTouchedCallback: () => void = noop;
    public onChangeCallback: (_: any) => void = noop;

    private _models = [] as DejaTile[];
    private delete$sub: Subscription;
    private copy$sub: Subscription;
    private cut$sub: Subscription;
    private paste$sub: Subscription;
    private keyup$: Observable<KeyboardEvent>;
    private isAlive = true;
    private hasFocus = false;

    public get tiles(): DejaTile[] {
        return this.layoutProvider.tiles;
    }

    @ViewChild('tilesContainer', { static: true }) private tilesContainer: ElementRef;

    constructor(el: ElementRef, private changeDetectorRef: ChangeDetectorRef, private layoutProvider: DejaTilesLayoutProvider, @Self() @Optional() public _control: NgControl) {
        if (this._control) {
            this._control.valueAccessor = this;
        }

        const element = el.nativeElement as HTMLElement;

        observableFrom(this.layoutProvider.selectionChanged).pipe(
            takeWhile(() => this.isAlive))
            .subscribe((e) => this.selectionChanged.emit(e));

        observableFrom(this.layoutProvider.contentAdding).pipe(
            takeWhile(() => this.isAlive))
            .subscribe((e) => this.contentAdding.emit(e));

        observableFrom(this.layoutProvider.contentRemoving).pipe(
            takeWhile(() => this.isAlive))
            .subscribe((e) => this.contentRemoving.emit(e));

        observableFrom(this.layoutProvider.tilesAdded).pipe(
            takeWhile(() => this.isAlive))
            .subscribe((event) => {
                this.tilesAdded.emit(event);
                this.onChangeCallback(event.tiles);
            });

        observableFrom(this.layoutProvider.tilesDeleted).pipe(
            takeWhile(() => this.isAlive))
            .subscribe((event) => {
                this.tilesDeleted.emit(event);
                this.onChangeCallback(event.tiles);
            });

        observableFrom(this.layoutProvider.layoutChanged).pipe(
            takeWhile(() => this.isAlive))
            .subscribe((event) => {
                this.layoutChanged.emit(event);
                this.onChangeCallback(event.tiles);
            });

        observableFrom(this.layoutProvider.layoutCompleted).pipe(
            takeWhile(() => this.isAlive))
            .subscribe((event) => this.layoutCompleted.emit(event));

        this.keyup$ = observableFromEvent(element.ownerDocument, 'keyup') as Observable<KeyboardEvent>;

        observableFromEvent(window, 'resize').pipe(
            takeWhile(() => this.isAlive),
            debounceTime(5))
            .subscribe(() => this.refresh({ resetWidth: true }));
    }

    // provide a public access
    public get selectionRect$(): Subject<Rect> {
        return this.layoutProvider.selectionRect$;
    }

    @Input()
    public set tileminwidth(value: string) {
        this.layoutProvider.tileMinWidth = value;
    }

    @Input()
    public set tilemaxwidth(value: string) {
        this.layoutProvider.tileMaxWidth = value;
    }

    @Input()
    public set tileminheight(value: string) {
        this.layoutProvider.tileMinHeight = value;
    }

    @Input()
    public set tilemaxheight(value: string) {
        this.layoutProvider.tileMaxHeight = value;
    }

    @Input()
    public set maxwidth(value: string) {
        this.layoutProvider.maxWidth = value;
    }

    @Input()
    public set designMode(value: boolean | string) {
        this.layoutProvider.designMode = coerceBooleanProperty(value);
    }

    public get designMode() {
        return this.layoutProvider.designMode;
    }

    @Input()
    public set models(models: DejaTile[]) {
        this.writeValue(models);
    }

    @Input()
    public set canDelete(value: boolean) {
        if (coerceBooleanProperty(value) && !this.delete$sub) {
            this.delete$sub = this.keyup$.pipe(
                filter(() => this.layoutProvider.designMode),
                filter((event: KeyboardEvent) => {
                    const keyCode = event.keyCode || (<any>KeyCodes)[event.code];
                    return keyCode === KeyCodes.Delete && this.hasFocus;
                }))
                .subscribe(() => this.layoutProvider.deleteSelection());

        } else if (this.delete$sub) {
            this.delete$sub.unsubscribe();
            this.delete$sub = undefined;
        }
    }

    @Input()
    public set canCopy(value: boolean) {
        if (coerceBooleanProperty(value) && !this.copy$sub) {
            this.copy$sub = this.keyup$.pipe(
                filter((event: KeyboardEvent) => {
                    const keyCode = event.keyCode || (<any>KeyCodes)[event.code];
                    return keyCode === KeyCodes.KeyC && event.ctrlKey && this.hasFocus;
                }))
                .subscribe(() => {
                    this.copySelection();
                });

        } else if (this.copy$sub) {
            this.copy$sub.unsubscribe();
            this.copy$sub = undefined;
        }
    }

    @Input()
    public set canCut(value: boolean) {
        if (coerceBooleanProperty(value) && !this.cut$sub) {
            this.cut$sub = this.keyup$.pipe(
                filter(() => this.layoutProvider.designMode),
                filter((event: KeyboardEvent) => {
                    const keyCode = event.keyCode || (<any>KeyCodes)[event.code];
                    return keyCode === KeyCodes.KeyX && event.ctrlKey && this.hasFocus;
                }))
                .subscribe(() => {
                    this.cutSelection();
                });

        } else if (this.cut$sub) {
            this.cut$sub.unsubscribe();
            this.cut$sub = undefined;
        }
    }

    @Input()
    public set canPaste(value: boolean) {
        if (coerceBooleanProperty(value) && !this.paste$sub) {
            this.paste$sub = this.keyup$.pipe(
                filter(() => this.layoutProvider.designMode),
                filter((event: KeyboardEvent) => {
                    const keyCode = event.keyCode || (<any>KeyCodes)[event.code];
                    return keyCode === KeyCodes.KeyV && event.ctrlKey && this.hasFocus;
                }))
                .subscribe(() => this.paste());

        } else if (this.paste$sub) {
            this.paste$sub.unsubscribe();
            this.paste$sub = undefined;
        }
    }

    @Input()
    public set selectedTiles(selectedTiles: Array<DejaTile | string>) {
        this.layoutProvider.selectedTiles = selectedTiles.map((tile) => typeof tile === 'string' ? tile : (<DejaTile>tile).id);
    }

    // ************* ControlValueAccessor Implementation **************
    public writeValue(models: any) {
        this._models = models || [];
        const tiles = this._models;
        this.layoutProvider.tiles = tiles;
        this.changeDetectorRef.markForCheck();
    }

    public registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
    // ************* End of ControlValueAccessor Implementation **************

    public ngAfterViewInit() {
        this.layoutProvider.container = this.tilesContainer.nativeElement;
        this.refresh({ resetWidth: true });
    }

    public ngOnDestroy() {
        this.layoutProvider.ngOnDestroy();
        this.canCopy = false;
        this.canCut = false;
        this.canDelete = false;
        this.canPaste = false;
        this.isAlive = false;
    }

    public copySelection() {
        const tiles = this.layoutProvider.copySelection();
        if (tiles && tiles.length) {
            const event = new CustomEvent('DejaTilesCopied', { cancelable: true }) as IDejaTilesEvent;
            event.tiles = tiles;
            this.contentCopied.emit(event);
        }
    }

    public cutSelection() {
        const tiles = this.layoutProvider.cutSelection();
        if (tiles && tiles.length) {
            const event = new CustomEvent('DejaTilesCutted', { cancelable: true }) as IDejaTilesEvent;
            event.tiles = tiles;
            this.contentCopied.emit(event);
        }
    }

    public deleteSelection() {
        const tiles = this.layoutProvider.deleteSelection();
        this.changeDetectorRef.markForCheck();
        return tiles;
    }

    public paste() {
        const tiles = this.layoutProvider.paste();
        this.changeDetectorRef.markForCheck();
        return tiles;
    }

    public ensureVisible(id: string) {
        this.layoutProvider.ensureVisible$.next(id);
    }

    public refresh(params?: IDejaTilesRefreshParams) {
        this.layoutProvider.refreshTiles$.next(params);
    }

    public addTiles(tiles: DejaTile[]) {
        this.layoutProvider.addTiles(tiles);
    }

    public removeTiles(tileIds: string[]) {
        this.layoutProvider.removeTiles(tileIds);
    }

    public HitTest(pageX: number, pageY: number) {
        const containerElement = this.tilesContainer.nativeElement as HTMLElement;
        const containerBounds = containerElement.getBoundingClientRect();

        const x = pageX - containerBounds.left;
        const y = pageY - containerBounds.top;

        return this.tiles.find(t => t.pixelBounds && t.pixelBounds.containsPoint(new Position(x, y)));
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

        const percentBounds = new Rect(this.layoutProvider.getPercentSize(x), this.layoutProvider.getPercentSize(y), width, height);
        return this.layoutProvider.getFreePlace(percentBounds);
    }

    public moveTile(id: string, bounds: Rect) {
        this.layoutProvider.moveTile(id, bounds);
    }

    public getDropContext() {
        return {
            dragEnter: (dragContext, dragCursor) => {
                return this.layoutProvider.dragEnter(dragContext, dragCursor) && {
                    className: 'hidden', // Hide drag cursor
                } as IDropCursorInfos;
            },
            dragOver: (_dragContext, dragCursor) => {
                this.layoutProvider.dragover$.next(dragCursor);
            },
            dragLeave: (_dragContext) => {
                this.layoutProvider.dragleave$.next();
            },
        } as IDejaMouseDroppableContext;
    }

    public onTileClosed(tile: DejaTile) {
        this.layoutProvider.removeTiles([tile.id]);
    }

    public onTileGroupModelChanged(tileGroup: DejaTileGroup) {
        const event = new CustomEvent('DejaTileGroupModelEvent', { cancelable: false }) as IDejaTileGroupModelEvent;
        event.tileGroup = tileGroup;
        this.tileGroupChanged.emit(event);
    }

    public onFocus() {
        this.hasFocus = true;
    }

    public onBlur() {
        this.hasFocus = false;
    }
}
