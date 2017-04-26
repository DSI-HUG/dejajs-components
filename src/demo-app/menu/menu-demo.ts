/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import {Component} from '@angular/core';

@Component({
  selector: 'deja-menu-demo',
  styleUrls: ['./menu-demo.scss'],
  templateUrl: './menu-demo.html',
})
export class MenuDemoComponent {
  public selected = '';
  public items = [
    {text: 'Refresh'},
    {text: 'Settings'},
    {text: 'Help', disabled: true},
    {text: 'Sign Out'},
  ];

    protected tabIndex = 1;

  public select(text: string) { this.selected = text; }
}
