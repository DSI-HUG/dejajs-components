/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DejaSlimScrollModule, MediaModule } from '@deja-js/component/core';

import { DejaSidenavComponent } from './sidenav.component';
import { DejaSidenavContentDirective } from './sidenav-content.directive';
import { DejaSidenavHeaderDirective } from './sidenav-header.directive';
import { DejaSidenavMenuDirective } from './sidenav-menu.directive';
import { DejaSidenavMenuSeparatorDirective } from './sidenav-separator.directive';

@NgModule({
    declarations: [
        DejaSidenavComponent,
        DejaSidenavContentDirective,
        DejaSidenavHeaderDirective,
        DejaSidenavMenuDirective,
        DejaSidenavMenuSeparatorDirective
    ],
    exports: [
        DejaSidenavComponent,
        DejaSidenavContentDirective,
        DejaSidenavHeaderDirective,
        DejaSidenavMenuDirective,
        DejaSidenavMenuSeparatorDirective
    ],
    imports: [
        CommonModule,
        DejaSlimScrollModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatToolbarModule,
        MediaModule
    ]
})
export class DejaSidenavModule { }

export * from './sidenav.component';
export * from './sidenav-menu.directive';
export * from './sidenav-content.directive';
export * from './sidenav-separator.directive';
export * from './sidenav-header.directive';
export * from './sidenav.service';
