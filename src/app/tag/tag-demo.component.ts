/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { Component } from '@angular/core';

@Component({
    selector: 'tag-demo',
    templateUrl: './tag-demo.component.html'
})
export class DejaTagDemoComponent {

    public tabIndex = 1;

    public values = ['HTML5', 'ANGULAR'];
}
