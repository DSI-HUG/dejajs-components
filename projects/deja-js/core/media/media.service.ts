/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { InjectionToken } from '@angular/core';
import { NgZone } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Optional } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export interface MediaQueryDefinition {
    alias: string;
    mediaQuery: string;
    overlapping?: boolean;
}

export const MEDIA_QUERY_DEFINITIONS = new InjectionToken<MediaQueryDefinition[]>('MEDIA_QUERY_DEFINITIONS');

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

export const SIMPLIFIED_MEDIA_QUERY_DEFINITIONS = [
    {
        alias: 'xs',
        mediaQuery: '(max-width: 599px)',
    }, {
        alias: 'sm',
        mediaQuery: '(min-width: 600px) and (max-width: 959px)',
    }, {
        alias: 'md',
        mediaQuery: '(min-width: 860px) and (max-width: 1279px)',
    }, {
        alias: 'lg',
        mediaQuery: '(min-width: 1280px)',
    }
] as MediaQueryDefinition[];

@Injectable()
export class MediaService implements OnDestroy {
    public isMobile$: Observable<boolean>;
    public mediaChanged$: BehaviorSubject<string>;
    public mql = {} as { [alias: string]: MediaQueryList };

    constructor(private zone: NgZone, @Optional() @Inject(MEDIA_QUERY_DEFINITIONS) mediaDefinitions?: MediaQueryDefinition[]) {
        if (!mediaDefinitions) {
            mediaDefinitions = SIMPLIFIED_MEDIA_QUERY_DEFINITIONS;
        }

        mediaDefinitions.forEach(mediaDefinition => {
            const { alias, mediaQuery } = mediaDefinition;
            this.mql[alias] = window.matchMedia(mediaQuery);
            this.mql[alias].addEventListener('change', this.onMQLEvent.bind(this, alias));
            if (this.mql[alias].matches) {
                this.mediaChanged$ = new BehaviorSubject(alias);
            }
        });

        this.isMobile$ = from(this.mediaChanged$).pipe(
            map(alias => alias === 'xs' || alias === 'sm'),
            distinctUntilChanged()
        );
    }

    public ngOnDestroy() {
        Object.keys(this.mql).forEach((alias) => {
            this.mql[alias].removeEventListener('change', this.onMQLEvent as any);
            delete this.mql[alias];
        });
    }

    private onMQLEvent(alias: string, event: MediaQueryListEvent) {
        this.zone.run(() => {
            if (event.matches) {
                this.mediaChanged$.next(alias);
            }
        });
    }
}
