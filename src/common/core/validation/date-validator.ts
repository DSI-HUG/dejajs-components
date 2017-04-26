/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Directive, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';

function validateDateFactory(dateMin, dateMax) {
   return (c: FormControl) => {
        const bad = {
            invalideDate: true,
        };

        const now = new Date();

        if (!c.value) {
            return bad;
        } else if (dateMin && c.value.getTime() < now.getTime()) {
            return bad;
        } else if (dateMax && c.value.getTime() > now.getTime()) {
            return bad;
        }
        return null;
    };
}

@Directive({
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => DateValidatorDirective), multi: true },
    ],
    selector: '[date-validator][ngModel]',
})
export class DateValidatorDirective implements OnInit {
    @Input() public dateMin: Date;
    @Input() public dateMax: Date;

    private validator: Function;

    constructor() {
    }

    public ngOnInit() {
        this.validator = validateDateFactory(this.dateMin, this.dateMax);
    }

    public validate(c: FormControl) {
        return this.validator(c);
    }
}
