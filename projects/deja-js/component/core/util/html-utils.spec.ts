/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { HtmlUtils } from './html-utils';

describe('HtmlUtils', () => {

    it('should return empty', () => {
        void expect(HtmlUtils.getEncodedURIComponent(null)).toEqual('');
    });

    it('should return property and value toto=toto', () => {
        void expect(HtmlUtils.getEncodedURIComponent({ toto: 'toto' })).toEqual('toto=toto');
    });

    it('should encode special characters', () => {
        void expect(HtmlUtils.getEncodedURIComponent({ textWithSpecialCharacters: ',/@11h&=+$#' }))
            .toEqual('textWithSpecialCharacters=%2C%2F%4011h%26%3D%2B%24%23');
    });

    it('should encode and concatenate properties', () => {
        void expect(HtmlUtils.getEncodedURIComponent({ prop1: ',/@11h&=+$#', prop2: 'the second éà' }))
            .toEqual('prop1=%2C%2F%4011h%26%3D%2B%24%23&prop2=the%20second%20%C3%A9%C3%A0');
    });
});
