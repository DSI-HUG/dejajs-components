/*
 * *
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 * /
 *
 */

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IEditorLanguage } from '../../component/monaco-editor/options/editor-language.model';
import { INews, NewsService } from '../services/news.service';

@Component({
    selector: 'deja-viewport-demo',
    styleUrls: ['./viewport-demo.scss'],
    templateUrl: './viewport-demo.html',
})
export class DejaViewPortDemoComponent {
    protected exampleValue = `
    <deja-viewport [items]="news$ | async" itemSize="120">
        <template #itemTemplate let-item>
            <div *ngIf="item" class="news" [attr.id]="id">
                <img [attr.src]="item.urlsToLogos.medium" class="logo">
                <span class="text">
                    <span class="name">{{ item.name }}</span>
                    <span class="description">{{ item.description }}</span>
                    <div class="footer">
                        <a class="url" [attr.href]="item.url">{{ item.url }}</a>
                        <span class="category">{{ item.category }}</span>
                        <span class="country">{{ item.country }}</span>
                        <span class="language">{{ item.language }}</span>
                    </div>
                </span>
            </div>
        </template>
    </deja-viewport>`;
    protected html = IEditorLanguage.HTML;
    protected news$: Observable<INews[]>;

    constructor(newsService: NewsService) {
        this.news$ = newsService.getNews$(50);
    }
}
