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
import { debounceTime, filter, takeWhile} from 'rxjs/operators';
import { Color } from '../../common/core/graphics';
import { DejaEditorComponent } from '../editor';
import { DejaPopupButton, DejaPopupConfig, DejaPopupService } from '../popup';
import { TileGroupStyleEditorComponent } from './tile-group-style-editor.component';
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
    @Output() public close = new EventEmitter<void>();
    @Output() public modelChanged = new EventEmitter<string>();
    public edit$ = new Subject<void>();
    public editorConfig = DejaTileGroupComponent.buildEditorConfig();
    @ViewChild(DejaEditorComponent) public editor: DejaEditorComponent;
    protected backgroundColor: string;
    @HostBinding('style.color') protected foregroundColor: string = null;
    protected editing = false;
    private isAlive = true;
    private widthStep = 3;

    constructor(private changeDetectorRef: ChangeDetectorRef,
                private dejaPopupService: DejaPopupService) {
        observableFrom(this.edit$).pipe(
            takeWhile(() => this.isAlive),
            filter(() => this._designMode),
            debounceTime(100)
        ).subscribe(() => this.editor.setFocus());
    }

    private _model: IDejaTile;

    get model(): IDejaTile {
        return this._model;
    }

    @Input()
    set model(value: IDejaTile) {
        this._model = value;
        if (this._model) {
            this._borderColor = this._model.templateModel.borderColor || this.backgroundColor;
            this._borderWidth = this._model.templateModel.borderWidth;
        }
    }

    @HostBinding('style.padding') protected _borderWidth: string;

    public get borderWidth(): string {
        return this._borderWidth;
    }

    public set borderWidth(value: string) {
        this._borderWidth = value;
        this._model.templateModel.borderWidth = value;
        this.changeDetectorRef.markForCheck();
    }

    @HostBinding('style.background-color') protected _borderColor: string;

    public get borderColor(): string {
        return this._borderColor;
    }

    public set borderColor(value: string) {
        this._borderColor = value || this.backgroundColor;
        this._model.templateModel.borderColor = value;
        this.changeDetectorRef.markForCheck();
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
        if (!this.borderColor) {
            this.borderColor = this.backgroundColor;
        }
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
        if (this.designMode) {
            this.editing = true;
            this.changeDetectorRef.markForCheck();
            // Put this action on the browser queue to execute it after the editor became visible
            setTimeout(() => this.editor.setFocus(), 0);
        }
    }

    public onEditorBlur() {
        this.editing = false;
        this.changeDetectorRef.markForCheck();
    }

    public editStyle() {
        const config = new DejaPopupConfig();
        config.toolbarType = 'window';
        config.title = 'Modifier l\'apparence du groupe';
        config.data = this;
        config.actions = [
            new DejaPopupButton('confirm', 'Confirmer', 'done'),
            new DejaPopupButton('cancel', 'Annuler', 'cancel'),
        ];
        config.fullscreen = false;
        config.hasBackdrop = true;
        config.contentComponentRef = TileGroupStyleEditorComponent;

        const backup = {
            borderColor: this.borderColor,
            borderWidth: this.borderWidth
        };

        this.dejaPopupService.openAdvanced$(config).pipe(
            filter(res => !res.accepted)
        ).subscribe(() => {
            this.borderColor = backup.borderColor;
            this.borderWidth = backup.borderWidth;
            this.modelChanged.emit();
        });
    }

    public deleteBorder() {
        this.borderWidth = null;
        this.borderColor = null;
        this.modelChanged.emit();
        this.changeDetectorRef.markForCheck();
    }

    public updateBorderColor(color: string) {
        this.borderColor = color;
        this.modelChanged.emit();
        this.changeDetectorRef.markForCheck();
    }

    public updateBorderWidth(width: number) {
        this.borderWidth = `${width * this.widthStep}px`;
        this.modelChanged.emit();
        this.changeDetectorRef.markForCheck();
    }

    public getBorderWidthValue(): number {
        const value = this.borderWidth && (!isNaN(+this.borderWidth.replace('px', ''))) ? +this.borderWidth.replace('px', '') : 0;
        return value / this.widthStep;
    }
}
