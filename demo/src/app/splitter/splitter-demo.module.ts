import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaSplitterModule } from '@deja-js/component';
import { DejaMarkdownModule } from '../../component/markdown/index';
import { DejaSplitterDemoComponent } from './splitter-demo';
import { routing } from './splitter-demo.routes';

@NgModule({
    declarations: [DejaSplitterDemoComponent],
    exports: [DejaSplitterDemoComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatTabsModule,
        MatToolbarModule,
        DejaSplitterModule,
        DejaMarkdownModule,
        routing,
    ],
    providers: [
    ],
})
export class DejaSplitterDemoModule { }
