import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-iframe-demo',
    templateUrl: './iframe-demo.component.html',
    styleUrls: ['./iframe-demo.component.scss']
})
export class DejaIframeDemoComponent {

    public url: string | SafeUrl;

    public constructor(private domSanitizer: DomSanitizer) {
        const untrustedUrl = environment.production ? 'https://dsi-hug.github.io/dejajs-components' : 'http://localhost:5100';
        this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(untrustedUrl);
    }
}
