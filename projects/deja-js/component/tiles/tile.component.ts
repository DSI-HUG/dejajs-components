/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { BooleanInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, TemplateRef } from '@angular/core';
import { Destroy } from '@deja-js/component/core';
import { debounceTime, delay, filter, take, takeUntil, tap } from 'rxjs';

import { DejaTile } from './tile.class';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-tile',
    styleUrls: [
        './tile.component.scss'
    ],
    templateUrl: './tile.component.html'
})
export class DejaTileComponent extends Destroy {
    @Input() public template: TemplateRef<unknown>;
    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() public readonly close = new EventEmitter<Event>();

    public progressDiameter = 100;

    private element: HTMLElement;
    private _tile: DejaTile;

    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private changeDetectorRef = inject(ChangeDetectorRef);

    public constructor() {
        super();
        this.element = this.elementRef.nativeElement;
        this.element.setAttribute('hidden', '0');
    }

    @Input()
    public set tile(tile: DejaTile) {
        this._tile = tile;

        if (tile) {
            const toggleAttribute = (attribute: string, value: BooleanInput): void => {
                if (value) {
                    this.element.setAttribute(attribute, value.toString());
                } else {
                    this.element.removeAttribute(attribute);
                }
            };

            if (tile.fading) {
                this.element.setAttribute('fading', '0');
                this.changeDetectorRef.markForCheck();
            }

            tile.pixelBounds$.pipe(
                filter(bounds => !!bounds),
                take(1),
                filter(() => tile.fading),
                tap(() => {
                    this.element.setAttribute('fading', '1');
                    this.changeDetectorRef.markForCheck();
                }),
                delay(200),
                takeUntil(this.destroyed$)
            ).subscribe(() => {
                this.element.removeAttribute('fading');
                this.changeDetectorRef.markForCheck();
            });

            tile.pixelBounds$.pipe(
                filter(bounds => !!bounds),
                takeUntil(this.destroyed$)
            ).subscribe(bounds => {
                if (!tile.isHidden) {
                    this.element.removeAttribute('hidden');
                }
                this.element.style.left = `${bounds.left}px`;
                this.element.style.top = `${bounds.top}px`;
                this.element.style.width = `${bounds.width}px`;
                this.element.style.height = `${bounds.height}px`;
                this.progressDiameter = Math.min(100, Math.round(Math.max(bounds.width * 0.4, bounds.height * 0.4)));
                this.changeDetectorRef.markForCheck();
            });

            tile.pressed$.pipe(
                tap(value => toggleAttribute('pressed', value)),
                takeUntil(this.destroyed$)
            ).subscribe(() => this.changeDetectorRef.markForCheck());

            tile.selected$.pipe(
                tap(value => toggleAttribute('selected', value)),
                takeUntil(this.destroyed$)
            ).subscribe(() => this.changeDetectorRef.markForCheck());

            tile.dragging$.pipe(
                tap(value => toggleAttribute('drag', value)),
                takeUntil(this.destroyed$)
            ).subscribe(() => this.changeDetectorRef.markForCheck());

            tile.dropping$.pipe(
                tap(value => toggleAttribute('drop', value)),
                takeUntil(this.destroyed$)
            ).subscribe(() => this.changeDetectorRef.markForCheck());

            tile.cutted$.pipe(
                tap(value => toggleAttribute('cutted', value)),
                takeUntil(this.destroyed$)
            ).subscribe(() => this.changeDetectorRef.markForCheck());

            tile.deleted$.pipe(
                tap(() => this.element.remove()),
                takeUntil(this.destroyed$)
            ).subscribe(() => this.changeDetectorRef.markForCheck());

            const toggleHide$ = tile.hidden$.pipe(
                tap(value => toggleAttribute('hidden', value ? '1' : '2')));

            // Hide
            toggleHide$.pipe(
                debounceTime(1000),
                filter(value => value),
                tap(() => this.element.setAttribute('hidden', '0')),
                takeUntil(this.destroyed$)
            ).subscribe(() => this.changeDetectorRef.markForCheck());

            // Show
            toggleHide$.pipe(
                debounceTime(1),
                filter(value => !value),
                tap(() => this.element.removeAttribute('hidden')),
                takeUntil(this.destroyed$)
            ).subscribe(() => this.changeDetectorRef.markForCheck());

            // Refresh
            tile.refresh$.pipe(
                debounceTime(1),
                takeUntil(this.destroyed$)
            ).subscribe(() => this.changeDetectorRef.markForCheck());
        }
    }

    public get tile(): DejaTile {
        return this._tile;
    }
}
