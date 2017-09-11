/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ConnectionPositionPair, OriginConnectionPosition, OverlayConnectionPosition, OverlayOrigin } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

/** Menu avec placement optimisé (Voir DejaDropDownComponent) */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-menu',
    styleUrls: [
        './menu.component.scss',
    ],
    templateUrl: './menu.component.html',
})
export class DejaMenuComponent implements OnInit, OnDestroy {
    /** Renvoie une valeur qui indique si le menu est affiché. */
    @Input() public isVisible = false;
    /** Renvoie ou définit l'élement sur lequel le menu devra s'aligner */
    @Input() public ownerElement: HTMLElement;

    @Output()
    public visibleChange = new EventEmitter<boolean>();
    public overlayOrigin: OverlayOrigin;

    protected isMobile = false;

    private contentInitialized$ = new Subject();
    private media$sub: Subscription;

    /**
     * This position config ensures that the top "start" corner of the overlay
     * is aligned with with the top "start" of the origin by default (overlapping
     * the trigger completely). If the panel cannot fit below the trigger, it
     * will fall back to a position above the trigger.
     */
    private _positions = [
        {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
        },
        {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom',
        },
        {
            originX: 'start',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'bottom',
        },
    ] as ConnectionPositionPair[];

    @Input()
    public set positions(value: ConnectionPositionPair[] | string) {
        if (typeof value === 'string') {
            const values = value.split(',');
            this._positions = [];
            values.forEach(pos => {
                const poss = pos.split(' ');
                if (poss.length !== 4) {
                    throw new Error(`Invalid positions property for DejaMenuComponent. String entry must be of type 'positions="start top end bottom"'`);
                }

                const originPosition = {
                    originX: poss[0],
                    originY: poss[1],
                } as OriginConnectionPosition;

                const overlayPosition = {
                    overlayX: poss[2],
                    overlayY: poss[3],
                } as OverlayConnectionPosition;

                this._positions.push(new ConnectionPositionPair(originPosition, overlayPosition));
            });
        } else {
            this._positions = value;
        }
    }

    public get positions() {
        if (!this.isMobile) {
            return this._positions;
        }

        const originPosition = {
            originX: 'start',
            originY: 'top',
        } as OriginConnectionPosition;

        const overlayPosition = {
            overlayX: 'start',
            overlayY: 'top',
        } as OverlayConnectionPosition;

        return [new ConnectionPositionPair(originPosition, overlayPosition)];
    }

    public get width() {
        return !this.isMobile ? null : '100%';
    }

    constructor(private changeDetectorRef: ChangeDetectorRef, private elementRef: ElementRef, media: ObservableMedia) {
        this.media$sub = Observable.merge(this.contentInitialized$, media.asObservable())
            .subscribe(() => {
                this.isMobile = media.isActive('xs') || media.isActive('sm');
                this.changeDetectorRef.markForCheck();
            });
    }

    public ngOnDestroy() {
        if (this.media$sub) {
            this.media$sub.unsubscribe();
        }
    }

    public ngOnInit() {
        this.contentInitialized$.next();
    }

    /** Affiche le menu. */
    public show(event: MouseEvent) {
        this.overlayOrigin = new OverlayOrigin(new ElementRef(this.ownerElement || (this.isMobile && document.body) || (event && event.target) || this.elementRef.nativeElement));
        this.isVisible = true;
        this.visibleChange.emit(this.isVisible);
        this.changeDetectorRef.markForCheck();
    }

    /** Ferme le menu. */
    public close() {
        this.isVisible = false;
        this.visibleChange.emit(this.isVisible);
        this.changeDetectorRef.markForCheck();
    }
}
