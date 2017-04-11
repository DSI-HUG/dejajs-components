import { ChangeDetectorRef, NgZone } from '@angular/core';
import { GlobalEventService } from '../../common/global-event/global-event.service';
export declare class GlobalEventsDemoComponent {
    protected tabIndex: number;
    private model;
    private _subscription;
    constructor(changeDetectorRef: ChangeDetectorRef, globalEvent: GlobalEventService, zone: NgZone);
    protected ngOnDestroy(): void;
}
