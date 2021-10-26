/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ComponentType } from '@angular/cdk/portal';
import { Compiler, Injectable, Injector, NgModuleRef, Type } from '@angular/core';
import { from, map, Observable, switchMap } from 'rxjs';

export abstract class AbstractLazyModule<Component> {
    public constructor(
        public componentType: ComponentType<Component>
    ) {}
}

@Injectable({
    providedIn: 'root'
})
export class LazyLoaderService {

    public constructor(private compiler: Compiler, private injector: Injector) {}

    public loadModule$<T extends AbstractLazyModule<unknown>>(path: Promise<Type<T>>): Observable<NgModuleRef<T>> {
        return from(path).pipe(
            switchMap(elementModuleOrFactory => from(this.compiler.compileModuleAsync(elementModuleOrFactory))),
            map(moduleFactory => moduleFactory.create(this.injector))
        );
    }
}
