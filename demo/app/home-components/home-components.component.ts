/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { DejaSplitterComponent } from './../../../src/component/splitter/splitter.component';

@Component({
    selector: 'home-components',
    styleUrls: ['home-components.component.scss'],
    templateUrl: 'home-components.component.html',
})
export class HomeComponentsComponent implements OnDestroy, OnInit {
    public navIsVisible = true;

    @ViewChild(DejaSplitterComponent)
    private splitter: DejaSplitterComponent;
    private media$sub: Subscription;
    private media$ = new Subject();

    constructor(private changeDetectorRef: ChangeDetectorRef, media: ObservableMedia) {
        this.media$sub = Observable.merge(media.asObservable(), this.media$)
            .do(() => this.navIsVisible = !media.isActive('xs') && !media.isActive('sm') )
            .do(() => this.changeDetectorRef.markForCheck())
            .delay(1)
            .subscribe(() => this.splitter.refresh());
    }

    public ngOnDestroy() {
        this.media$sub.unsubscribe();
    }

    public ngOnInit() {
        this.media$.next();
    }
}
