/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

export * from './clipboard/index';
export * from './destroy/index';
export * from './diacritics/index';
export * from './events/index';
export * from './forms/index';
export * from './id/index';
export * from './lazy-loading/index';
export * from './media/index';
export * from './media/index';
export * from './message-box/index';
export * from './overlay/index';
export * from './resize-listener/index';
export * from './text/index';
export * from './validation/index';
export * from './keycodes.enum';
export * from './custom-operators';
export * from './cache';

if (!document.doctype) {
    console.warn('[DejaJS] Current document does not have a doctype. This may cause some components not to behave as expected.');
}
