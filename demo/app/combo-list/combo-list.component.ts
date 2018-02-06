import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-combo-list',
    templateUrl: './combo-list.component.html',
    styleUrls: ['./combo-list.component.scss']
})
export class ComboListDemoComponent implements OnInit {

    public items = [
        {
            selected: true,
            label: 'El 1 casc casc casc casc',
        },
        {
            selected: false,
            label: 'El 2',
        },
        {
            selected: false,
            label: 'El 3',
        },
    ];

    public itemToSelect: any[];
    public itemSelected: any[];

    constructor() { }

    public ngOnInit() {
        this.itemToSelect = this.items.filter((i: any) => !i.selected);
        this.itemSelected = this.items.filter((i: any) => i.selected);
    }

}
