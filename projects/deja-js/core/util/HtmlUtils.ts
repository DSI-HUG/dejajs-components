/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

export class HtmlUtils {

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public static getEncodedURIComponent(jsonObjParameters: Record<string, string |number | boolean>): string {
        if (jsonObjParameters) {
            const params: string[] = [];
            // eslint-disable-next-line no-loops/no-loops
            for (const p in jsonObjParameters) {
                // eslint-disable-next-line no-prototype-builtins
                if (jsonObjParameters.hasOwnProperty(p)) {
                    params.push(`${encodeURIComponent(p)}=${encodeURIComponent(jsonObjParameters[p])}`);
                }
            }
            return params.join('&');
        }
        return '';
    }
}
