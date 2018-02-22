import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatTabsModule, MatToolbarModule } from '@angular/material';
import { DejaMessageBoxModule, DejaRangeModule, DejaSnackbarModule } from '@deja-js/component';
import { DejaMarkdownModule } from '../../component/markdown/index';
import { DejaRangeDemoComponent } from './range-demo';
import { routing } from './range-demo.routes';

@NgModule({
    declarations: [DejaRangeDemoComponent],
    exports: [DejaRangeDemoComponent],
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        MatCardModule,
        MatTabsModule,
        MatToolbarModule,
        MatButtonModule,
        DejaRangeModule,
        DejaMarkdownModule,
        DejaSnackbarModule,
        DejaMessageBoxModule,
        routing,
    ],
    providers: [
    ],
})
export class DejaRangeDemoModule { }
