/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

export * from './clipboard/index';
export * from './events/index';
export * from './grouping/index';
export * from './icon-service/index';
export * from './item-list/index';
export * from './media/index';
export * from './message-box/index';
export * from './overlay/index';
export * from './resize-listener/index';
export * from './slimscroll/index';
export * from './sorting/index';
export * from './validation/index';
export * from './date-fns';

if (!document.doctype) {
    console.warn('[DejaJS] Current document does not have a doctype. This may cause some components not to behave as expected.');
}
