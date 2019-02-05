/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { DejaPopupButton } from '../popup/model/popup-action.model';
import { DejaPopupConfig } from '../popup/model/popup-config.model';
import { TileGroupStyleEditorComponent } from './tile-group-style-editor.component';

export class TileGroupStyleEditorConfig extends DejaPopupConfig {
    constructor() {
        super();

        this.toolbarType = 'window';
        this.title = 'Modifier l\'apparence du groupe'; // TODO Lang
        this.actions = [
            new DejaPopupButton('confirm', 'Ok', 'done'), // TODO Lang
            new DejaPopupButton('cancel', 'Cancel', 'cancel'), // TODO Lang
        ];
        this.fullscreen = false;
        this.hasBackdrop = true;
        this.disableClose = true;
        this.contentComponentRef = TileGroupStyleEditorComponent;
    }
}
