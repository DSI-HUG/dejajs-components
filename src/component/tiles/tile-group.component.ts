/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, OnDestroy, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { from as observableFrom, Subject } from 'rxjs';
import { debounceTime, filter, takeWhile } from 'rxjs/operators';
import { Color } from '../../common/core/graphics/color';
import { DejaEditorComponent } from '../editor/deja-editor.component';
import { DejaPopupButton } from '../popup/model/popup-action.model';
import { DejaPopupConfig } from '../popup/model/popup-config.model';
import { DejaPopupService } from '../popup/service/popup.service';
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
    public backgroundColor: string;
    @HostBinding('style.color') public foregroundColor: string = null;
    public editing = false;
    public borderWidth: string;
    public borderColor: string;
    private isAlive = true;

    constructor(private changeDetectorRef: ChangeDetectorRef, private dejaPopupService: DejaPopupService) {
        observableFrom(this.edit$).pipe(
            takeWhile(() => this.isAlive),
            filter(() => this._designMode),
            debounceTime(100)
        ).subscribe(() => this.editor.setFocus());
    }

    private _model: IDejaTile;

    public get model(): IDejaTile {
        return this._model;
    }

    @Input()
    public set model(value: IDejaTile) {
        this._model = value;
        if (this._model) {
            this.borderColor = this._model.templateModel.borderColor || this.backgroundColor;
            this.borderWidth = this._model.templateModel.borderWidth;
        }
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
            coreStyles_bold: { element: 'b', overrides: 'strong' },
            coreStyles_italic: { element: 'i', overrides: 'em' },
            enterMode: 3, // CKEDITOR.ENTER_DIV,
            extraPlugins: 'colorbutton,justify,autogrow',
            language: 'fr',
            format_tags: 'p;h1;h2',
            removeButtons: 'Styles,Subscript,Superscript,Strike',
            removePlugins: 'magicline',
            toolbarGroups: [
                { name: 'undo' },
                { name: 'align' },
                { name: 'colors' },
                { name: 'font' },
                '/',
                { name: 'others' },
                { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
                { name: 'styles', groups: ['format', 'formats'] },
                { name: 'paragraph', groups: ['list'] },
            ]
        };
    }

    @HostBinding('style.padding')
    public get borderWidthStyle(): string {
        return this._model.templateModel.borderWidth;
    }

    @HostBinding('style.background-color')
    public get borderColorStyle(): string {
        return this._model.templateModel.borderColor || this.backgroundColor;
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
            this.updateBorderColor(backup.borderColor);
            this.updateBorderWidth(backup.borderWidth);
        });
    }

    public deleteBorder() {
        this.updateBorderWidth(null);
        this.updateBorderColor(null);
        this.modelChanged.emit();
        this.changeDetectorRef.markForCheck();
    }

    public updateBorderColor(color: string) {
        this.borderColor = color;
        this._model.templateModel.borderColor = color;
        this.modelChanged.emit();
        this.changeDetectorRef.markForCheck();
    }

    public updateBorderWidth(width: string) {
        this.borderWidth = width;
        this._model.templateModel.borderWidth = width;
        this.modelChanged.emit();
        this.changeDetectorRef.markForCheck();
    }
}
