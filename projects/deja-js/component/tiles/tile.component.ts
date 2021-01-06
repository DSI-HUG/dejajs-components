/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { Destroy } from '@deja-js/component/core';
import { from } from 'rxjs';
import { debounceTime, delay, filter, take, takeUntil, tap } from 'rxjs/operators';

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
    private _designMode: boolean;

    @Input()
    public set designMode(value: BooleanInput) {
        this._designMode = coerceBooleanProperty(value);
    }

    public get designMode(): BooleanInput {
        return this._designMode;
    }

    public constructor(el: ElementRef, private changeDetectorRef: ChangeDetectorRef) {
        super();
        this.element = el.nativeElement as HTMLElement;
        this.element.setAttribute('hidden', '0');
    }

    @Input()
    public set tile(tile: DejaTile) {
        this._tile = tile;

        if (tile) {
            const toogleAttribute = (attribute: string, value: BooleanInput) => {
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

            from(tile.pixelBounds$).pipe(
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

            from(tile.pixelBounds$).pipe(
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

            from(tile.pressed$).pipe(
                tap(value => toogleAttribute('pressed', value)),
                takeUntil(this.destroyed$)
            ).subscribe(() => this.changeDetectorRef.markForCheck());

            from(tile.selected$).pipe(
                tap(value => toogleAttribute('selected', value)),
                takeUntil(this.destroyed$)
            ).subscribe(() => this.changeDetectorRef.markForCheck());

            from(tile.dragging$).pipe(
                tap(value => toogleAttribute('drag', value)),
                takeUntil(this.destroyed$)
            ).subscribe(() => this.changeDetectorRef.markForCheck());

            from(tile.dropping$).pipe(
                tap(value => toogleAttribute('drop', value)),
                takeUntil(this.destroyed$)
            ).subscribe(() => this.changeDetectorRef.markForCheck());

            from(tile.cutted$).pipe(
                tap(value => toogleAttribute('cutted', value)),
                takeUntil(this.destroyed$)
            ).subscribe(() => this.changeDetectorRef.markForCheck());

            from(tile.deleted$).pipe(
                tap(() => this.element.remove()),
                takeUntil(this.destroyed$)
            ).subscribe(() => this.changeDetectorRef.markForCheck());

            const tooogleHide$ = from(tile.hidden$).pipe(
                tap(value => toogleAttribute('hidden', value ? '1' : '2')));

            // Hide
            tooogleHide$.pipe(
                debounceTime(1000),
                filter(value => value),
                tap(() => this.element.setAttribute('hidden', '0')),
                takeUntil(this.destroyed$)
            ).subscribe(() => this.changeDetectorRef.markForCheck());

            // Show
            tooogleHide$.pipe(
                debounceTime(1),
                filter(value => !value),
                tap(() => this.element.removeAttribute('hidden')),
                takeUntil(this.destroyed$)
            ).subscribe(() => this.changeDetectorRef.markForCheck());

            // Refresh
            from(tile.refresh$).pipe(
                debounceTime(1),
                takeUntil(this.destroyed$)
            ).subscribe(() => this.changeDetectorRef.markForCheck());
        }
    }

    public get tile(): DejaTile {
        return this._tile;
    }
}
