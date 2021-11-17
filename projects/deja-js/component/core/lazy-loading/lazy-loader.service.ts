import { ComponentType } from '@angular/cdk/portal';
import { Injectable, Injector, ɵcreateInjector as createInjector, Type } from '@angular/core';
import { from, map, Observable } from 'rxjs';

export abstract class AbstractLazyModule<Component> {

    public constructor(
        public componentType: ComponentType<Component>
    ) {
    }
}

export interface LoadModuleInfos<T> {
    injector: Injector;
    module: T;
}

@Injectable({
    providedIn: 'root'
})
export class LazyLoaderService {

    public constructor(private injector: Injector) {
    }

    public loadModule$<T extends AbstractLazyModule<unknown>>(path: Promise<Type<T>>): Observable<LoadModuleInfos<T>> {
        return from(path).pipe(
            map(elementModuleOrFactory => {
                const injector = createInjector(elementModuleOrFactory, this.injector);
                return {
                    injector,
                    module: injector.get(elementModuleOrFactory)
                };
            })
        );
    }
}
