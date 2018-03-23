/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { MediaService } from '../../common/core/media/media.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class DejaSidenavComponent implements OnInit, OnDestroy {
    @Input()
    public headerText = 'TITLE';

    @Input()
    /** Will be ignored if headerSvgIcon is set */
    public headerIcon = 'face';

    @Input()
    /** If not null, will be used in place of headerIcon. */
    public headerSvgIcon: string;

    public hidden = false;
    public title: string;
    public opened = false;
    public mode = 'side';

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        mediaService: MediaService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private changeDetectorRef: ChangeDetectorRef,
    ) {

        Observable.from(mediaService.mediaChanged$)
            .takeUntil(this.ngUnsubscribe)
            .subscribe((alias) => {
                this.hidden = alias === 'xs';
                this.opened = alias === 'lg';
                this.mode = alias === 'xs' ? 'over' : 'side';
                this.changeDetectorRef.markForCheck();
            });
    }

    public ngOnInit() {
        // Initialize
        this.title = this.getActivatedRouteLastChild().data[`title`];

        // Listen for future route changes
        this.router.events
            .takeUntil(this.ngUnsubscribe)
            .filter((event) => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map((route) => {
                while (route.firstChild) {
                    route = route.firstChild;
                }
                return route;
            })
            .filter((route) => route.outlet === 'primary')
            .mergeMap((route) => route.data)
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
