/*
 * *
 *  @license
 *  Copyright Hôpital Universitaire de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/deja-js/blob/master/LICENSE
 * /
 *
 */

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { GlobalEventEmmitter } from '../../src/common/global-event/global-event-emmitter';
import { DemoAppModule } from './demo-app-module';

// enableProdMode();
platformBrowserDynamic().bootstrapModule(DemoAppModule);
