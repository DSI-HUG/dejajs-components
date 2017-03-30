import { Subject } from 'rxjs/Rx';
import { IDejaGridColumn } from '../index';
export declare class IDejaGridColumnLayout {
    scrollLeft: number;
    vpBeforeWidth: number;
    vpAfterWidth: number;
    columns: IDejaGridColumn[];
    refresh$: Subject<void>;
}
