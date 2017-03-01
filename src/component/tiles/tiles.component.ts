/*
 * *
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 * /
 *
 */

import { AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { coerceBooleanProperty } from '@angular/material/core/coercion/boolean-property';
import { Observable, BehaviorSubject, Subscription } from 'rxjs/Rx';
import { Rect } from '../../common/core/graphics';
import { KeyCodes } from '../../common/core';
import { DejaTile, IDejaTilesEvent, IDejaTile, IDejaTilesRemoveEvent, IDejaTilesAddEvent } from './index';
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
     * Raised when the data model has changed with a cut, delete or paste
     */
    @Output() public modelChanged = new EventEmitter<IDejaTilesEvent>();

    /**
     * Raised when some tiles was added to the data model with a paste
     */
    @Output() public contentAdded = new EventEmitter<IDejaTilesAddEvent>();

    /**
     * Raised when some tiles was removed from the data model with a delete
     */
    @Output() public contentRemoved = new EventEmitter<IDejaTilesRemoveEvent>();

    @ContentChild('tileTemplate') protected tileTemplate;

    private _models = [] as IDejaTile[];
    private _designMode = false;
    private deleteSubscriber: Subscription;
    private copySubscriber: Subscription;
    private cutSubscriber: Subscription;
    private pasteSubscriber: Subscription;
    private keyup$: Observable<KeyboardEvent>;
    private tiles$ = new BehaviorSubject<DejaTile[]>([]);
    @ViewChild('tilesContainer') private tilesContainer: ElementRef;

    constructor(el: ElementRef, private layoutProvider: DejaTilesLayoutProvider) {
        const element = this.layoutProvider.container = el.nativeElement as HTMLElement;

        this.layoutProvider.selectionChanges$.subscribe((tiles) => {
            const event = {} as IDejaTilesEvent;
            event.tiles = tiles;
            this.selectionChanged.emit(event);
        });

        this.layoutProvider.layoutChange$.subscribe((event) => {
            this.layoutChanged.emit(event);
        });

        this.layoutProvider.contentAdded$.subscribe((event) => {
            this.contentAdded.emit(event);
            this.tiles$.next(this.layoutProvider.tiles);
        });

        this.layoutProvider.contentRemoved$.subscribe((event) => this.contentRemoved.emit(event));

        this.keyup$ = Observable.fromEvent(element.ownerDocument, 'keyup');
    }

    @Input()
    public contentAdding$(value: Observable<IDejaTilesAddEvent>) {
        this.layoutProvider.contentAdding$ = value;
    }

    @Input()
    public contentRemoving$(value: Observable<IDejaTilesRemoveEvent>) {
        this.layoutProvider.contentRemoving$ = value;
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
    public set designMode(value: boolean) {
        this._designMode = value;
        this.layoutProvider.designMode$.next(coerceBooleanProperty(value));
    };

    @Input()
    public set models(models: IDejaTile[]) {
        this._models = models || [];
        this.tiles$.next(this.layoutProvider.tiles = (models && models.map((tile) => new DejaTile(tile))) || []);
    }

    public get models() {
        return this._models;
    }

    @Input()
    public set canDelete(value: boolean) {
        if (coerceBooleanProperty(value)) {
            this.deleteSubscriber = this.keyup$.filter((event: KeyboardEvent) => event.keyCode === KeyCodes.Delete).filter(() => this._designMode).subscribe(() => this.layoutProvider.deleteSelection$.next());

        } else if (this.deleteSubscriber) {
            this.deleteSubscriber.unsubscribe();
            this.deleteSubscriber = undefined;
        }
    }

    @Input()
    public set canCopy(value: boolean) {
        if (coerceBooleanProperty(value)) {
            this.copySubscriber = this.keyup$.filter((event: KeyboardEvent) => event.keyCode === KeyCodes.KeyC && event.ctrlKey).subscribe(() => this.layoutProvider.copySelection$.next());

        } else if (this.copySubscriber) {
            this.copySubscriber.unsubscribe();
            this.copySubscriber = undefined;
        }
    }

    @Input()
    public set canCut(value: boolean) {
        if (coerceBooleanProperty(value)) {
            this.cutSubscriber = this.keyup$.filter((event: KeyboardEvent) => event.keyCode === KeyCodes.KeyX && event.ctrlKey).filter(() => this._designMode).subscribe(() => this.layoutProvider.cutSelection$.next());

        } else if (this.cutSubscriber) {
            this.cutSubscriber.unsubscribe();
            this.cutSubscriber = undefined;
        }
    }

    @Input()
    public set canPaste(value: boolean) {
        if (coerceBooleanProperty(value)) {
            this.pasteSubscriber = this.keyup$.filter((event: KeyboardEvent) => event.keyCode === KeyCodes.KeyV && event.ctrlKey).filter(() => this._designMode).subscribe(() => this.layoutProvider.paste$.next());

        } else if (this.pasteSubscriber) {
            this.pasteSubscriber.unsubscribe();
            this.pasteSubscriber = undefined;
        }
    }

    @Input()
    public set selectedTiles(selectedTiles: IDejaTile[]) {
        this.layoutProvider.selectionChanges$.next(selectedTiles);
    }

    public ngAfterViewInit() {
        Observable.fromEvent(window, 'resize').subscribe(() => { this.refresh(); });
    }

    public ngOnDestroy() {
        if (this.deleteSubscriber) {
            this.deleteSubscriber.unsubscribe();
        }
        if (this.copySubscriber) {
            this.copySubscriber.unsubscribe();
        }
        if (this.cutSubscriber) {
            this.cutSubscriber.unsubscribe();
        }
        if (this.pasteSubscriber) {
            this.pasteSubscriber.unsubscribe();
        }
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

    public addGroup(title?: string, bounds?: Rect) {
        if (!this._designMode) {
            return;
        }

        this.layoutProvider.createTiles$.next([new DejaTile({
            type: 'group',
            bounds: bounds || this.getFreePlace(0, 0, 15, 15),
            templateModel: {
                title: title || 'New Group',
            },
        } as IDejaTile)]);
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

    protected cancelDragEvent() {
        // Disallow HTML drag and drop
        return false;
    }

    protected onModelChange(tiles: IDejaTile[]) {
        const event = {} as IDejaTilesEvent;
        event.tiles = tiles;
        this.modelChanged.emit(event);
    }
}
