import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DejaComboListComponent } from './combo-list.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DejaComboListComponent,
    ],
    exports: [
        DejaComboListComponent,
    ]
})
export class DejaComboListModule { }

export * from './combo-list.component';
