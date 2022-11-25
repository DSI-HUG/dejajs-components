/* eslint-disable no-bitwise */
import { ChangeDetectionStrategy, Component, Inject, Injector, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ControlsOf, Destroy } from '@deja-js/component/core';
import { Color, MaterialColorService } from '@deja-js/component/core/graphics';
import { takeUntil } from 'rxjs';

import { StyleConfig, StyleConfigBorderDirection } from './style-config.model';
import { StyleEditorPrintService } from './style-editor-print.service';

export interface StyleEditorDialogForm {
    borderWidth: number;
    borderColor: Color;
    topBorder: boolean;
    rightBorder: boolean;
    bottomBorder: boolean;
    leftBorder: boolean;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'app-style-editor-dialog',
    styleUrls: ['./style-editor-dialog.component.scss'],
    templateUrl: './style-editor-dialog.component.html'
})
export class StyleEditorDialogComponent extends Destroy {
    public materialColorService: MaterialColorService;
    public min = 0;
    public max = 20;
    public formGroup: FormGroup<ControlsOf<StyleEditorDialogForm>>;

    private widthStep = 2;

    public constructor(
        @Inject(MAT_DIALOG_DATA) public params: StyleConfig,
        public syleEditorPrintService: StyleEditorPrintService,
        private injector: Injector,
        formBuilder: FormBuilder
    ) {
        super();

        this.materialColorService = injector.get(MaterialColorService);

        this.formGroup = formBuilder.group<StyleEditorDialogForm>({
            borderWidth: this.params?.borderWidth / this.widthStep || null,
            borderColor: this.params?.borderColor ? Color.fromHex(this.params.borderColor) : null,
            topBorder: this.params && (this.params.borderDirection & StyleConfigBorderDirection.top) !== 0,
            rightBorder: this.params && (this.params.borderDirection & StyleConfigBorderDirection.right) !== 0,
            bottomBorder: this.params && (this.params.borderDirection & StyleConfigBorderDirection.bottom) !== 0,
            leftBorder: this.params && (this.params.borderDirection & StyleConfigBorderDirection.left) !== 0
        });

        syleEditorPrintService.messageDialogResult$.pipe(
            takeUntil(this.destroyed$)
        ).subscribe();
    }

    public openMessageBoxDialog(): void {
        this.syleEditorPrintService.openMessageDialog$.next({ message: 'My message', injector: this.injector });
    }

    public createModelFromForm(values: Partial<StyleEditorDialogForm>): StyleConfig {
        return {
            borderWidth: Math.min(Math.max(values.borderWidth, this.min), this.max) * this.widthStep,
            borderColor: values.borderColor?.toHex(),
            borderDirection: (values.topBorder && StyleConfigBorderDirection.top) + (values.rightBorder && StyleConfigBorderDirection.right) + (values.bottomBorder && StyleConfigBorderDirection.bottom) + (values.leftBorder && StyleConfigBorderDirection.left)
        } as StyleConfig;
    }
}
