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
import { ITileGroupStyleEditorData, TileGroupStyleEditorComponent } from './tile-group-style-editor.component';
import { DejaTileBorderDirection, DejaTileGroup } from './tile-group.class';

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
    public edit$ = new Subject<void>();
    public editorConfig = DejaTileGroupComponent.buildEditorConfig();
    @ViewChild(DejaEditorComponent) public editor: DejaEditorComponent;
    @HostBinding('style.color') public foregroundColor: string = null;
    @HostBinding('style.background-color') public backgroundColor: string = null;
    @HostBinding('style.border-top') public borderTop: string = null;
    @HostBinding('style.border-right') public borderRight: string = null;
    @HostBinding('style.border-bottom') public borderBottom: string = null;
    @HostBinding('style.border-left') public borderLeft: string = null;

    @Output() public close = new EventEmitter<void>();
    @Output() public modelChanged = new EventEmitter<string>();

    public editing = false;
    private isAlive = true;
    private _model: DejaTileGroup;

    constructor(private changeDetectorRef: ChangeDetectorRef, private dejaPopupService: DejaPopupService) {
        observableFrom(this.edit$).pipe(
            takeWhile(() => this.isAlive),
            filter(() => this._designMode),
            debounceTime(100)
        ).subscribe(() => this.editor.setFocus());
    }

    @Input()
    public set model(value: DejaTileGroup) {
        this._model = value;
        this.updateModel();
    }

    public get model() {
        return this._model;
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
        config.title = 'Modifier l\'apparence du groupe'; // TODO Lang
        config.data = {
            tileGroup: this.model,
            update: () => {
                this.updateModel();
            }
        } as ITileGroupStyleEditorData;
        config.actions = [
            new DejaPopupButton('confirm', 'Ok', 'done'), // TODO Lang
            new DejaPopupButton('cancel', 'Cancel', 'cancel'), // TODO Lang
        ];
        config.fullscreen = false;
        config.hasBackdrop = true;
        config.disableClose = true;
        config.contentComponentRef = TileGroupStyleEditorComponent;

        const backup = {
            borderColor: this.model.borderColor,
            borderWidth: this.model.borderWidth,
            borderDirection: this.model.borderDirection
        };

        this.dejaPopupService.openAdvanced$(config).subscribe((res) => {
            if (!res.accepted) {
                this.model.borderColor = backup.borderColor;
                this.model.borderDirection = backup.borderDirection;
                this.model.borderWidth = backup.borderWidth;
            } else if (this.model.borderDirection === 0 || this.model.borderWidth === 0) {
                this.model.clearBorder();
            }
            this.updateModel();
        });
    }

    private updateModel() {
        if (!this._model) {
            this.foregroundColor = null;
            this.backgroundColor = null;
            this.borderTop = null;
            this.borderRight = null;
            this.borderBottom = null;
            this.borderLeft = null;
        }

        this.foregroundColor = Color.parse(this._model.color).bestTextColor.toHex();
        this.backgroundColor = this._model.color;

        // tslint:disable-next-line:no-bitwise
        if ((this._model.borderDirection & DejaTileBorderDirection.top) !== 0) {
            this.borderTop = `solid ${this._model.borderColor || 'transparent'} ${this._model.borderWidth || 0}px`;
        } else {
            this.borderTop = null;
        }

        // tslint:disable-next-line:no-bitwise
        if ((this._model.borderDirection & DejaTileBorderDirection.right) !== 0) {
            this.borderRight = `solid ${this._model.borderColor || 'transparent'} ${this._model.borderWidth || 0}px`;
        } else {
            this.borderRight = null;
        }

        // tslint:disable-next-line:no-bitwise
        if ((this._model.borderDirection & DejaTileBorderDirection.bottom) !== 0) {
            this.borderBottom = `solid ${this._model.borderColor || 'transparent'} ${this._model.borderWidth || 0}px`;
        } else {
            this.borderBottom = null;
        }

        // tslint:disable-next-line:no-bitwise
        if ((this._model.borderDirection & DejaTileBorderDirection.left) !== 0) {
            this.borderLeft = `solid ${this._model.borderColor || 'transparent'} ${this._model.borderWidth || 0}px`;
        } else {
            this.borderLeft = null;
        }

        this.changeDetectorRef.markForCheck();
    }
}
