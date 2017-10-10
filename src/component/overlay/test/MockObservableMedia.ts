import {MediaChange} from '@angular/flex-layout';
import {Observable} from 'rxjs/Observable';

export class MockObservableMedia {
    public asObservable(): Observable<MediaChange> {
        return Observable.of(new MediaChange());
    }

    public isActive(_query: string) {
        return false;
    }
}
