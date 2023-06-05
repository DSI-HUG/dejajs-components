import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
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
