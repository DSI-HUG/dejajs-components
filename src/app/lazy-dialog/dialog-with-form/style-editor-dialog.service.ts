import { Injectable, Type } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AbstractLazyModule, DialogService, LazyLoaderService } from '@deja-js/component/core';

import { StyleConfig } from './style-config.model';

@Injectable({
    providedIn: 'root'
})
export class StyleEditorDialogService extends DialogService<StyleConfig, StyleConfig> {
    public constructor(
        lazyLoaderService: LazyLoaderService,
        dialog: MatDialog
    ) {
        super(lazyLoaderService, dialog);
    }

    protected getModule(): Promise<Type<AbstractLazyModule<unknown>>> {
        return import('./style-editor-dialog.module').then(m => m.StyleEditorDialogModule);
    }
}
