import { forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export const noop = () => { };

// tslint:disable-next-line:only-arrow-functions
export function valueAccessorFactory(component: any) {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => component),
        multi: true
    };
}
