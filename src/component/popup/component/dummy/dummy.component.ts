
import { Component } from '@angular/core';

@Component({
    selector: 'dpi-dummy',
    templateUrl: './dummy.component.html',
    styleUrls: ['./dummy.component.scss']
})
export class DummyComponent {

    public title: string;

    constructor() {
        this.title = 'Hello World';
        setTimeout(_ => {
            this.title = 'Updated!';
        }, 5000);
    }

}
