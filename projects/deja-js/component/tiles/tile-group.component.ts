/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, OnDestroy, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { DejaEditableDirective } from '@deja-js/component/content-editable';
import { Color } from '@deja-js/core';
import { from as observableFrom, Subject } from 'rxjs';
import { debounceTime, filter, takeWhile } from 'rxjs/operators';
import { IDejaTile } from './tile.interface';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-tile-group',
    styleUrls: [
        './tile-group.component.scss',
    ],
    templateUrl: './tile-group.component.html',
})
export class DejaTileGroupComponent implements OnDestroy {
    public static defaultColor = 'rgb(38, 50, 56)';
    @Input() public model: IDejaTile;
    @Output() public close = new EventEmitter<void>();
    @Output() public titleChanged = new EventEmitter<string>();

    @HostBinding('style.background-color') public backgroundColor = DejaTileGroupComponent.defaultColor;
    @HostBinding('style.color') public foregroundColor: string = null;

    public edit$ = new Subject<void>();
    private isAlive = true;
    @ViewChild(DejaEditableDirective) private title: DejaEditableDirective;
    @HostBinding('attr.designMode') public _designMode = false;

    constructor(private changeDetectorRef: ChangeDetectorRef) {
        observableFrom(this.edit$).pipe(
            takeWhile(() => this.isAlive),
            filter(() => this._designMode),
            debounceTime(100))
            .subscribe(() => this.title.edit(true));
    }

    @Input()
    public set color(color: string) {
        this.backgroundColor = color || DejaTileGroupComponent.defaultColor;
        this.foregroundColor = Color.parse(this.backgroundColor).bestTextColor.toHex();
        this.changeDetectorRef.markForCheck();
    }

    @Input()
    public set designMode(value: boolean | string) {
        this._designMode = coerceBooleanProperty(value);
        this.changeDetectorRef.markForCheck();
    }

    public get designMode() {
        return this._designMode;
    }

    public ngOnDestroy() {
        this.isAlive = false;
    }
}
