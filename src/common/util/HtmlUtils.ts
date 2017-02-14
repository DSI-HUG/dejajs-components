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

export class HtmlUtils {

    public static getEncodedURIComponent(jsonObjParameters: any): string {
        if (jsonObjParameters) {
            let params: string[] = [];
            for (let p in jsonObjParameters) {
                if (jsonObjParameters.hasOwnProperty(p)) {
                    params.push(encodeURIComponent(p) + "=" + encodeURIComponent(jsonObjParameters[p]));
                }
            }
            return params.join('&');
        }
        return '';
    }
}
