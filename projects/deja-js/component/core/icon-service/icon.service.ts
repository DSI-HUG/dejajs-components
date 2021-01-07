/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class IconService {

    public constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    }

    /**
     * register an SVG icon to the MatIconRegistry, so that this icon can be used with the MatIcon component.
     *
     * &lt;mat-icon svgIcon='my-svg-icon' &gt;&lt;/mat-icon&gt;
     *
     * @param iconName
     * @param iconUrl
     */
    public addSvgIcon(iconName: string, iconUrl: string): void {
        this.iconRegistry.addSvgIcon(iconName, this.sanitizer.bypassSecurityTrustResourceUrl(iconUrl));
    }

    public useMaterialIcons(value = true): void {
        this.iconRegistry.registerFontClassAlias('deja-icons', value ? 'material-icons' : null);
    }
}
