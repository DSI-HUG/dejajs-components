import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaColorSelectorModule } from '@deja-js/component/color-selector';
import { AbstractLazyModule } from '@deja-js/component/core';
import { DejaNumericStepperModule } from '@deja-js/component/v2/numeric-stepper';

import { StyleEditorDialogComponent } from './style-editor-dialog.component';
import { StyleEditorPrintService } from './style-editor-print.service';

@NgModule({
    declarations: [
        StyleEditorDialogComponent
    ],
    imports: [
        CommonModule,
        DejaColorSelectorModule,
        DejaNumericStepperModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatToolbarModule,
        ReactiveFormsModule
    ],
    exports: [
        StyleEditorDialogComponent
    ],
    providers: [StyleEditorPrintService]
})
export class StyleEditorDialogModule extends AbstractLazyModule<StyleEditorDialogComponent> {
    public constructor() {
        super(StyleEditorDialogComponent);
    }
}
