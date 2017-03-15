import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
export declare class DateValidatorDirective implements OnInit {
    dateMin: Date;
    dateMax: Date;
    private validator;
    constructor();
    ngOnInit(): void;
    validate(c: FormControl): any;
}
