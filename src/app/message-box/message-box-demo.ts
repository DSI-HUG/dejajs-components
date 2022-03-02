/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component } from '@angular/core';
import { DejaMessageBoxAction } from '@deja-js/component/core';
import { Observable, switchMap } from 'rxjs';

import { NewsService } from '../services/news.service';
import { NewsTooltipService } from './tooltip/news-tooltip.service';


@Component({
    selector: 'message-box-demo',
    styleUrls: ['./message-box-demo.scss'],
    templateUrl: './message-box-demo.html'
})
export class DejaMessageBoxDemoComponent {
    public tabIndex = 1;
    public dialogTitle: string;
    public newsTooltip$: (element: HTMLElement) => Observable<void>;

    public actions = [
        {
            action: (): void => {
                this.dialogTitle = '<b>I am a deja-dialog !</b><br/> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet felis id nisl maximus interdum. Morbi mollis sapien sapien. Vivamus lacinia elementum eros';
            },
            text: 'Cliquez moi pour ouvrir une deja-dialog',
            type: 'primary'
        },
        {
            action: (): void => alert('test action'),
            text: 'test sans icon'
        },
        {
            action: (): void => alert('test action'),
            type: 'danger'
        }
    ] as DejaMessageBoxAction[];

    public closeAction = [
        {
            action: (): void => alert('test action'),
            icon: 'clear'
        }
    ] as DejaMessageBoxAction[];

    public constructor(
        newsService: NewsService,
        newsTooltipService: NewsTooltipService
    ) {
        this.newsTooltip$ = (element: HTMLElement): Observable < void> => newsService.getNews$(10).pipe(
            switchMap(news => newsTooltipService.open$(element, news?.[Math.round(Math.random() * 10)]))
        );
    }
}
