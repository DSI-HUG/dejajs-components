/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import {ConnectedOverlayDirective, OverlayContainer, OverlayOrigin} from '@angular/cdk/overlay';
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
    @Input() public isVisible = false;

    @Input() public overlayBackdropClass = 'cdk-overlay-transparent-backdrop';

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
        return !this.isMobile ? this._positions : DejaConnectionPositionPair.parse('start top start top');
    }

    @Input()
    public set positions(value: DejaConnectionPositionPair[] | string) {
        this._positions = typeof value === 'string' ? DejaConnectionPositionPair.parse(value) : value;
    }

    public get width() {
        return !this.isMobile ? null : '100%';
    }

    public ngOnDestroy() {
        this.isAlive = false;
    }

    public ngOnInit() {
        this.contentInitialized$.next();
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
        this.visibleChange.emit(this.isVisible);
        this.changeDetectorRef.markForCheck();
        Observable.timer(1)
            .first()
            .subscribe(() => {
                this.overlay.overlayRef.updatePosition();
            });
    }

    /** Ferme le dialog. */
    public close() {
        this.isVisible = false;
        this.visibleChange.emit(this.isVisible);
        this.changeDetectorRef.markForCheck();
    }
}
