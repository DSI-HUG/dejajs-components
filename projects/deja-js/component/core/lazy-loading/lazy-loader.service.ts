import { ComponentType } from '@angular/cdk/portal';
import { Compiler, Injectable, Injector, NgModuleRef, Type } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

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
