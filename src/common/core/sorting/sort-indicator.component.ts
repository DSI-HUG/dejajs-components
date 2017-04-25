/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, Input } from '@angular/core';
import { ISortInfos } from '../../../index';

@Component({
    selector: 'deja-sort-indicator',
    styleUrls: [ './sort-indicator.component.scss' ],
    template: `<span [attr.sortorder]="sortInfos ? sortInfos.order : null"></span>`,
})
export class DejaSortIndicatorComponent {
    @Input('sort-infos') public sortInfos: ISortInfos;
}
