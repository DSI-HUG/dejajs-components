import { Subject } from 'rxjs/Rx';
export declare class DejaCancelableEvent extends CustomEvent {
    cancel$: Subject<any>;
}
