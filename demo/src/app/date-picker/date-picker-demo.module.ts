import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule, MatTabsModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaDatePickerModule, DejaDateSelectorModule } from '@deja-js/component';
import { DejaMarkdownModule } from '../../component/markdown/index';
import { DejaDatePickerDemoComponent } from './date-picker-demo';
import { routing } from './date-picker-demo.routes';

@NgModule({
    declarations: [DejaDatePickerDemoComponent],
    exports: [DejaDatePickerDemoComponent],
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        MatCardModule,
        MatCheckboxModule,
        MatTabsModule,
        MatToolbarModule,
        DejaDatePickerModule,
        DejaDateSelectorModule,
        DejaMarkdownModule,
        routing,
    ],
    providers: [
    ],
})
export class DejaDatePickerDemoModule { }
