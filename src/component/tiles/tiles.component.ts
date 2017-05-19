/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Rect } from '../../common/core/graphics/rect';
import { KeyCodes } from '../../common/core/keycodes.enum';
import { IDejaMouseDroppableContext, IDropCursorInfos } from '../mouse-dragdrop/index';
import { DejaTile, DejaTileGroupComponent, IDejaTile, IDejaTilesAddEvent, IDejaTilesEvent, IDejaTilesModelEvent, IDejaTilesRefreshParams, IDejaTilesRemoveEvent } from './index';
import { DejaTilesLayoutProvider } from './tiles-layout.provider';

@Component({
    providers: [DejaTilesLayoutProvider],
    selector: 'deja-tiles',
    styleUrls: [
        './tiles.component.scss',
    ],
    templateUrl: './tiles.component.html',
})
export class DejaTilesComponent implements AfterViewInit, OnDestroy {
    /**
     * Raised when the selected items has changed
     */
    @Output() public selectionChanged = new EventEmitter<IDejaTilesEvent>();

    /**
     * Raised when the layout has changed with a drag and drop
     */
    @Output() public layoutChanged = new EventEmitter<IDejaTilesEvent>();

    /**
     * Raised before some tiles will be added to the data model with a paste
     */
    @Output() public contentAdding = new EventEmitter<IDejaTilesAddEvent>();

    /**
     * Raised before some tiles will be removed from the data model with a delete
     */
    @Output() public contentRemoving = new EventEmitter<IDejaTilesRemoveEvent>();

    /**
     * Raised when some tiles model has changed
     */
    @Output() public modelChanged = new EventEmitter<IDejaTilesModelEvent>();

    /**
     * Raised when some tiles are copied in the clipboard service. Can result from a copy or paste operation on the tiles.
     */
    @Output() public contentCopied = new EventEmitter<IDejaTilesEvent>();

    @ContentChild('tileTemplate') protected tileTemplate;

    private _models = [] as IDejaTile[];
    private delete$sub: Subscription;
    private copy$sub: Subscription;
    private cut$sub: Subscription;
    private paste$sub: Subscription;
    private keyup$: Observable<KeyboardEvent>;
    private resize$sub: Subscription;
    private tiles$ = new BehaviorSubject<DejaTile[]>([]);

    @ViewChild('tilesContainer') private tilesContainer: ElementRef;

