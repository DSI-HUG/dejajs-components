/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, ElementRef, EventEmitter, Inject, Input, Optional, Output } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

import { TooltipComponentInterface } from '../../../projects/deja-js/component/v2/tooltip/tooltip-component.interface';
import { News } from './news.model';

@Component({
    selector: 'news-card',
    styleUrls: ['./news-card.component.scss'],
    templateUrl: './news-card.component.html'
})
export class NewsCardComponent implements TooltipComponentInterface {
    @Input()
    public item: News;

    @Output()
    public readonly imageLoaded = new EventEmitter();

    public constructor(
        public elementRef: ElementRef<HTMLElement>,
        @Optional() @Inject(MAT_DIALOG_DATA) news: News
    ) {
        if (news) {
            this.item = news;
        }
    }
}
