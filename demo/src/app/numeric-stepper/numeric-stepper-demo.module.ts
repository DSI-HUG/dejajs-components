import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaNumericStepperModule } from '@deja-js/component';
import { DejaMarkdownModule } from '../../component/markdown/index';
import { DejaNumericStepperDemoComponent } from './numeric-stepper-demo.component';
import { routing } from './numeric-stepper-demo.routes';

@NgModule({
    declarations: [DejaNumericStepperDemoComponent],
    exports: [DejaNumericStepperDemoComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatTabsModule,
        MatToolbarModule,
        DejaNumericStepperModule,
        DejaMarkdownModule,
        routing,
    ],
    providers: [
    ],
})
export class DejaNumericStepperDemoModule { }
