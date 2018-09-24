/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

export class RegExpUtils {

    /**
     * escape all regexp special chars.
     *
     * @param value
     * @returns the regexp special chars escaped string
     */
    public static escapeRegExp(value: string): string {
        if (!value) {
            return value;
        }
        return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }
}
