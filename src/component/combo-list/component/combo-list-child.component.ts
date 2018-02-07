import {
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

@Component({
    selector: 'deja-combo-list-child',
    templateUrl: './combo-list-child.component.html',
    styleUrls: ['./combo-list-child.component.scss']
})
export class DejaComboListChildComponent<T> {
    @Input() public items: T;
    @Input() public labelFieldName: string;
    @Input() public disabled: boolean;
    @Output() public itemSelected = new EventEmitter<T>();

    public toggleItem(item: T) {
        if (!this.disabled) {
            this.itemSelected.emit(item);
        }
    }

}
