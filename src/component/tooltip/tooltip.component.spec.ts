/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of as observableOf, timer as observableTimer } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MediaService } from '../../common/core/media/media.service';
import { MockMediaService } from '../overlay/test/MockMediaService';
import { DejaTooltipModule } from './index';
import { DejaTooltipDirective } from './tooltip.directive';

@Component({
    template: `<span deja-tooltip="test-tt" [tooltip-model]="toolTipModel" (tooltip-show)="tooltipVisible = true">Un message "success"</span>
                <deja-tooltip name="test-tt" *ngIf="tooltipVisible" (hide)="tooltipVisible = false">
                    <ng-template #tooltipTemplate let-model>
                        <div *ngIf="!!model" id="tooltip">
                            {{model.text}}
                        </div>
                    </ng-template>
                </deja-tooltip>`,
})
class DejaTooltipContainerComponent {
    public static toolTipText = 'Je suis un deja-tooltip';

    public static toolTipModel1 = {
        text: DejaTooltipContainerComponent.toolTipText,
    };

    // Asynchronous model
    public static toolTipModel2 = observableOf({
        text: `${DejaTooltipContainerComponent.toolTipText}_$`,
    }).pipe(delay(50));

    // Promised model
    public static toolTipModel3 = DejaTooltipContainerComponent.toolTipModel2.toPromise();

    public toolTipModel: any;
    public tooltipVisible = false;

    constructor() {
        this.toolTipModel = DejaTooltipContainerComponent.toolTipModel1;
    }
}

const sendMouseEvent = (element: EventTarget, type: string, pageX: number, pageY: number, buttons = 0) => {
    const eventInit = () => ({
        bubbles: true,
        cancelable: (type !== 'mousemove'),
        view: document.defaultView,
        altKey: false,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
        button: 0,
        buttons: buttons,
        clientX: pageX,
        clientY: pageY,
        relatedTarget: element,
    } as MouseEventInit);
    const event = new MouseEvent(type, eventInit());
    element.dispatchEvent(event);
};

describe('DejaTooltipComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DejaTooltipContainerComponent,
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                DejaTooltipModule,
            ],
            providers: [
                {
                    provide: MediaService, useClass:
                        MockMediaService
                }
            ]
        }).compileComponents();
    }));

    it('should create the component', () => {
        const fixture = TestBed.createComponent(DejaTooltipContainerComponent);
        fixture.detectChanges();
        const tooltipDebugElement = fixture.debugElement.query(By.directive(DejaTooltipDirective));
        const tooltipInstance = tooltipDebugElement.componentInstance as DejaTooltipDirective;
        expect(tooltipInstance).toBeTruthy();
    });

    it('should open the tooltip when the mouse still over and close after leave', async (done) => {
        const fixture = TestBed.createComponent(DejaTooltipContainerComponent);
        fixture.detectChanges();

        fixture.whenRenderingDone().then(() => {
            const tooltipDirectiveDebugElement = fixture.debugElement.query(By.directive(DejaTooltipDirective));
            sendMouseEvent(tooltipDirectiveDebugElement.nativeElement, 'mouseenter', 0, 0);
            fixture.detectChanges();

            observableTimer(1000).subscribe(() => {
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    const tooltip = document.querySelector('#tooltip') as HTMLElement;
                    expect(tooltip && tooltip.innerText).toEqual(DejaTooltipContainerComponent.toolTipText);

                    sendMouseEvent(tooltipDirectiveDebugElement.nativeElement, 'mousemove', 0, 200);
                    fixture.detectChanges();
                    observableTimer(500).subscribe(() => {
                        fixture.detectChanges();
                        fixture.whenStable().then(() => {
                            const tooltip2 = document.querySelector('#tooltip') as HTMLElement;
                            expect(tooltip2).toBeNull();
                            done();
                        });
                    });
                });
            });
        });
    });

    it('should open the tooltip when the mouse still over with an asynchronous model', async (done) => {
        const fixture = TestBed.createComponent(DejaTooltipContainerComponent);
        fixture.detectChanges();

        fixture.whenRenderingDone().then(() => {
            const containerComponent = fixture.componentInstance;
            containerComponent.toolTipModel = DejaTooltipContainerComponent.toolTipModel2;
            fixture.detectChanges();

            const tooltipDirectiveDebugElement = fixture.debugElement.query(By.directive(DejaTooltipDirective));
            sendMouseEvent(tooltipDirectiveDebugElement.nativeElement, 'mouseenter', 0, 0);
            fixture.detectChanges();

            observableTimer(1000).subscribe(() => {
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();
                    const tooltip = document.querySelector('#tooltip') as HTMLElement;
                    expect(tooltip && tooltip.innerText).toEqual(`${DejaTooltipContainerComponent.toolTipText}_$`);
                    done();
                });
            });
        });
    });

    it('should open the tooltip when the mouse still over with a promised model', async (done) => {
        const fixture = TestBed.createComponent(DejaTooltipContainerComponent);
        fixture.detectChanges();

        fixture.whenRenderingDone().then(() => {
            const containerComponent = fixture.componentInstance;
            containerComponent.toolTipModel = DejaTooltipContainerComponent.toolTipModel3;
            fixture.detectChanges();

            const tooltipDirectiveDebugElement = fixture.debugElement.query(By.directive(DejaTooltipDirective));
            sendMouseEvent(tooltipDirectiveDebugElement.nativeElement, 'mouseenter', 0, 0);
            fixture.detectChanges();

            observableTimer(1000).subscribe(() => {
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();
                    const tooltip = document.querySelector('#tooltip') as HTMLElement;
                    expect(tooltip && tooltip.innerText).toEqual(`${DejaTooltipContainerComponent.toolTipText}_$`);
                    done();
                });
            });
        });
    });
});
