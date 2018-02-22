import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaBoldQueryModule, DejaDialogModule, DejaItemModule, DejaMessageBoxModule, DejaSelectModule } from '@deja-js/component';
import { DejaMarkdownModule } from '../../component/markdown/index';
import { NewsCardComponent } from '../common/news-card.component';
import { SelectDemoComponent } from './select-demo';
import { routing } from './select-demo.routes';

@NgModule({
    declarations: [
        NewsCardComponent,
        SelectDemoComponent,
    ],
    exports: [SelectDemoComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatCardModule,
        MatCheckboxModule,
        MatTabsModule,
        MatToolbarModule,
        DejaSelectModule,
        DejaMarkdownModule,
        DejaMessageBoxModule,
        DejaDialogModule,
        DejaItemModule,
        DejaBoldQueryModule,
        MatInputModule,
        routing,
    ],
    providers: [
    ],
})
export class SelectDemoModule { }
