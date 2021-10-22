/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { parseISO } from 'date-fns';
import { frCH } from 'date-fns/locale';

import { formatWithLocale, setLocale } from './date-fns-utils';

describe('date-fns utils', () => {
    it('Should parse in english by default and then in french after switch', () => {
        void expect(formatWithLocale(parseISO('2021-01-01'), 'dd MMMM yyyy')).toBe('01 January 2021');

        setLocale(frCH);
        void expect(formatWithLocale(parseISO('2021-01-01'), 'dd MMMM yyyy')).toBe('01 janvier 2021');
    });
});
