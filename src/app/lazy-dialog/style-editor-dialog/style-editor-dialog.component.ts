/* eslint-disable no-bitwise */
import { ChangeDetectionStrategy, Component, Inject, Injector, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Destroy } from '@deja-js/component/core';
import { Color, MaterialColorService } from '@deja-js/component/core/graphics';
import { takeUntil } from 'rxjs';

import { StyleConfig, StyleConfigBorderDirection } from './style-config.model';
import { StyleEditorPrintService } from './style-editor-print.service';

export interface StyleEditorDialogFormControls {
    borderWidth: FormControl<number | null>;
    borderColor: FormControl<Color | null>;
    topBorder: FormControl<boolean | null>;
    rightBorder: FormControl<boolean | null>;
    bottomBorder: FormControl<boolean | null>;
    leftBorder: FormControl<boolean | null>;
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
    public formGroup: FormGroup<StyleEditorDialogFormControls>;

    private widthStep = 2;

    public constructor(
        @Inject(MAT_DIALOG_DATA) public params: StyleConfig,
        public syleEditorPrintService: StyleEditorPrintService,
        private injector: Injector
    ) {
        super();

        this.materialColorService = injector.get(MaterialColorService);

        this.formGroup = new FormGroup<StyleEditorDialogFormControls>({
            borderWidth: new FormControl((this.params?.borderWidth || 0) / this.widthStep || null),
            borderColor: new FormControl(this.params?.borderColor && Color.fromHex(this.params.borderColor) || null),
            topBorder: new FormControl(((this.params?.borderDirection || 0) & StyleConfigBorderDirection.top) !== 0),
            rightBorder: new FormControl(((this.params?.borderDirection || 0) & StyleConfigBorderDirection.right) !== 0),
            bottomBorder: new FormControl(((this.params?.borderDirection || 0) & StyleConfigBorderDirection.bottom) !== 0),
            leftBorder: new FormControl(((this.params?.borderDirection || 0) & StyleConfigBorderDirection.left) !== 0)
        });

        syleEditorPrintService.messageDialogResult$.pipe(
            takeUntil(this.destroyed$)
        ).subscribe();
    }

    public openMessageBoxDialog(): void {
        this.syleEditorPrintService.openMessageDialog$.next({ message: 'My message', injector: this.injector });
    }

    public createModelFromForm(): StyleConfig {
        const values = this.formGroup.getRawValue();
        return {
            borderWidth: Math.min(Math.max((values.borderWidth || 0), this.min), this.max) * this.widthStep,
            borderColor: values.borderColor?.toHex(),
            borderDirection: (values.topBorder && StyleConfigBorderDirection.top || 0) + (values.rightBorder && StyleConfigBorderDirection.right || 0) + (values.bottomBorder && StyleConfigBorderDirection.bottom || 0) + (values.leftBorder && StyleConfigBorderDirection.left || 0)
        } as StyleConfig;
    }
}
