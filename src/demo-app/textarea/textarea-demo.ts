/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
    selector: 'textarea-demo',
    styleUrls: ['./textarea-demo.scss'],
    templateUrl: './textarea-demo.html',
})
export class TextAreaDemoComponent {
    protected tabIndex = 1;
    protected multitext = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
                        Mauris auctor sit amet odio et aliquet. Curabitur auctor eleifend mattis. <br />
                        Nullam sit amet quam tellus. Ut mattis tellus sed erat ultricies ornare. <br />
                        Nulla dictum nisi eu tortor lacinia porttitor. Donec eu arcu et enim cursus viverra. <br />
                        Praesent pulvinar dui nisi, a tincidunt arcu finibus sed.`;

    protected multitext2: string;
}
