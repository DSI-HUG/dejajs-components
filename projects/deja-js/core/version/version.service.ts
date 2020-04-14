import { Injectable } from '@angular/core';
import * as dejaJsCorePkg from '../package.json';

@Injectable({
    providedIn: 'root'
})
export class VersionService {

    public dejajsCoreVersion = dejaJsCorePkg.version;

    public init() {
        document.body.setAttribute('dejajs-core-version', this.dejajsCoreVersion);
    }
}
