/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { TemplatePortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, OnDestroy, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInput, MatDatepickerModule, MatDateSelectionModel } from '@angular/material/datepicker';
import { Destroy } from '@deja-js/component/core';
import { DateOrDuration, DejaTimePickerComponent, DejaTimePickerModule } from '@deja-js/component/time-picker';
import { cloneDeep } from 'lodash-es';
import { delay, filter, map, takeUntil, tap } from 'rxjs';

import { DateTimeAdapter } from './date-time-adapter';


@Component({
    selector: 'datepicker-with-time',
    templateUrl: './datepicker-with-time.component.html',
    styleUrls: ['./datepicker-with-time.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        CommonModule,
        DejaTimePickerModule,
        MatButtonModule,
        MatDatepickerModule
    ]
})
export class DatepickerWithTimeComponent extends Destroy implements AfterViewInit, OnDestroy {
    @ViewChild(TemplateRef)
    private template?: TemplateRef<unknown>;

    @ViewChild(DejaTimePickerComponent, { read: ElementRef, static: false })
    private timePickerElement?: ElementRef<HTMLElement>;

    public time?: DateOrDuration;

    private portal?: TemplatePortal;

    private dateAdapter = inject(DateAdapter, { optional: true }) as unknown as DateTimeAdapter<unknown>;
    private datepicker = inject(MatDatepicker);
    private viewContainerRef = inject(ViewContainerRef);

    public constructor(
        private globalModel: MatDateSelectionModel<unknown, unknown>
    ) {
        super();

        this.datepicker.openedStream.pipe(
            tap(() => {
                const datePickerInput = this.datepicker.datepickerInput as MatDatepickerInput<Date>;
                this.time = datePickerInput.value || new Date();
            }),
            delay(1),
            map(() => this.timePickerElement?.nativeElement.parentElement),
            filter(Boolean),
            takeUntil(this.destroyed$)
        ).subscribe(datePickerContainer => {
            const containerRef = this.viewContainerRef.element.nativeElement as HTMLElement;
            datePickerContainer.setAttribute('layout', containerRef?.ownerDocument?.body?.clientHeight <= 500 ? 'h' : 'v');
        });
    }

    public onDateTimeClosed(): void {
        let date = cloneDeep(this.globalModel.selection) || new Date() as unknown;
        if (this.time) {
            let hours: number;
            let minutes: number;
            let seconds: number;
            if (this.time instanceof Date) {
                hours = this.time.getHours();
                minutes = this.time.getMinutes();
                seconds = this.time.getSeconds();
            } else {
                hours = this.time.hours || 0;
                minutes = this.time.minutes || 0;
                seconds = this.time.seconds || 0;
            }
            if (date instanceof Date) {
                date.setHours(hours, minutes, seconds);
            } else {
                date = this.dateAdapter?.setTime?.(date, hours, minutes, seconds);
            }
        }
        this.globalModel.updateSelection(date, this);
        const datePickerInput = this.datepicker.datepickerInput as MatDatepickerInput<unknown>;
        datePickerInput.writeValue(date);
    }

    public ngAfterViewInit(): void {
        if (this.template) {
            this.portal = new TemplatePortal(this.template, this.viewContainerRef);
        }

        if (this.portal) {
            this.datepicker.registerActions(this.portal);
        }
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();

        if (this.portal) {
            this.datepicker.removeActions(this.portal);
        }

        // Needs to be null checked since we initialize it in `ngAfterViewInit`.
        if (this.portal?.isAttached) {
            this.portal?.detach();
        }
    }
}
