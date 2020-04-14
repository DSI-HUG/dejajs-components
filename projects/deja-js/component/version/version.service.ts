import { Injectable } from '@angular/core';
import * as dejaJsComponentPkg from '../package.json';

@Injectable({
    providedIn: 'root'
})
export class VersionService {

    public dejajsComponentVersion = dejaJsComponentPkg.version;

    public init() {
        document.body.setAttribute('dejajs-component-version', this.dejajsComponentVersion);
    }
}
