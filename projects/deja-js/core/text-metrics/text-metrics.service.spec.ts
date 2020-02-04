/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { timer } from 'rxjs';
import { DejaTextMetricsService } from './text-metrics.service';

describe('DejaTextMetricsService', () => {
    let service: DejaTextMetricsService;
    let spanElement: HTMLElement;
    const testText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate porttitor odio, non dictum massa vehicula nec.';

    beforeEach(() => {
        service = new DejaTextMetricsService();
        const fixture = document.createElement('span');
        fixture.id = 'testSpan';
        fixture.style.cssText = 'width:100px; height:50px; font-size:10px; font-family: Arial;';
        fixture.innerHTML = testText;
        document.body.appendChild(fixture);

        /* Cette façon de faire fonctionne aussi.
        const fixture = '<span id="testSpan" style="font-size: 10px; display: inline;"></span>';
        document.body.insertAdjacentHTML('beforeend', fixture);
        */

        spanElement = document.getElementById('testSpan');
        service.metricsElem = spanElement;
        timer(500).subscribe(() => {
        });
    });

    // remove the html fixture from the DOM
    afterEach((done: Function) => {
        timer(2000).subscribe(() => {
            document.body.removeChild(document.getElementById('testSpan'));
            done();
        });
    });

    it('getTextHeight() should return more than 80 for maxWidth=100', async (done: Function) => {
        service.getTextHeight(100, testText).subscribe((textHeight: number) => {
            // console.log(`text height: ${textHeight}`);
            // valeurs aprox = line height * font size = (6 lignes * 1.5) * 10 px = 90
            expect(textHeight).toBeGreaterThan(80);
            done();
        });
    });

    it('getTextHeight() should return 15 for maxWidth=2000', async (done: Function) => {
        service.getTextHeight(2000, testText).subscribe((textHeight: number) => {
            // console.log(`text height: ${textHeight}`);
            expect(textHeight).toEqual(15); // 10px * 1.5 * 1 line
            done();
        });
    });

    it('getTextMaxWidth() should return a value greater than 0', async () => {
        const values: string[] = 'test content'.split(' ');
        const maxWidth = service.getTextMaxWidth(values, spanElement);
        expect(maxWidth).toBeGreaterThan(0);
        expect(maxWidth).toBeLessThan(10 * 7); // 10px * 5 chars ('content')
        expect(maxWidth).toBeGreaterThan(0.5 * 10 * 7); // (Arial width/height ratio) * 10px * 7 chars
    });

});
