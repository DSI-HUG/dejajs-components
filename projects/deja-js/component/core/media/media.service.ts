/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Inject, Injectable, InjectionToken, NgZone, OnDestroy, Optional } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';

export interface MediaQueryDefinition {
    alias: string;
    mediaQuery: string;
    overlapping?: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MEDIA_QUERY_DEFINITIONS = new InjectionToken<MediaQueryDefinition[]>('MEDIA_QUERY_DEFINITIONS');

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DEFAULT_MEDIA_QUERY_DEFINITIONS = [
    {
        alias: 'xs',
        mediaQuery: '(min-width: 0px) and (max-width: 599px)'
    },
    {
        alias: 'gt-xs',
        overlapping: true,
        mediaQuery: '(min-width: 600px)'
    },
    {
        alias: 'lt-sm',
        overlapping: true,
        mediaQuery: '(max-width: 599px)'
    },
    {
        alias: 'sm',
        mediaQuery: '(min-width: 600px) and (max-width: 959px)'
    },
    {
        alias: 'gt-sm',
        overlapping: true,
        mediaQuery: '(min-width: 960px)'
    },
    {
        alias: 'lt-md',
        overlapping: true,
        mediaQuery: '(max-width: 959px)'
    },
    {
        alias: 'md',
        mediaQuery: '(min-width: 960px) and (max-width: 1279px)'
    },
    {
        alias: 'gt-md',
        overlapping: true,
        mediaQuery: '(min-width: 1280px)'
    },
    {
        alias: 'lt-lg',
        overlapping: true,
        mediaQuery: '(max-width: 1279px)'
    },
    {
        alias: 'lg',
        mediaQuery: '(min-width: 1280px) and (max-width: 1919px)'
    },
    {
        alias: 'gt-lg',
        overlapping: true,
        mediaQuery: '(min-width: 1920px)'
    },
    {
        alias: 'lt-xl',
        overlapping: true,
        mediaQuery: '(max-width: 1920px)'
    },
    {
        alias: 'xl',
        mediaQuery: '(min-width: 1920px) and (max-width: 5000px)'
    }
] as MediaQueryDefinition[];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SIMPLIFIED_MEDIA_QUERY_DEFINITIONS = [
    {
        alias: 'xs',
        mediaQuery: '(max-width: 599px)'
    }, {
        alias: 'sm',
        mediaQuery: '(min-width: 600px) and (max-width: 959px)'
    }, {
        alias: 'md',
        mediaQuery: '(min-width: 860px) and (max-width: 1279px)'
    }, {
        alias: 'lg',
        mediaQuery: '(min-width: 1280px)'
    }
] as MediaQueryDefinition[];

@Injectable()
export class MediaService implements OnDestroy {
    public isMobile$: Observable<boolean>;
    public mediaChanged$: BehaviorSubject<string>;
    public mql = {} as { [alias: string]: MediaQueryList };

    public constructor(private zone: NgZone, @Optional() @Inject(MEDIA_QUERY_DEFINITIONS) mediaDefinitions?: MediaQueryDefinition[]) {
        if (!mediaDefinitions) {
            mediaDefinitions = SIMPLIFIED_MEDIA_QUERY_DEFINITIONS;
        }

        mediaDefinitions.forEach(mediaDefinition => {
            const { alias, mediaQuery } = mediaDefinition;
            this.mql[alias] = window.matchMedia(mediaQuery);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            this.mql[alias].addEventListener('change', this.onMqlEvent.bind(this, alias));
            if (this.mql[alias].matches) {
                this.mediaChanged$ = new BehaviorSubject(alias);
            }
        });

        this.isMobile$ = this.mediaChanged$.pipe(
            map(alias => alias === 'xs' || alias === 'sm'),
            distinctUntilChanged()
        );
    }

    public ngOnDestroy(): void {
        Object.keys(this.mql).forEach(alias => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            this.mql[alias].removeEventListener('change', this.onMqlEvent as never);
            delete this.mql[alias];
        });
    }

    private onMqlEvent(alias: string, event: MediaQueryListEvent): void {
        this.zone.run(() => {
            if (event.matches) {
                this.mediaChanged$.next(alias);
            }
        });
    }
}
