/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ISortInfos, SortOrder} from '../../../src/common/core';
import {IDejaGridColumn} from '../../../src/component/data-grid/data-grid-column/data-grid-column';
import {IntervalBoundary} from '../../../src/component/interval-selector/interval-selector-boundary.model';
import {IntervalSelectorService} from '../../../src/component/interval-selector/interval-selector.service';
import { Event, events as mockEvents } from './events.mock';

@Component({
    selector: 'deja-interval-selector-demo',
    styleUrls: ['./interval-selector-demo.scss'],
    templateUrl: './interval-selector-demo.html',
    providers: [IntervalSelectorService],
})
export class DejaIntervalSelectorDemoComponent implements OnInit, OnDestroy {

    public tabIndex = 1;
    public lowerDate: Date;
    public upperDate: Date;
    public events: Event[] = mockEvents;
    public eventsColumns = [
        {
            label: 'Date',
            name: 'date',
            width: '150px',
            useCellTemplate: true,
        },
        {
            label: 'Event',
            name: 'label',
            width: '150px',
            useCellTemplate: true,
        },
    ] as IDejaGridColumn[];

    private _isAlive = true;
    private ascendingDateOrdering = false;

    constructor(public intervalSelectorService: IntervalSelectorService) {
        // descending ordered events
        this.intervalSelectorService.addInterval('events', (event1: Event, event2: Event) => {
            return this.treeEventCompareFunction(event1, event2);
        });
        // grid ordered events
        this.intervalSelectorService.addInterval('gridEvents', (event1: Event, event2: Event) => {
            return this.gridEventCompareFunction(this, event1, event2);
        });
        Observable.from(this.intervalSelectorService.intervalSelectionChanged$).takeWhile(() => this._isAlive)
            .subscribe((boundary:IntervalBoundary) => {
                const event:Event = boundary.model as Event;
                if (event) {
                    if (boundary.intervalId === 'events') {
                        if (!boundary.openingBoundary) {
                            if (boundary.selected) {
                                this.lowerDate = event.date;
                            } else {
                                this.lowerDate = null;
                            }
                        } else {
                            if (boundary.selected) {
                                this.upperDate = event.date;
                            } else {
                                this.upperDate = null;
                            }
                        }
                    } else if (boundary.intervalId === 'gridEvents') {
                        if (!boundary.openingBoundary) {
                            if (boundary.selected) {
                                if (this.ascendingDateOrdering) {
                                    this.upperDate = event.date;
                                } else {
                                    this.lowerDate = event.date;
                                }
                            } else {
                                if (this.ascendingDateOrdering) {
                                    this.upperDate = null;
                                } else {
                                    this.lowerDate = null;
                                }
                            }
                        } else {
                            if (boundary.selected) {
                                if (this.ascendingDateOrdering) {
                                    this.lowerDate = event.date;
                                } else {
                                    this.upperDate = event.date;
                                }
                            } else {
                                if (this.ascendingDateOrdering) {
                                    this.lowerDate = null;
                                } else {
                                    this.upperDate = null;
                                }
                            }
                        }
                    }
                }
            });
    }

    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
        this._isAlive = false;
    }

    public gridSortChanged(sortInfo: ISortInfos) {
        if (sortInfo.name === 'date') {
            this.intervalSelectorService.changeIntervalEnabledStatus('gridEvents', true);
            const isAscendingDateOrdering = sortInfo.order === SortOrder.ascending;
            if (this.ascendingDateOrdering !== isAscendingDateOrdering) {
                this.intervalSelectorService.resetIntervalSelectionById('gridEvents');
                this.ascendingDateOrdering = isAscendingDateOrdering;
                this.intervalSelectorService.addInterval('gridEvents', (event1: Event, event2: Event) => {
                    return this.gridEventCompareFunction(this, event1, event2);
                });
            }
        } else {
            this.intervalSelectorService.changeIntervalEnabledStatus('gridEvents', false);
        }
    }

    public treeMultiselectModelChange(events: Event[]) {
        if (events && events.length>1) {
            events = events.sort((event1: Event, event2: Event) => {
                return this.treeEventCompareFunction(event1, event2);
            });
            const lowerEvent: Event = events[0];
            const upperEvent: Event = events[events.length-1];
            this.intervalSelectorService.selectBoundaries('events', lowerEvent, upperEvent);
        }
    }

    public gridEventsSelectedChange(events: Event[]) {
        if (events) {
            events.sort((event1: Event, event2: Event) => {
                return this.gridEventCompareFunction(this, event1, event2);
            });
            if (events.length>1) {
                const lowerEvent: Event = events[0];
                const upperEvent: Event = events[events.length-1];
                this.intervalSelectorService.selectBoundaries('gridEvents', lowerEvent, upperEvent);
            }
        }
    }

    private treeEventCompareFunction(event1: Event, event2: Event) {
        // événements triés descendant
        if (event1.date.getTime()<event2.date.getTime()) {
            // pour indiquer que c'est après
            return -1;
        } else if (event1.date.getTime()>event2.date.getTime()) {
            // pour indiquer que c'est avant
            return 1;
        }
        return 0;
    }

    private gridEventCompareFunction(self: any, event1: Event, event2: Event) {
        if (!self.ascendingDateOrdering) {
            // descending ordered events
            if (event1.date.getTime()<event2.date.getTime()) {
                return -1;
            } else if (event1.date.getTime()>event2.date.getTime()) {
                return 1;
            }
        } else {
            // descending ordered events
            if (event1.date.getTime()<event2.date.getTime()) {
                return 1;
            } else if (event1.date.getTime()>event2.date.getTime()) {
                return -1;
            }
        }
        return 0;
    }
}
