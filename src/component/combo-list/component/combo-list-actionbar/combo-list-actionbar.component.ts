import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDejaAction } from '../../../../common/core/action.interface';

@Component({
    selector: 'deja-combo-list-actionbar',
    templateUrl: './combo-list-actionbar.component.html',
    styleUrls: ['./combo-list-actionbar.component.scss']
})
export class DejaComboListActionbarComponent implements OnInit {

    @Input() public disabled: boolean;
    @Output() public actionSelected = new EventEmitter<IDejaAction>();

    constructor() { }

    public ngOnInit() { }

    public doAction(target: string, actionName: string) {
        const newAction: IDejaAction = {
            type: actionName,
            payload: target,
        };
        this.actionSelected.emit(newAction);
    }

}
