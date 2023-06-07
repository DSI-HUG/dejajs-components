/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { filter, from, map, mergeAll, mergeWith, MonoTypeOperatorFunction, Observable, ObservableInput, ObservableInputTuple, OperatorFunction, TruthyTypesOf } from 'rxjs';

export const mapToUndefined = <T>(): OperatorFunction<T, undefined> => (source$: Observable<T>): Observable<undefined> => source$.pipe(
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    map(() => undefined as undefined)
);

export const filterDefined = <T>(): OperatorFunction<T, TruthyTypesOf<T>> => (source$: Observable<T>): Observable<TruthyTypesOf<T>> => source$.pipe(
    filter(v => v !== undefined),
    map(v => v as TruthyTypesOf<T>)
);

// Will subscribe to all passed observables with the source observable, but publish only the source observable.
export const subscribeWith = <T, A extends readonly unknown[]>(...others: [...ObservableInputTuple<A>]): MonoTypeOperatorFunction<T> => (source$: Observable<T>): Observable<T> => {
    const argsOrArgArray = <U>(args: (U | U[])[]): U[] => args.length === 1 && Array.isArray(args[0]) ? args[0] : (args as U[]);
    const others$ = argsOrArgArray(others) as ObservableInput<A>[];
    return from(others$).pipe(
        mergeAll(),
        filter(() => false), // stop all the passed observables
        map(() => undefined as never),
        mergeWith(source$) // and just publish the source
    );
};

/** Applies a **`job`** mapping function and then filters out all the undefined values */
export const filterMap = <T, U>(job: (param: T) => U): OperatorFunction<T, TruthyTypesOf<U>> => (source$: Observable<T>): Observable<TruthyTypesOf<U>> => source$.pipe(
    map(value => job(value)),
    filterDefined()
);
