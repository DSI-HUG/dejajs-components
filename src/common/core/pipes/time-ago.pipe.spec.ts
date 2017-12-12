/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { TimeAgoPipe } from './time-ago.pipe';

import * as moment_ from 'moment';
const moment: (value?: any, format?: string) => moment_.Moment = (<any>moment_).default || moment_;

describe('DejaChipsComponent', () => {
    const pipe = new TimeAgoPipe(null, null);

    it('should create the pipe intance', () => {
        expect(pipe).toBeTruthy();
    });

    fit('should be a few seconds ago', async () => {
        const value = pipe.transform(new Date());
        expect(value).toEqual('a few seconds ago');
    });

    fit('should be in 30 minutes', async () => {
        const date = moment().add(30, 'minutes');
        const value = pipe.transform(date);
        expect(value).toEqual('in 30 minutes');
    });

    fit('should be in 120 minutes', async () => {
        const date = moment().add(120, 'minutes');
        const value = pipe.transform(date);
        expect(value).toEqual('in 2 hours');
    });
});
