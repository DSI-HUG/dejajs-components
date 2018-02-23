import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaTagModule } from '@deja-js/component';
import { DejaMarkdownModule } from '../../component/markdown/index';
import { DejaTagDemoComponent } from './tag-demo.component';
import { routing } from './tag-demo.routes';

@NgModule({
    declarations: [DejaTagDemoComponent],
    exports: [DejaTagDemoComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatTabsModule,
        MatToolbarModule,
        DejaTagModule,
        DejaMarkdownModule,
        routing,
    ],
    providers: [
    ],
})
export class DejaTagDemoModule { }
