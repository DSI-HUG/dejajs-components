/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Destroy } from '@deja-js/component/core';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

import { numberValidator } from './validators';

interface NumberFormControls {
    numberValue3: FormControl<number | null>;
    numberValue4: FormControl<number | null>;
    numberValue5: FormControl<number | null>;
    numberValue6: FormControl<number | null>;
}

@Component({
    selector: 'deja-numeric-stepper-demo',
    styleUrls: ['./numeric-stepper-demo.component.scss'],
    templateUrl: './numeric-stepper-demo.component.html'
})
export class DejaNumericStepperDemoComponent extends Destroy {
    public tabIndex = 1;

    public value1 = 90;
    public value2 = 9.5;
    public value3 = 5;
    public value4 = 1;
    public value5 = 1;
    public value6 = 1;
    public value6min = 0;
    public value6max = 20;

    public numberForm: FormGroup<NumberFormControls>;
    public onInput1Change$ = new Subject<number>();

    private changeDetectorRef = inject(ChangeDetectorRef);

    public constructor() {
        super();

        this.numberForm = new FormGroup<NumberFormControls>({
            numberValue3: new FormControl({ value: this.value3, disabled: false }, numberValidator),
            numberValue4: new FormControl(this.value4, [Validators.required, numberValidator]),
            numberValue5: new FormControl(this.value5, numberValidator),
            numberValue6: new FormControl(this.value6, numberValidator)
        });

        this.onInput1Change$.pipe(
            debounceTime(1),
            distinctUntilChanged(),
            takeUntil(this.destroyed$)
        ).subscribe(v => {
            this.value1 = v;
            this.changeDetectorRef.markForCheck();
        });
    }

    public changeValue3(step: number): void {
        this.numberForm.controls.numberValue3.setValue((this.numberForm.controls.numberValue3.value || 0) + step);
    }

    public changeValue4(step: number): void {
        this.numberForm.controls.numberValue4.setValue((this.numberForm.controls.numberValue4.value || 0) + step);
    }

    public changeValue5(step: number): void {
        this.numberForm.controls.numberValue5.setValue((this.numberForm.controls.numberValue5.value || 0) + step);
    }

    public changeValue6(step: number): void {
        const value = Math.max(Math.min((this.numberForm.controls.numberValue6.value || 0) + step, this.value6max), this.value6min);
        this.numberForm.controls.numberValue6.setValue(value);
    }
}
