import { Component, Input, OnInit } from '@angular/core';
import { DejaPopupConfig } from '../../model/popup-config.model';

@Component({
    selector: 'popup-content',
    templateUrl: './popup-content.component.html',
    styleUrls: ['./popup-content.component.scss']
})
export class DejaPopupContentComponent implements OnInit {

    @Input() public config: DejaPopupConfig;

    constructor() { }

    public ngOnInit() {
    }

}
