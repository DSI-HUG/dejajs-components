import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaColorPickerModule, DejaColorSelectorModule } from '@deja-js/component';
import { DejaMarkdownModule } from '../../component/markdown/index';
import { DejaColorSelectorDemoComponent } from './color-selector-demo';
import { routing } from './color-selector-demo.routes';

@NgModule({
    declarations: [DejaColorSelectorDemoComponent],
    exports: [DejaColorSelectorDemoComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatTabsModule,
        MatToolbarModule,
        DejaColorSelectorModule,
        DejaColorPickerModule,
        DejaMarkdownModule,
        routing,
    ],
    providers: [
    ],
})
export class DejaColorSelectorDemoModule { }
