import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'deja-combo-list-actionbar',
    templateUrl: './combo-list-actionbar.component.html',
    styleUrls: ['./combo-list-actionbar.component.scss']
})
export class DejaComboListActionbarComponent implements OnInit {

    @Input() public disabled: boolean;
    @Output() public actionSelected = new EventEmitter<string>();

    constructor() { }

    public ngOnInit() { }

    public doAction(actionName: string) {
        this.actionSelected.emit(actionName);
    }

}
