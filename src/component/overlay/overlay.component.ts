/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import {ConnectedOverlayDirective, ConnectionPositionPair, OverlayContainer, OverlayOrigin} from '@angular/cdk/overlay';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {ObservableMedia} from '@angular/flex-layout';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {DejaConnectionPositionPair} from '../../common/core/overlay/connection-position-pair';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-overlay',
    styleUrls: [
        './overlay.component.scss',
    ],
    templateUrl: './overlay.component.html',
})
export class DejaOverlayComponent implements OnInit, OnDestroy {
    /** Renvoie une valeur qui indique si le dialog est affiché. */
    private _isVisible = false;

    public get isVisible() {
        return this._isVisible;
    }
    @Input() public set isVisible(value: boolean) {
        this._isVisible = value;
        this.visibleChange.emit(this.isVisible);
    }

    @Input() public overlayBackdropClass = 'cdk-overlay-transparent-backdrop';

    /** Si pas null, sera utilisé quand isMobile est vrai. Si null et si isMobile est vrai,
     *  alors c'est la valeur 'start top start top' qui est utilisée.
     * */
    @Input() public positionsForMobile: ConnectionPositionPair[];

    private _width = null;
    private _widthForMobile = '100%';

    private _ownerElement: HTMLElement;

    /** Renvoie ou définit l'élement sur lequel le menu devra s'aligner */
    @Input() public set ownerElement(value: HTMLElement) {
        this._ownerElement = value;
        if (this._ownerElement) {
            this.overlayOrigin = new OverlayOrigin(new ElementRef((this.isMobile && document.body) || this._ownerElement || this.elementRef.nativeElement));
        }
    }

    /** Déclenché lorsque la visibilité du dialog change. */
    @Output() public visibleChange = new EventEmitter<boolean>();

    /** Déclenché lorsque l'overlay est fermé. */
    @Output() public closed = new EventEmitter<boolean>();

    /** Internal use */
    public overlayOrigin: OverlayOrigin;
    @Input() public overlayOffsetX = 0;
    @Input() public overlayOffsetY = 0;

    private contentInitialized$ = new Subject();
    private isMobile = false;
    private isAlive = true;
    /** Overlay pane containing the options. */
    @ViewChild(ConnectedOverlayDirective) private overlay: ConnectedOverlayDirective;

    constructor(private changeDetectorRef: ChangeDetectorRef, private elementRef: ElementRef, media: ObservableMedia, private overlayContainer: OverlayContainer) {
        Observable.merge(this.contentInitialized$, media.asObservable())
            .takeWhile(() => this.isAlive)
            .subscribe(() => {
                this.isMobile = media.isActive('xs') || media.isActive('sm');
                this.changeDetectorRef.markForCheck();
            });
    }

    private _positions = DejaConnectionPositionPair.default;

    public get positions() {
        if (!this.isMobile) {
            return this._positions;
        } else if (this.positionsForMobile) {
            return this.positionsForMobile;
        } else {
            return DejaConnectionPositionPair.parse('start top start top');
        }
    }

    @Input()
    public set positions(value: DejaConnectionPositionPair[] | string) {
        this._positions = typeof value === 'string' ? DejaConnectionPositionPair.parse(value) : value;
    }

    public get width() {
       return this._width;
    }

    @Input()
    /**
     * définit la largeur de l'overlay.
     */
    public set width(width: string) {
        this._width = width;
    }

    public get widthForMobile() {
        return this._widthForMobile;
    }

    @Input()
    /**
     * définit la largeur de l'overlay quand isMobile est true. '100%' par défaut.
     */
    public set widthForMobile(widthForMobile: string) {
        this._widthForMobile = widthForMobile;
    }

    public get overlayWidth() {
        if (!this.isMobile) {
            return this._width;
        } else {
            return this._widthForMobile;
        }
    }

    public ngOnDestroy() {
        this.isAlive = false;
    }

    public ngOnInit() {
        this.contentInitialized$.next();
    }

    public updatePosition() {
        if (this.overlay && this.overlay.overlayRef) {
            this.overlay.overlayRef.updatePosition();
        }
    }

    /** Affiche le dialog. */
    public show(eventOrOffsetX: MouseEvent | number, offsetY?: number) {
        this.overlayContainer.getContainerElement().classList.add('deja-overlay-container');
        this.overlayOffsetX = offsetY !== undefined ? +eventOrOffsetX : 0;
        this.overlayOffsetY = offsetY || 0;
        const e = eventOrOffsetX as MouseEvent;
        const target = e && e.target;
        this.overlayOrigin = new OverlayOrigin(new ElementRef((this.isMobile && document.body) || target || this.ownerElement || this.elementRef.nativeElement));
        this.isVisible = true;
        this.changeDetectorRef.markForCheck();
        Observable.timer(1)
            .first()
            .subscribe(() => {
                this.updatePosition();
            });
    }

    /** Ferme le dialog. */
    public close() {
        this.isVisible = false;
        this.closed.emit(true);
        this.changeDetectorRef.markForCheck();
    }
}
