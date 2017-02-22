/*
 * *
 *  @license
 *  Copyright Hôpital Universitaire de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/deja-js/blob/master/LICENSE
 * /
 *
 */

import { Component, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';
import { IDejaTile } from './tile';
import { DejaTilesLayoutProvider } from './tiles-layout.provider';

@Component({
    selector: 'deja-tile',
    styleUrls: [
        './tile.component.scss',
    ],
    templateUrl: './tile.component.html',
})
export class DejaTileComponent implements OnDestroy {
    @Input() public template;
    public cutted = new BehaviorSubject(false);
    public dragging = new BehaviorSubject(false);
    public dropping = new BehaviorSubject(false);
    public pressed = new BehaviorSubject(false);
    public selected = new BehaviorSubject(false);
    public bounds = new Subject<IBounds>();
    @Output() public dispose = new EventEmitter<DejaTileComponent>();

    public element: HTMLElement;

    private _tile: IDejaTile;
    private _bounds: IBounds;
    private _isDragging = false;
    private _isPressed = false;
    private _isSelected = false;

    constructor(el: ElementRef, private layoutProvider: DejaTilesLayoutProvider) {
        this.element = el.nativeElement as HTMLElement;
        this.element.setAttribute('hidden', '');

        Observable.from(this.bounds)
            .first()
            .delay(1)
            .subscribe(() => {
                this.element.removeAttribute('hidden');
            });

        Observable.from(this.bounds)
            .subscribe((bounds) => {
                this._bounds = bounds;
                this.element.style.left = `${bounds.left}px`;
                this.element.style.top = `${bounds.top}px`;
                this.element.style.width = `${bounds.width}px`;
                this.element.style.height = `${bounds.height}px`;
            });

        Observable.from(this.pressed)
            .subscribe((value) => {
                this._isPressed = value;
                if (value) {
                    this.element.setAttribute('pressed', '');
                } else {
                    this.element.removeAttribute('pressed');
                }
            });

        Observable.from(this.selected)
            .subscribe((value) => {
                this._isSelected = value;
                if (value) {
                    this.element.setAttribute('selected', '');
                } else {
                    this.element.removeAttribute('selected');
                }
            });

        Observable.from(this.dragging)
            .subscribe((value) => {
                this._isDragging = value;
                if (value) {
                    this.element.setAttribute('drag', '');
                } else {
                    this.element.removeAttribute('drag');
                }
            });

        Observable.from(this.dropping)
            .subscribe((value) => {
                if (value) {
                    this.element.setAttribute('drop', '');
                } else {
                    this.element.removeAttribute('drop');
                }
            });

        Observable.from(this.cutted)
            .subscribe((value) => {
                if (value) {
                    this.element.setAttribute('cutted', '');
                } else {
                    this.element.removeAttribute('cutted');
                }
            });
    }

    @Input()
    public set tile(value: IDejaTile) {
        this._tile = value;
        // register to layoup provider
        if (value) {
            this.layoutProvider.tileComponent.next(this);
        }
    }

    public get tile() {
        return this._tile;
    }

    public get isDragging() {
        return this._isDragging;
    }

    public get isPressed() {
        return this._isPressed;
    }

    public get isSelected() {
        return this._isSelected;
    }

    public ngOnDestroy() {
        this.dispose.emit(this);
    }

    public getBounds() {
        return this._bounds;
    }
}

export interface IBounds {
    left: number;
    top: number;
    width: number;
    height: number;
}
