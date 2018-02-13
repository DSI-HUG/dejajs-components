import { Component, Input } from '@angular/core';
import { DejaComboListService } from '../../service/combo-list.service';

@Component({
    selector: 'deja-combo-list-actionbar',
    templateUrl: './combo-list-actionbar.component.html',
    styleUrls: ['./combo-list-actionbar.component.scss']
})
export class DejaComboListActionbarComponent<T> {

    @Input() public disabled: boolean;
    @Input() public disableFastActions: boolean;

    constructor(public srv: DejaComboListService<T>) { }

}
