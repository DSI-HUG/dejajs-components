import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatTabsModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaViewPortModule } from '@deja-js/component';
import { DejaMarkdownModule } from '../../component/markdown/index';
import { NewsCardModule } from '../common/news-card.module';
import { DejaViewPortDemoComponent } from './viewport-demo';
import { routing } from './viewport-demo.routes';

@NgModule({
    declarations: [DejaViewPortDemoComponent],
    exports: [DejaViewPortDemoComponent],
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatTabsModule,
        MatToolbarModule,
        DejaViewPortModule,
        DejaMarkdownModule,
        NewsCardModule,
        routing,
    ],
    providers: [
    ],
})
export class DejaViewPortDemoModule { }
