/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { DejaConnectionPositionPair, Destroy } from '@deja-js/component/core';
import { Position, Rect } from '@deja-js/component/core/graphics';
import { debounceTime, delay, filter, from, fromEvent, map, Observable, takeUntil, tap } from 'rxjs';

import { DejaTooltipService } from './tooltip.service';
import { ITooltipParams } from './tooltip-params.interface';

/**
 * Customizable tooltip component for Angular
 */
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: [
        './tooltip.component.scss'
    ]
})
export class DejaTooltipComponent extends Destroy implements OnInit {
    /** Tooltip name. Mandatory, and need to be unic */
    @Input() public name: string;
    /** Event Emmited when hide action is called */
    @Output() public readonly hide = new EventEmitter();

    /** Template for tooltip content */
    @ContentChild('tooltipTemplate')
    public tooltipTemplate: TemplateRef<unknown>;

    /** Parameters of the tooltip */
    public params: ITooltipParams;
    public overlayVisible = false;
    public ownerElement: HTMLElement;

    /**
     * This position config ensures that the top "start" corner of the overlay
     * is aligned with with the top "start" of the origin by default (overlapping
     * the trigger completely). If the panel cannot fit below the trigger, it
     * will fall back to a position above the trigger.
     */
    private _positions = [
        {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'top'
        },
        {
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
            overlayY: 'bottom'
        },
        {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top'
        },
        {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom'
        },
        {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top'
        },
        {
            originX: 'end',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'bottom'
        }
    ] as DejaConnectionPositionPair[];

    private _model: unknown;
    private _closeOnMoveOver = false;

    @Input()
    public set closeOnMoveOver(value: boolean) {
        this._closeOnMoveOver = coerceBooleanProperty(value);
    }

    public get closeOnMoveOver(): boolean {
        return this._closeOnMoveOver;
    }

    @Input()
    public set positions(value: DejaConnectionPositionPair[] | string) {
        this._positions = typeof value === 'string' ? DejaConnectionPositionPair.parse(value) : value;
    }

    public get positions(): string | DejaConnectionPositionPair[] {
        return this._positions;
    }

    public get model(): unknown {
        return this._model;
    }

    /**
     * Constructor
     * Subscribe to mouseover to know when tooltip must disappear.
     */
    public constructor(elementRef: ElementRef, private tooltipService: DejaTooltipService) {
        super();

        const element = elementRef.nativeElement as HTMLElement;

        const hide$ = from(this.hide).pipe(
            tap(() => {
                this._model = undefined;
            })
        );

        fromEvent<MouseEvent>(element.ownerDocument, 'mousemove').pipe(
            // eslint-disable-next-line rxjs/no-unsafe-takeuntil
            takeUntil(hide$),
            debounceTime(100),
            map(event => new Position(event.pageX, event.pageY)),
            filter(position => {
                if (this._closeOnMoveOver) {
                    return true;
                }
                const containerElement = document.elementFromPoint(position.left, position.top);
                let parentElement = containerElement;
                // eslint-disable-next-line no-loops/no-loops
                while (parentElement) {
                    if (parentElement.className === 'cdk-overlay-pane') {
                        return false;
                    }
                    parentElement = parentElement.parentElement;
                }
                return true;
            }),
            filter(position => {
                if (this._closeOnMoveOver) {
                    return true;
                }
                const ownerElement = (this.params.ownerElement as ElementRef<HTMLElement>).nativeElement || this.params.ownerElement as HTMLElement;
                const ownerRect = new Rect(ownerElement.getBoundingClientRect());
                return !ownerRect.containsPoint(position);
            }),
            delay(300),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            this.hide.emit();
            this.overlayVisible = false;
        });
    }

    /**
     * Init tooltip configuration
     * Check if ng-template model passed through param is an observable or a promise and resolve it before set.
     */
    public ngOnInit(): void {
        if (!this.name) {
            throw (new Error('Name is required'));
        }
        this.params = this.tooltipService.params[this.name];
        this.ownerElement = (this.params.ownerElement as ElementRef<HTMLElement>).nativeElement || this.params.ownerElement as HTMLElement;

        const model$ = this.params.model as Observable<unknown>;
        if (!model$) {
            this._model = undefined;
            this.overlayVisible = true;
        } else if (model$.subscribe) {
            model$.pipe(
                takeUntil(this.destroyed$)
            ).subscribe(model => {
                this._model = model;
                this.overlayVisible = true;
            }, () => {
                this.hide.emit();
                this.overlayVisible = false;
            });
        } else {
            const promise = this.params.model as Promise<unknown>;
            if (promise.then) {
                promise
                    .then(model => {
                        this._model = model;
                        this.overlayVisible = true;
                    })
                    .catch(() => {
                        this.hide.emit();
                        this.overlayVisible = false;
                    });
            } else {
                this._model = this.params.model;
                this.overlayVisible = true;
            }
        }
    }
}
