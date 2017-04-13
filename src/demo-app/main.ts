/*
 * *
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 * /
 *
 */

// import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DemoAppModule } from './demo-app-module';

// Enables Hot Module Replacement.
declare var module: any;
if (module.hot) {
    module.hot.accept();
}

// enableProdMode();
platformBrowserDynamic().bootstrapModule(DemoAppModule);
