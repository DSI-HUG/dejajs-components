/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/takeWhile';
import { Observable } from 'rxjs/Observable';
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
    @Input() public template;
    @Input() public designMode;
    @Output() public modelChanged = new EventEmitter();
    @Output() public close = new EventEmitter<Event>();

    public element: HTMLElement;
    public progressDiameter = 100;

    private _tile: DejaTile;
    private isAlive = true;

    constructor(el: ElementRef, private changeDetectorRef: ChangeDetectorRef) {
        this.element = el.nativeElement as HTMLElement;
        this.element.setAttribute('hidden', '0');
    }

    @Input()
    public set tile(tile: DejaTile) {
        this._tile = tile;

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

            Observable.from(tile.pixelBounds$)
                .filter((bounds) => !!bounds)
                .first()
                .takeWhile(() => this.isAlive && !!this._tile)
                .filter(() => tile.fading)
                .do(() => {
                    this.element.setAttribute('fading', '1');
                    this.changeDetectorRef.markForCheck();
                })
                .delay(200)
                .subscribe(() => {
                    this.element.removeAttribute('fading');
                    this.changeDetectorRef.markForCheck();
                });

            Observable.from(tile.pixelBounds$)
                .takeWhile(() => this.isAlive && !!this._tile)
                .filter((bounds) => !!bounds)
                .subscribe((bounds) => {
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

            Observable.from(tile.pressed$)
                .takeWhile(() => this.isAlive && !!this._tile)
                .do((value) => toogleAttribute('pressed', value))
                .subscribe(() => this.changeDetectorRef.markForCheck());

            Observable.from(tile.selected$)
                .takeWhile(() => this.isAlive && !!this._tile)
                .do((value) => toogleAttribute('selected', value))
                .subscribe(() => this.changeDetectorRef.markForCheck());

            Observable.from(tile.dragging$)
                .takeWhile(() => this.isAlive && !!this._tile)
                .do((value) => toogleAttribute('drag', value))
                .subscribe(() => this.changeDetectorRef.markForCheck());

            Observable.from(tile.dropping$)
                .takeWhile(() => this.isAlive && !!this._tile)
                .do((value) => toogleAttribute('drop', value))
                .subscribe(() => this.changeDetectorRef.markForCheck());

            Observable.from(tile.cutted$)
                .takeWhile(() => this.isAlive && !!this._tile)
                .do((value) => toogleAttribute('cutted', value))
                .subscribe(() => this.changeDetectorRef.markForCheck());

            Observable.from(tile.expanded$)
                .takeWhile(() => this.isAlive && !!this._tile)
                .do((value) => toogleAttribute('expanded', value))
                .subscribe(() => this.changeDetectorRef.markForCheck());

            Observable.from(tile.deleted$)
                .takeWhile(() => this.isAlive && !!this._tile)
                .do(() => this.element.remove())
                .subscribe(() => this.changeDetectorRef.markForCheck());

            const tooogleHide$ = Observable.from(tile.hidden$)
                .do((value) => toogleAttribute('hidden', value ? '1' : '2'));

            // Hide
            tooogleHide$
                .takeWhile(() => this.isAlive && !!this._tile)
                .debounceTime(1000)
                .filter((value) => value)
                .do(() => this.element.setAttribute('hidden', '0'))
                .subscribe(() => this.changeDetectorRef.markForCheck());

            // Show
            tooogleHide$
                .takeWhile(() => this.isAlive && !!this._tile)
                .debounceTime(1)
                .filter((value) => !value)
                .do(() => this.element.removeAttribute('hidden'))
                .subscribe(() => this.changeDetectorRef.markForCheck());

            // Refresh
            Observable.from(tile.refresh$)
                .takeWhile(() => this.isAlive && !!this._tile)
                .debounceTime(1)
                .subscribe(() => this.changeDetectorRef.markForCheck());
        }
    }

    public get tile() {
        return this._tile;
    }

    public ngOnDestroy() {
        this.isAlive = false;
    }

    protected onTitleChanged() {
        this.modelChanged.emit();
    }
}
