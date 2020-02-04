/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkConnectedOverlay, CdkOverlayOrigin, OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { DejaConnectionPositionPair, MediaService } from '@deja-js/core';
import { timer } from 'rxjs';
import { first, takeWhile } from 'rxjs/operators';

// providers: [ MediaService ],
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-overlay',
    styleUrls: ['./overlay.component.scss'],
    templateUrl: './overlay.component.html',
})
export class DejaOverlayComponent implements OnDestroy {
    /** Renvoie une valeur qui indique si le dialog est affiché. */
    private _isVisible = false;

    public get isVisible() {
        return this._isVisible;
    }
    @Input() public set isVisible(value: boolean) {
        const isVisible = coerceBooleanProperty(value);
        if (this._isVisible !== isVisible) {
            this._isVisible = isVisible;

            const containerElement = this.overlayContainer.getContainerElement();
            const tokenToRemove = new Array<string>();
            containerElement.classList.forEach(token => {
                if (!token.startsWith('cdk')) {
                    tokenToRemove.push(token);
                }
            });

            if (tokenToRemove.length) {
                containerElement.classList.remove(...tokenToRemove);
            }

            containerElement.classList.add('deja-overlay-container');
            if (this.overlayContainerClass) {
                containerElement.classList.add(this.overlayContainerClass);
            }

            this.changeDetectorRef.markForCheck();
            this.visibleChange.emit(this.isVisible);
        }
    }

    @Input() public overlayBackdropClass = 'cdk-overlay-transparent-backdrop';

    @Input() public overlayContainerClass: string;

    private _hasBackdrop = true;
    private _width: string = null;
    private _widthForMobile = '100%';
    private _ownerElement: HTMLElement;

    @Input() public set hasBackdrop(value: boolean) {
        this._hasBackdrop = coerceBooleanProperty(value);
    }

    public get hasBackdrop() {
        return this._hasBackdrop;
    }

    /** Renvoie ou définit l'élement sur lequel le menu devra s'aligner */
    @Input() public set ownerElement(value: HTMLElement) {
        this._ownerElement = value;
        this.updateOriginOverlay();
    }

    /** Déclenché lorsque la visibilité du dialog change. */
    @Output() public visibleChange = new EventEmitter<boolean>();

    /** Déclenché lorsque l'overlay est fermé. */
    @Output() public closed = new EventEmitter<boolean>();

    /** Internal use */
    public overlayOrigin: CdkOverlayOrigin;
    @Input() public overlayOffsetX = 0;
    @Input() public overlayOffsetY = 0;

    private _positions = DejaConnectionPositionPair.default;
    private _positionsForMobile: DejaConnectionPositionPair[];

    private _isMobile = false;
    private isAlive = true;
    private disableMediaService = false;

    /** Overlay pane containing the options. */
    @ViewChild(CdkConnectedOverlay, { static: true }) private overlay: CdkConnectedOverlay;

    constructor(private changeDetectorRef: ChangeDetectorRef, private elementRef: ElementRef, private overlayContainer: OverlayContainer, mediaService: MediaService) {
        const containerElement = this.overlayContainer.getContainerElement();
        containerElement.addEventListener('contextmenu', (event: Event) => {
            event.preventDefault();
            return false;
        });

        mediaService.isMobile$.pipe(
            takeWhile(() => this.isAlive && !this.disableMediaService))
            .subscribe((value) => {
                this._isMobile = value;
                this.updateOriginOverlay();
                this.changeDetectorRef.markForCheck();
            });
    }

    public get positions() {
        if (!this.isMobile) {
            return this._positions;
        } else if (this._positionsForMobile) {
            return this._positionsForMobile;
        } else {
            return DejaConnectionPositionPair.parse('start top start top');
        }
    }

    @Input()
    public set positions(value: DejaConnectionPositionPair[] | string) {
        this._positions = typeof value === 'string' ? DejaConnectionPositionPair.parse(value) : value;
    }

    /** Si pas null, sera utilisé quand isMobile est vrai. Si null et si isMobile est vrai,
     *  alors c'est la valeur 'start top start top' qui est utilisée.
     * */
    @Input()
    public set positionsForMobile(value: DejaConnectionPositionPair[] | string) {
        this._positionsForMobile = typeof value === 'string' ? DejaConnectionPositionPair.parse(value) : value;
    }

    public get isMobile() {
        return this._isMobile;
    }

    @Input()
    public set isMobile(value: boolean) {
        this._isMobile = coerceBooleanProperty(value);
        this.updateOriginOverlay();
        this.disableMediaService = true;
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

    public updatePosition() {
        if (this.overlay && this.overlay.overlayRef) {
            this.overlay.overlayRef.updatePosition();
        }
    }

    /** Affiche le dialog. */
    public show(eventOrOffsetX: MouseEvent | number, offsetY?: number) {
        this.overlayOffsetX = offsetY !== undefined ? +eventOrOffsetX : 0;
        this.overlayOffsetY = offsetY || 0;
        const e = eventOrOffsetX as MouseEvent;
        const target = e && e.target;
        this.overlayOrigin = new CdkOverlayOrigin(new ElementRef((this.isMobile && document.body) || target || this.ownerElement || this.elementRef.nativeElement));
        this.isVisible = true;
        this.changeDetectorRef.markForCheck();
        timer(1).pipe(
            first())
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

    private updateOriginOverlay() {
        this.overlayOrigin = new CdkOverlayOrigin(new ElementRef((this.isMobile && document.body) || this._ownerElement || this.elementRef.nativeElement));
    }
}
