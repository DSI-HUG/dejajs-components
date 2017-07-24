import { AbstractControl } from '@angular/forms';
export const cheeseValidator = (control: AbstractControl): string[] => {
    const val = control.value;
    if (val === 'gruyère') {
        return [`${val} is not a fruit`];
    }
};
