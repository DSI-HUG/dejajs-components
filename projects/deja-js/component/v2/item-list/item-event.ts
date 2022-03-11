/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Item } from './item';

export class ItemEvent<T> {
    public item: Item<T>;
    public model: T;
    public items: ReadonlyArray<Item<T>>;
    public models: ReadonlyArray<T>;
}
