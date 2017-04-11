import { OnInit } from '@angular/core';
export declare class DejaDatePickerDemoComponent implements OnInit {
    protected tabIndex: number;
    theDate: Date;
    disabledDate: (number | Date)[];
    dateRangeFrom: Date;
    dateRangeTo: Date;
    private dateFromCtrl;
    private dateToCtrl;
    private dateFrom;
    private dateTo;
    constructor();
    ngOnInit(): void;
}
