import {Observable} from 'rxjs/Observable';

export class MockMediaService {
    public isMobile$: Observable<boolean> = Observable.of(false);
}
