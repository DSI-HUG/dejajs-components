import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class Destroy implements OnDestroy {

    protected destroyed$ = new Subject();

    public ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    }
}
