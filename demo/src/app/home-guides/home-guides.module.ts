import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DejaMarkdownModule } from '../../component/markdown/index';
import { HomeGuidesComponent } from './home-guides.component';
import { routing } from './home-guides.routes';

@NgModule({
    declarations: [HomeGuidesComponent],
    exports: [HomeGuidesComponent],
    imports: [
        CommonModule,
        DejaMarkdownModule,
        routing,
    ],
    providers: [
    ],
})
export class HomeGuidesModule { }
