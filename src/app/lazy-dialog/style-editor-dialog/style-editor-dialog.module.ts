import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
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
