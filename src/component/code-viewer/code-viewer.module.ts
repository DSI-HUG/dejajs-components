import { NgModule } from '@angular/core';

import { DejaCodeViewerComponent } from './code-viewer.component';

@NgModule({
    declarations: [
        DejaCodeViewerComponent,
    ],
    exports: [
        DejaCodeViewerComponent,
    ],
})
export class DejaCodeViewerModule { }
