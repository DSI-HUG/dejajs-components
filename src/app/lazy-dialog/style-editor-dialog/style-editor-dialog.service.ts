import { Injectable, Type } from '@angular/core';
import { AbstractLazyModule, DialogService } from '@deja-js/component/core';

import { StyleConfig } from './style-config.model';

@Injectable({
    providedIn: 'root'
})
export class StyleEditorDialogService extends DialogService<StyleConfig, StyleConfig> {
    protected getModule(): Promise<Type<AbstractLazyModule<unknown>>> {
        return import('./style-editor-dialog.module').then(m => m.StyleEditorDialogModule);
    }
}
