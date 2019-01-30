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