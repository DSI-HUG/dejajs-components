import { forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// import { DejaComboListChildComponent } from '../component/combo-list-child/combo-list-child.component';
// import { DejaComboListComponent } from '../container/combo-list.component';

// export const COMBOLIST_VALUE_ACCESSOR: any = {
//     provide: NG_VALUE_ACCESSOR,
//     useExisting: forwardRef(() => DejaComboListComponent),
//     multi: true
// };

// export const COMBOLISTCHILD_VALUE_ACCESSOR: any = {
//     provide: NG_VALUE_ACCESSOR,
//     useExisting: forwardRef(() => DejaComboListChildComponent),
//     multi: true
// };

export const noop = () => { };

export const valueAccessorFactory = (component: any) => {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => component),
        multi: true
    };
};
