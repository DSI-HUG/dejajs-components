import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DejaComboListChildComponent } from './component/combo-list-child.component';
import { DejaComboListComponent } from './container/combo-list.component';

import {
    MatButtonModule,
    MatIconModule,
    MatListModule,
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        FlexLayoutModule,
    ],
    declarations: [
        DejaComboListComponent,
        DejaComboListChildComponent,
    ],
    exports: [
        DejaComboListComponent,
        DejaComboListChildComponent,
    ]
})
export class DejaComboListModule { }

export * from './component/combo-list-child.component';
export * from './container/combo-list.component';
