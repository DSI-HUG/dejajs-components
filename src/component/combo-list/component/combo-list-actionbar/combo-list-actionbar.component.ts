import { Component, Input } from '@angular/core';
// import { IDejaAction } from '../../../../common/core/action.interface';
import { DejaComboListService } from '../../service/combo-list.service';

@Component({
    selector: 'deja-combo-list-actionbar',
    templateUrl: './combo-list-actionbar.component.html',
    styleUrls: ['./combo-list-actionbar.component.scss']
})
export class DejaComboListActionbarComponent<T> {

    @Input() public disabled: boolean;
    // @Output() public actionSelected = new EventEmitter<IDejaAction>();

    constructor(public srv: DejaComboListService<T>) { }

    // public doAction(target: string, actionName: string) {
    //     const newAction: IDejaAction = {
    //         type: actionName,
    //         payload: target,
    //     };
    //     // this.actionSelected.emit(newAction);
    // }

}
