/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, inject, ViewChild } from '@angular/core';
import { ViewPortComponent, ViewPortItem } from '@deja-js/component/v2/viewport';
import { Observable, shareReplay } from 'rxjs';

import { News } from '../../common/news.model';
import { NewsService } from '../../services/news.service';


@Component({
    selector: 'viewport-demo',
    styleUrls: ['./viewport-demo.scss'],
    templateUrl: './viewport-demo.html'
})
export class ViewPortDemoComponent {
    @ViewChild('viewport')
    protected viewport?: ViewPortComponent<News>;

    public tabIndex = 1;
    public isHorizontal = false;
    public hasButtons = false;
    public ensureIndex?: number;
    public scrollPosition = 0;

    public exampleValue = `
    <viewport [models]="news$ | async" itemSize="120">
        <ng-template #viewPortItemTemplate let-item>
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
    </viewport>`;

    public news$: Observable<ReadonlyArray<News>>;

    private newsService = inject(NewsService);

    public constructor() {
        this.news$ = this.newsService.getNews$(50).pipe(
            shareReplay({ bufferSize: 1, refCount: false })
        );
    }

    public reload(): void {
        if (this.viewport) {
            this.viewport.reloadViewPort();
        }
    }

    public imageLoaded(item: IExtendedViewPortItem): void {
        requestAnimationFrame(() => requestAnimationFrame(() => {
            if (!item.loaded) {
                item.loaded = true;
                item.size = undefined;
                this.viewport?.refreshViewPort();
            }
        }));
    }
}

export interface IExtendedViewPortItem extends ViewPortItem<News> {
    loaded: boolean;
}
