/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { AfterViewInit, ChangeDetectorRef, Component, Input, NgZone, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class DejaSidenavComponent implements AfterViewInit, OnInit, OnDestroy {
    @ViewChild('sidenav') public sidenav: MatSidenav;

    @Input()
    public headerText = 'TITLE';

    @Input()
    public headerIcon = 'face';

    public hidden = false;
    public title: string;

    private largeMql: MediaQueryList;
    private mediumMql: MediaQueryList;
    private smallMql: MediaQueryList;

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private zone: NgZone,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private changeDetectorRef: ChangeDetectorRef,
    ) {
        this.largeMql = window.matchMedia('(min-width:1200px)');
        this.largeMql.addListener(this.onLargeMediaMatchChange.bind(this));

        this.mediumMql = window.matchMedia('(min-width:500px) and (max-width:1200px)');
        this.mediumMql.addListener(this.onMediumMediaMatchChange.bind(this));

        this.smallMql = window.matchMedia('(max-width:500px)');
        this.smallMql.addListener(this.onSmallMediaMatchChange.bind(this));
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

    public ngAfterViewInit() {
        Observable.timer(1)
            .first()
            .subscribe(() => {
                this.onLargeMediaMatchChange(this.largeMql);
                this.onMediumMediaMatchChange(this.mediumMql);
                this.onSmallMediaMatchChange(this.smallMql);
            });
    }

    public ngOnDestroy() {
        this.largeMql.removeListener(this.onLargeMediaMatchChange);
        this.mediumMql.removeListener(this.onLargeMediaMatchChange);
        this.smallMql.removeListener(this.onLargeMediaMatchChange);
        this.largeMql = this.mediumMql = this.smallMql = null;
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

    private onLargeMediaMatchChange(e: MediaQueryList) {
        if (e.matches && this.sidenav.open) {
            this.zone.run(() => {
                this.hidden = false;
                this.sidenav.open();
                this.sidenav.mode = 'side';
                this.changeDetectorRef.markForCheck();
            });
        }
    }

    private onMediumMediaMatchChange(e: MediaQueryList) {
        if (e.matches && this.sidenav.close) {
            this.zone.run(() => {
                this.hidden = false;
                this.sidenav.close();
                this.sidenav.mode = 'side';
                this.changeDetectorRef.markForCheck();
            });
        }
    }

    private onSmallMediaMatchChange(e: MediaQueryList) {
        if (e.matches && this.sidenav.close) {
            this.zone.run(() => {
                this.hidden = true;
                this.sidenav.close();
                this.sidenav.mode = 'over';
                this.changeDetectorRef.markForCheck();
            });
        }
    }
}
