/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IEditorLanguage } from '../../component/monaco-editor/options/editor-language.model';
import { INews, NewsService } from '../services/news.service';

@Component({
    selector: 'reactive-form-demo',
    styleUrls: ['./reactive-form-demo.scss'],
    templateUrl: './reactive-form-demo.html',
})
export class ReactiveFormDemoComponent {
    protected tabIndex = 1;

    protected exampleValue = `
    `;

    protected html = IEditorLanguage.HTML;
    protected news$: Observable<INews[]>;

    constructor(newsService: NewsService) {
        this.news$ = newsService.getNews$(50);
    }
}

