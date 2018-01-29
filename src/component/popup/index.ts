import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatDialogModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { DejaIFrameModule } from '../iframe/index';
import { DejaOverlayModule } from '../overlay/index';

import { DejaPopupActionsComponent } from './component/popup-actions/popup-actions.component';
import { DejaPopupAdvancedComponent } from './component/popup-advanced/popup-advanced.component';
import { DejaPopupBoxComponent } from './component/popup-box/popup-box.component';
import { DejaPopupContentComponent } from './component/popup-content/popup-content.component';
import { DejaPopupToolbarComponent } from './component/popup-toolbar/popup-toolbar.component';
import { DejaPopupTrayComponent } from './component/popup-tray/popup-tray.component';
import { DejaPopupComponent } from './component/popup/popup.component';
import { DejaPopupService } from './service/popup.service';

@NgModule({
    declarations: [
        DejaPopupComponent,
        DejaPopupToolbarComponent,
        DejaPopupAdvancedComponent,
        DejaPopupTrayComponent,
        DejaPopupContentComponent,
        DejaPopupComponent,
        DejaPopupBoxComponent,
        DejaPopupActionsComponent,
    ],
    entryComponents: [
        DejaPopupComponent,
        DejaPopupAdvancedComponent,
        DejaPopupActionsComponent,
    ],
    exports: [
        DejaPopupComponent,
        DejaPopupToolbarComponent,
        DejaPopupAdvancedComponent,
        DejaPopupTrayComponent,
        DejaPopupContentComponent,
        DejaPopupComponent,
        PortalModule,
        DejaPopupActionsComponent,
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatDialogModule,
        DejaIFrameModule,
        DejaOverlayModule,
        FlexLayoutModule,
        PortalModule,
    ],
    providers: [
        DejaPopupService,
    ],
})
export class DejaPopupModule { }

export * from './service/popup.service';
export * from './model/popup-action.model';
export * from './model/popup-base.class';
export * from './model/popup-config.model';
export * from './model/popup-response.model';
export * from './component/popup/popup.component';
export * from './component/popup-actions/popup-actions.component';
export * from './component/popup-advanced/popup-advanced.component';
export * from './component/popup-box/popup-box.component';
export * from './component/popup-content/popup-content.component';
export * from './component/popup-toolbar/popup-toolbar.component';
export * from './component/popup-tray/popup-tray.component';
