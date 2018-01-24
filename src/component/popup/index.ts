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
export class DejaPopuModule { }
