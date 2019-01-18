/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnDestroy,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { from as observableFrom, Subject } from 'rxjs';
import { debounceTime, filter, takeWhile } from 'rxjs/operators';
import { Color } from '../../common/core/graphics';
import { DejaEditorComponent } from '../editor';
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
    public edit$ = new Subject<void>();
    public editorConfig = DejaTileGroupComponent.buildEditorConfig();
    @ViewChild(DejaEditorComponent) public editor: DejaEditorComponent;
    @HostBinding('style.background-color') protected backgroundColor = DejaTileGroupComponent.defaultColor;
    @HostBinding('style.color') protected foregroundColor: string = null;
    protected editing = false;
    private isAlive = true;

    constructor(private changeDetectorRef: ChangeDetectorRef) {
        observableFrom(this.edit$).pipe(
            takeWhile(() => this.isAlive),
            filter(() => this._designMode),
            debounceTime(100)
        ).subscribe(() => this.editor.setFocus());
    }

    @HostBinding('attr.designMode') private _designMode = false;

    public get designMode() {
        return this._designMode;
    }

    @Input()
    public set designMode(value: boolean | string) {
        this._designMode = coerceBooleanProperty(value);
        this.editing = false;
        this.changeDetectorRef.markForCheck();
    }

    @Input()
    public set color(color: string) {
        this.backgroundColor = color || DejaTileGroupComponent.defaultColor;
        this.foregroundColor = Color.parse(this.backgroundColor).bestTextColor.toHex();
        this.changeDetectorRef.markForCheck();
    }

    private static buildEditorConfig() {
        return {
            coreStyles_bold: {element: 'b', overrides: 'strong'},
            coreStyles_italic: {element: 'i', overrides: 'em'},
            enterMode: 3, // CKEDITOR.ENTER_DIV,
            extraPlugins: 'colorbutton,justify,autogrow',
            language: 'fr',
            format_tags: 'p;h1;h2',
            removeButtons: 'Styles,Subscript,Superscript,Strike',
            removePlugins: 'magicline',
            toolbarGroups: [
                {name: 'undo'},
                {name: 'align'},
                {name: 'colors'},
                {name: 'font'},
                '/',
                {name: 'others'},
                {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
                {name: 'styles', groups: ['format', 'formats']},
                {name: 'paragraph', groups: ['list']},
            ]
        };
    }

    public ngOnDestroy() {
        this.isAlive = false;
    }

    public edit(): void {
        this.editing = true;
        this.changeDetectorRef.markForCheck();
        // Put this action on the browser queue to execute it after the editor became visible
        setTimeout(() => this.editor.setFocus(), 0);
    }

    public onEditorBlur() {
        this.editing = false;
        this.changeDetectorRef.markForCheck();
    }
}
