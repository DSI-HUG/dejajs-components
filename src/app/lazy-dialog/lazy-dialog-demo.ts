/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, inject } from '@angular/core';
import { Destroy } from '@deja-js/component/core';
import { map, Subject, switchMap, takeUntil } from 'rxjs';

import { StyleConfig } from './style-editor-dialog/style-config.model';
import { StyleEditorDialogService } from './style-editor-dialog/style-editor-dialog.service';

@Component({
    selector: 'lazy-dialog-demo',
    styleUrls: ['./lazy-dialog-demo.scss'],
    templateUrl: './lazy-dialog-demo.html'
})
export class LazyDialogDemoComponent extends Destroy {
    public tabIndex = 0;

    public openFormDialog$ = new Subject<void>();

    private styleEditorDialogService = inject(StyleEditorDialogService);

    public constructor() {
        super();

        const dialogData = {

        } as StyleConfig;

        this.openFormDialog$.pipe(
            switchMap(() => this.styleEditorDialogService.openDialog$(dialogData).pipe(
                map(result => console.log(result))
            )),
            takeUntil(this.destroyed$)
        ).subscribe();
    }
}
