/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IViewPortItem } from '../../../src/common/core/item-list/viewport.service';
import { IEditorLanguage } from '../../../src/component/monaco-editor/options/editor-language.model';
import { DejaViewPortComponent } from '../../../src/component/viewport/viewport.component';
import { INews } from '../common/news.model';
import { NewsService } from '../services/news.service';

@Component({
    selector: 'deja-viewport-demo',
    styleUrls: ['./viewport-demo.scss'],
    templateUrl: './viewport-demo.html',
})
export class DejaViewPortDemoComponent {
    protected tabIndex = 1;

    @ViewChild('viewport') private viewport: DejaViewPortComponent;

    protected exampleValue = `
    <deja-viewport [items]="news$ | async" itemSize="120">
        <ng-template #itemTemplate let-item>
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
        </ng-template>
    </deja-viewport>`;
    protected html = IEditorLanguage.HTML;
    protected news$: Observable<INews[]>;

    constructor(newsService: NewsService) {
        this.news$ = newsService.getNews$(50);
    }

    protected imageLoaded(item: IViewPortItem) {
        const itemExt = item as IExtendedViewPortItem;
        if (!itemExt.loaded) {
            itemExt.loaded = true;
            this.viewport.refreshViewPort(itemExt);
        }
    }
}

interface IExtendedViewPortItem extends IViewPortItem {
    loaded: boolean;
}
