import { DejaPopupAction } from './popup-action.model';
import { DejaPopupBase } from './popup-base.class';

export class DejaPopupReponse {

    public acceptedActionNames = ['check', 'ok', 'yes', 'confirm', 'save'];
    public lastAction: DejaPopupAction;

    constructor(
        public resp: any,
        public componentInstance: DejaPopupBase,
    ) {
        if (componentInstance && componentInstance.actionSelected) {
            this.lastAction = this.componentInstance.actionSelected;
        } else {
            this.lastAction = new DejaPopupAction('cancel');
        }
    }

    public get accepted(): boolean {
        return this.acceptedActionNames.some((nameOk: string) => nameOk === this.lastAction.name);
    }
}
