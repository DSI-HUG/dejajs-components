/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { CdkConnectedOverlay, CdkOverlayOrigin, OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { DejaConnectionPositionPair, Destroy, MediaService } from '@deja-js/component/core';
import { take, takeUntil, takeWhile, timer } from 'rxjs';

// providers: [ MediaService ],
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-overlay',
    styleUrls: ['./overlay.component.scss'],
    templateUrl: './overlay.component.html'
})
export class DejaOverlayComponent extends Destroy {
    @Input() public overlayBackdropClass = 'cdk-overlay-transparent-backdrop';

    @Input() public overlayContainerClass?: string;

    /** Déclenché lorsque la visibilité du dialog change. */
    @Output() public readonly visibleChange = new EventEmitter<boolean>();

    /** Déclenché lorsque l'overlay est fermé. */
    @Output() public readonly closed = new EventEmitter<boolean>();

    /** Internal use */
    @Input() public overlayOffsetX = 0;
    @Input() public overlayOffsetY = 0;

    /** Overlay pane containing the options. */
    @ViewChild(CdkConnectedOverlay, { static: true }) private overlay?: CdkConnectedOverlay;

    public overlayOrigin?: CdkOverlayOrigin;

    /** Renvoie une valeur qui indique si le dialog est affiché. */
    private _isVisible = false;

    public get isVisible(): BooleanInput {
        return this._isVisible;
    }

    @Input() public set isVisible(value: BooleanInput) {
        const isVisible = coerceBooleanProperty(value);
        if (this._isVisible !== isVisible) {
            this._isVisible = isVisible;

            const containerElement = this.overlayContainer.getContainerElement();
            containerElement.className = Array.from(containerElement.classList)
                .filter(token => token.startsWith('cdk'))
                .join(' ');

            containerElement.classList.add('deja-overlay-container');
            if (this.isVisible && this.overlayContainerClass) {
                this.overlayContainerClass.split(' ').forEach(className => {
                    containerElement.classList.add(className);
                });
            }

            this.changeDetectorRef.markForCheck();
            this.visibleChange.emit(this._isVisible);
        }
    }

    private _hasBackdrop = true;
    private _width?: number | undefined;
    private _widthForMobile = '100%';
    private _ownerElement?: HTMLElement;

    @Input() public set hasBackdrop(value: BooleanInput) {
        this._hasBackdrop = coerceBooleanProperty(value);
    }

    public get hasBackdrop(): BooleanInput {
        return this._hasBackdrop;
    }

    /** Renvoie ou définit l'élement sur lequel le menu devra s'aligner */
    @Input() public set ownerElement(value: HTMLElement) {
        this._ownerElement = value;
        this.updateOriginOverlay();
    }

    private _positions = DejaConnectionPositionPair.default;
    private _positionsForMobile?: DejaConnectionPositionPair[];

    private _isMobile = false;
    private disableMediaService = false;

    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private changeDetectorRef = inject(ChangeDetectorRef);
    private overlayContainer = inject(OverlayContainer);
    private mediaService = inject(MediaService);

    public constructor() {
        super();

        const containerElement = this.overlayContainer.getContainerElement();
        containerElement.addEventListener('contextmenu', (event: Event) => {
            event.preventDefault();
            return false;
        });

        this.mediaService.isMobile$.pipe(
            takeWhile(() => !this.disableMediaService),
            takeUntil(this.destroyed$)
        ).subscribe(value => {
            this._isMobile = value;
            this.updateOriginOverlay();
            this.changeDetectorRef.markForCheck();
        });
    }

    public get positionPairs(): DejaConnectionPositionPair[] {
        return this.positions as DejaConnectionPositionPair[];
    }

    public get positions(): string | DejaConnectionPositionPair[] {
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

    public get isMobile(): BooleanInput {
        return this._isMobile;
    }

    @Input()
    public set isMobile(value: BooleanInput) {
        this._isMobile = coerceBooleanProperty(value);
        this.updateOriginOverlay();
        this.disableMediaService = true;
    }

    public get width(): NumberInput {
        return this._width;
    }

    @Input()
    /**
     * définit la largeur de l'overlay.
     */
    public set width(width: NumberInput) {
        this._width = coerceNumberProperty(width);
    }

    public get widthForMobile(): string {
        return this._widthForMobile;
    }

    @Input()
    /**
     * définit la largeur de l'overlay quand isMobile est true. '100%' par défaut.
     */
    public set widthForMobile(widthForMobile: string) {
        this._widthForMobile = widthForMobile;
    }

    public get overlayWidth(): NumberInput {
        if (!this.isMobile) {
            return this._width;
        } else {
            return this._widthForMobile;
        }
    }

    public updatePosition(): void {
        this.overlay?.overlayRef?.updatePosition();
    }

    /** Affiche le dialog. */
    public show(eventOrOffsetX: MouseEvent | number, offsetY?: number): void {
        this.overlayOffsetX = offsetY !== undefined ? +eventOrOffsetX : 0;
        this.overlayOffsetY = offsetY || 0;
        const e = eventOrOffsetX as MouseEvent;
        const target = e?.target;
        this.overlayOrigin = new CdkOverlayOrigin(new ElementRef((this.isMobile && document.body) || target || this.ownerElement || this.elementRef.nativeElement));
        this.isVisible = true;
        this.changeDetectorRef.markForCheck();
        timer(1).pipe(
            take(1),
            takeUntil(this.destroyed$)
        ).subscribe(() => this.updatePosition());
    }

    /** Ferme le dialog. */
    public close(): void {
        this.isVisible = false;
        this.closed.emit(true);
        this.changeDetectorRef.markForCheck();
    }

    private updateOriginOverlay(): void {
        this.overlayOrigin = new CdkOverlayOrigin(new ElementRef((this.isMobile && document.body) || this._ownerElement || this.elementRef.nativeElement));
    }
}
