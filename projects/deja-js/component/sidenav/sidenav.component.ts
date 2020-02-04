/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { MediaService } from '@deja-js/core';
import { from, Subject } from 'rxjs';
import { filter, map, mergeMap, takeUntil } from 'rxjs/operators';
import { DejaSidenavService } from './sidenav.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class DejaSidenavComponent implements OnInit, OnDestroy {
    @Input()
    public set showToolbar(value: boolean | string) {
        this._showToolbar = coerceBooleanProperty(value);
    }

    @Input()
    public headerText = 'TITLE';

    @Input()
    public headerIcon = 'face';

    public title: string;
    public mode = 'side';
    public _showToolbar = false;

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        public sidenavService: DejaSidenavService,
        private mediaService: MediaService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private changeDetectorRef: ChangeDetectorRef,
    ) {

        from(this.mediaService.mediaChanged$).pipe(
            takeUntil(this.ngUnsubscribe))
            .subscribe((alias) => {
                this.sidenavService.hidden = alias === 'xs';
                this.sidenavService.opened = alias === 'lg';
                this.sidenavService.mode = alias === 'xs' ? 'over' : 'side';
                this.changeDetectorRef.markForCheck();
            });
    }

    public ngOnInit() {
        // Initialize
        this.title = this.getActivatedRouteLastChild().data[`title`];

        // Listen for future route changes
        this.router.events.pipe(
            takeUntil(this.ngUnsubscribe),
            filter((event) => event instanceof NavigationEnd),
            map(() => this.activatedRoute),
            map((route) => {
                while (route.firstChild) {
                    route = route.firstChild;
                }
                return route;
            }),
            filter((route) => route.outlet === 'primary'),
            mergeMap((route) => route.data))
            .subscribe((event) => this.title = event[`title`]);
    }

    public ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    private getActivatedRouteLastChild(): ActivatedRouteSnapshot {
        let route: ActivatedRouteSnapshot = this.activatedRoute.snapshot.root;
        while (route.firstChild) {
            route = route.firstChild;
        }
        return route;
    }
}
