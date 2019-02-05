/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { from as observableFrom, Subscription } from 'rxjs';
import { debounceTime, delay, filter, first, tap } from 'rxjs/operators';
import { DejaTile } from './tile.class';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-tile',
    styleUrls: [
        './tile.component.scss',
    ],
    templateUrl: './tile.component.html',
})
export class DejaTileComponent implements OnDestroy {
    @Input() public template: any;
    @Input() public designMode: boolean;
    @Output() public modelChanged = new EventEmitter();
    @Output() public close = new EventEmitter<Event>();

    public progressDiameter = 100;

    private element: HTMLElement;
    private _tile: DejaTile;
    private subscriptions = [] as Subscription[];

    constructor(el: ElementRef, private changeDetectorRef: ChangeDetectorRef) {
        this.element = el.nativeElement as HTMLElement;
        this.element.setAttribute('hidden', '0');
    }

    @Input()
    public set tile(tile: DejaTile) {
        this._tile = tile;

        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
        this.subscriptions = [];

        if (tile) {
            const toogleAttribute = (attribute: string, value: string | boolean) => {
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

            this.subscriptions.push(observableFrom(tile.pixelBounds$).pipe(
                filter((bounds) => !!bounds),
                first(),
                filter(() => tile.fading),
                tap(() => {
                    this.element.setAttribute('fading', '1');
                    this.changeDetectorRef.markForCheck();
                }),
                delay(200))
                .subscribe(() => {
                    this.element.removeAttribute('fading');
                    this.changeDetectorRef.markForCheck();
                }));

            this.subscriptions.push(observableFrom(tile.pixelBounds$).pipe(
                filter((bounds) => !!bounds))
                .subscribe((bounds) => {
                    if (!tile.isHidden) {
                        this.element.removeAttribute('hidden');
                    }
                    this.element.style.left = `${bounds.left + 4}px`;
                    this.element.style.top = `${bounds.top + 4}px`;
                    this.element.style.width = `${bounds.width - 8}px`;
                    this.element.style.height = `${bounds.height - 8}px`;
                    this.progressDiameter = Math.min(100, Math.round(Math.max(bounds.width * 0.4, bounds.height * 0.4)));
                    this.changeDetectorRef.markForCheck();
                }));

            this.subscriptions.push(observableFrom(tile.pressed$).pipe(
                tap((value) => toogleAttribute('pressed', value)))
                .subscribe(() => this.changeDetectorRef.markForCheck()));

            this.subscriptions.push(observableFrom(tile.selected$).pipe(
                tap((value) => toogleAttribute('selected', value)))
                .subscribe(() => this.changeDetectorRef.markForCheck()));

            this.subscriptions.push(observableFrom(tile.dragging$).pipe(
                tap((value) => toogleAttribute('drag', value)))
                .subscribe(() => this.changeDetectorRef.markForCheck()));

            this.subscriptions.push(observableFrom(tile.dropping$).pipe(
                tap((value) => toogleAttribute('drop', value)))
                .subscribe(() => this.changeDetectorRef.markForCheck()));

            this.subscriptions.push(observableFrom(tile.cutted$).pipe(
                tap((value) => toogleAttribute('cutted', value)))
                .subscribe(() => this.changeDetectorRef.markForCheck()));

            this.subscriptions.push(observableFrom(tile.expanded$).pipe(
                tap((value) => toogleAttribute('expanded', value)))
                .subscribe(() => this.changeDetectorRef.markForCheck()));

            this.subscriptions.push(observableFrom(tile.deleted$).pipe(
                tap(() => this.element.remove()))
                .subscribe(() => this.changeDetectorRef.markForCheck()));

            const tooogleHide$ = observableFrom(tile.hidden$).pipe(
                tap((value) => toogleAttribute('hidden', value ? '1' : '2')));

            // Hide
            this.subscriptions.push(tooogleHide$.pipe(
                debounceTime(1000),
                filter((value) => value),
                tap(() => this.element.setAttribute('hidden', '0')))
                .subscribe(() => this.changeDetectorRef.markForCheck()));

            // Show
            this.subscriptions.push(tooogleHide$.pipe(
                debounceTime(1),
                filter((value) => !value),
                tap(() => this.element.removeAttribute('hidden')))
                .subscribe(() => this.changeDetectorRef.markForCheck()));

            // Refresh
            this.subscriptions.push(observableFrom(tile.refresh$).pipe(
                debounceTime(1))
                .subscribe(() => this.changeDetectorRef.markForCheck()));
        }
    }

    public get tile() {
        return this._tile;
    }

    public ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    public onModelChanged() {
        this.modelChanged.emit();
    }

    public get isGroup() {
        const isGroup = this._tile && this._tile.constructor.name === 'DejaTileGroup';
        return isGroup;
    }
}