    constructor(el: ElementRef, private layoutProvider: DejaTilesLayoutProvider) {
        const element = el.nativeElement as HTMLElement;

        this.selectionChanged = this.layoutProvider.selectionChanged;
        this.layoutChanged = this.layoutProvider.layoutChanged;
        this.contentAdding = this.layoutProvider.contentAdding;
        this.contentRemoving = this.layoutProvider.contentRemoving;

        this.layoutProvider.modelChanged.subscribe((event) => {
            this.modelChanged.emit(event);
        });

        this.keyup$ = Observable.fromEvent(element.ownerDocument, 'keyup');

        this.resize$sub = Observable.fromEvent(window, 'resize')
            .debounceTime(5)
            .subscribe(() => this.refresh({ resetWidth: true }));
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
    public set designMode(value: boolean | string) {
        this.layoutProvider.designMode = value != null && `${value}` !== 'false';
    };

    public get designMode() {
        return this.layoutProvider.designMode;
    };

    @Input()
    public set models(models: IDejaTile[]) {
        this._models = models || [];
        this.tiles$.next(this.layoutProvider.tiles = (this._models.map((tile) => new DejaTile(tile))));
    }

    @Input()
    public set canDelete(value: boolean) {
        if (value != null && `${value}` !== 'false' && !this.delete$sub) {
            this.delete$sub = this.keyup$
                .filter(() => this.layoutProvider.designMode)
                .filter((event: KeyboardEvent) => event.keyCode === KeyCodes.Delete)
                .subscribe(() => this.layoutProvider.deleteSelection());

        } else if (this.delete$sub) {
            this.delete$sub.unsubscribe();
            this.delete$sub = undefined;
        }
    }

    @Input()
    public set canCopy(value: boolean) {
        if (value != null && `${value}` !== 'false' && !this.copy$sub) {
            this.copy$sub = this.keyup$
                .filter((event: KeyboardEvent) => event.keyCode === KeyCodes.KeyC && event.ctrlKey)
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
        if (value != null && `${value}` !== 'false' && !this.cut$sub) {
            this.cut$sub = this.keyup$
                .filter(() => this.layoutProvider.designMode)
                .filter((event: KeyboardEvent) => event.keyCode === KeyCodes.KeyX && event.ctrlKey)
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
        if (value != null && `${value}` !== 'false' && !this.paste$sub) {
            this.paste$sub = this.keyup$
                .filter(() => this.layoutProvider.designMode)
                .filter((event: KeyboardEvent) => event.keyCode === KeyCodes.KeyV && event.ctrlKey)
                .subscribe(() => this.layoutProvider.paste());

        } else if (this.paste$sub) {
            this.paste$sub.unsubscribe();
            this.paste$sub = undefined;
        }
    }

    @Input()
    public set selectedTiles(selectedIds: string[]) {
        this.layoutProvider.selectedTiles = selectedIds;
    }

    public ngAfterViewInit() {
        this.layoutProvider.container = this.tilesContainer.nativeElement;
        this.refresh({ resetWidth: true });
    }

    public ngOnDestroy() {
        this.canCopy = false;
        this.canCut = false;
        this.canDelete = false;
        this.canPaste = false;
        this.resize$sub.unsubscribe();
    }

    public copySelection() {
        const tiles = this.layoutProvider.copySelection();
        if (tiles && tiles.length) {
            const event = new CustomEvent('DejaTilesCopied', { cancelable: true }) as IDejaTilesEvent;
            event.tiles = tiles.map((tile) => tile.toTileModel());
            this.contentCopied.emit(event);
        }
    }

    public cutSelection() {
        const tiles = this.layoutProvider.cutSelection();
        if (tiles && tiles.length) {
            const event = new CustomEvent('DejaTilesCutted', { cancelable: true }) as IDejaTilesEvent;
            event.tiles = tiles.map((tile) => tile.toTileModel());
            this.contentCopied.emit(event);
        }
    }

    public deleteSelection() {
        return this.layoutProvider.deleteSelection();
    }

    public paste() {
        return this.layoutProvider.paste();
    }

    public ensureVisible(id: string) {
        this.layoutProvider.ensureVisible$.next(id);
    }

    public expandTile(tile: IDejaTile, pixelheight: number) {
        this.layoutProvider.expandTile(tile, pixelheight);
    }

    public cancelExpand() {
        this.layoutProvider.cancelExpand();
    }

    public refresh(params?: IDejaTilesRefreshParams) {
        this.layoutProvider.refreshTiles$.next(params);
    }

    public addTiles(tiles: IDejaTile[]) {
        this.layoutProvider.addTiles(tiles.map((tile) => new DejaTile(tile)));
    }

    public removeTiles(tileIds: string[]) {
        this.layoutProvider.removeTiles(tileIds);
    }

    public addGroup(title?: string, bounds?: Rect) {
        const tile = {
            type: 'group',
            bounds: bounds || this.getFreePlace(0, 0, 15, 5),
            color: DejaTileGroupComponent.defaultColor,
            templateModel: {
                title: title || 'New Group',
            },
        } as IDejaTile;

        this.layoutProvider.createTiles([tile]);

        return tile;
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

    protected getDropContext(_dropArea: HTMLElement) {
        return {
            dragEnter: (dragContext, dragCursor) => {
                return this.layoutProvider.dragEnter(dragContext, dragCursor) && {
                    className: 'hidden', // Hide drag cusror
                } as IDropCursorInfos;
            },
            dragOver: (_dragContext, dragCursor) => {
                this.layoutProvider.dragover$.next(dragCursor);
            },
            dragLeave: (_dragContext, _dragCursor) => {
                this.layoutProvider.dragleave$.next();
            },
        } as IDejaMouseDroppableContext;
    }

    protected onTileClosed(tile: DejaTile) {
        this.layoutProvider.removeTiles([tile.id]);
    }

    protected onTileModelChanged(tile: DejaTile) {
        const event = {} as IDejaTilesModelEvent;
        event.tiles = [tile];
        this.modelChanged.emit(event);
    }

    @HostListener('mousedown', ['$event'])
    protected onMouseDown(e: DragEvent) {
        e.preventDefault();
        return false;
    }
}
