import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { routing } from './iframe-demo.routes';
import { DejaIframeDemoComponent } from './iframe-demo/iframe-demo.component';

@NgModule({
    declarations: [
        DejaIframeDemoComponent
    ],
    exports: [
        DejaIframeDemoComponent
    ],
    imports: [
        CommonModule,
        routing
    ]
})
export class DejaIframeDemoModule {
}
