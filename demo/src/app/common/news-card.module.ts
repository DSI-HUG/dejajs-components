import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule, MatTabsModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaDatePickerModule, DejaDateSelectorModule } from '@deja-js/component';
import { DejaMarkdownModule } from '../../component/markdown/index';
import { NewsCardComponent } from './news-card.component';

@NgModule({
    declarations: [NewsCardComponent],
    exports: [NewsCardComponent],
    imports: [
        CommonModule,
    ],
    providers: [
    ],
})
export class NewsCardModule { }
