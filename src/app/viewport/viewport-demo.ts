/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { IViewPortItem } from '@deja-js/component/core/item-list';
import { DejaViewPortComponent } from '@deja-js/component/viewport';
import { Observable } from 'rxjs';

import { News } from '../common/news.model';
import { NewsService } from '../services/news.service';

@Component({
    selector: 'deja-viewport-demo',
    styleUrls: ['./viewport-demo.scss'],
    templateUrl: './viewport-demo.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DejaViewPortDemoComponent {
    @ViewChild('viewport') private viewport: DejaViewPortComponent;

    public tabIndex = 1;
    public isHorizontal = false;
    public hasButtons = false;
    public ensureIndex: number;

    public exampleValue = `
    <deja-viewport [models]="news$ | async" itemSize="120">
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

    public news$: Observable<News[]>;

    public constructor(newsService: NewsService) {
        this.news$ = newsService.getNews$(50);
    }

    public imageLoaded(item: IViewPortItem): void {
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
