import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatTabsModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaMessageBoxModule, DejaSnackbarModule } from '@deja-js/component';
import { DejaMarkdownModule } from '../../component/markdown/index';
import { DejaSnackbarDemoComponent } from './snackbar-demo';
import { routing } from './snackbar-demo.routes';

@NgModule({
    declarations: [DejaSnackbarDemoComponent],
    exports: [DejaSnackbarDemoComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatTabsModule,
        MatToolbarModule,
        DejaSnackbarModule,
        DejaMarkdownModule,
        DejaMessageBoxModule,
        routing,
    ],
    providers: [
    ],
})
export class DejaSnackbarDemoModule { }
