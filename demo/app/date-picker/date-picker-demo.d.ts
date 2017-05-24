import { OnInit } from '@angular/core';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/distinctUntilChanged';
export declare class DejaDatePickerDemoComponent implements OnInit {
    protected tabIndex: number;
    theDate: Date;
    theDateSelected: Date;
    disabledDate: (number | Date)[];
    dateRangeFrom: Date;
    dateRangeTo: Date;
    dateMin: Date;
    dateMax: Date;
    private dateFrom;
    private dateTo;
    constructor();
    ngOnInit(): void;
}
