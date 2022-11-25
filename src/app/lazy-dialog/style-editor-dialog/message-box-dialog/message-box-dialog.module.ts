import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AbstractLazyModule } from '@deja-js/component/core';

import { MessageBoxDialogComponent } from './message-box-dialog.component';

@NgModule({
    declarations: [MessageBoxDialogComponent],
    exports: [MessageBoxDialogComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatToolbarModule
    ]
})
export class MessageBoxDialogModule extends AbstractLazyModule<MessageBoxDialogComponent> {
    public constructor() {
        super(MessageBoxDialogComponent);
    }
}
