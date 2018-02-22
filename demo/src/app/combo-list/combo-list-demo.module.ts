import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatDividerModule, MatRadioModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaComboListModule } from '@deja-js/component';
import { DejaMarkdownModule } from '../../component/markdown/index';
import { ComboListDemoComponent } from './combo-list-demo.component';
import { routing } from './combo-list-demo.routes';

@NgModule({
    declarations: [ComboListDemoComponent],
    exports: [ComboListDemoComponent],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatCheckboxModule,
        MatDividerModule,
        MatRadioModule,
        MatSelectModule,
        MatTabsModule,
        MatToolbarModule,
        DejaComboListModule,
        DejaMarkdownModule,
        routing,
    ],
    providers: [
    ],
})
export class ComboListDemoModule { }
