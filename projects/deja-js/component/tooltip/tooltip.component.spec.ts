/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MediaService } from '@deja-js/component/core';
import { delay, of, timer } from 'rxjs';

import { MockMediaService } from '../overlay/test/MockMediaService';
import { DejaTooltipModule } from './index';
import { DejaTooltipDirective } from './tooltip.directive';

@Component({
    selector: 'DejaTooltipContainerComponent',
    // eslint-disable-next-line @angular-eslint/component-max-inline-declarations
    template: `<span deja-tooltip="test-tt" [tooltip-model]="toolTipModel" (tooltip-show)="tooltipVisible = true">Un message "success"</span>
                <deja-tooltip name="test-tt" *ngIf="tooltipVisible" (hide)="tooltipVisible = false">
                    <ng-template #tooltipTemplate let-model>
                        <div *ngIf="!!model" id="tooltip">
                            {{model.text}}
                        </div>
                    </ng-template>
                </deja-tooltip>`
})
class DejaTooltipContainerComponent {
    public static TOOLTIPTEXT = 'Je suis un deja-tooltip';

    public static TOOLTIPMODEL1 = {
        text: DejaTooltipContainerComponent.TOOLTIPTEXT
    };

    // Asynchronous model
    public static TOOLTIPMODEL2$ = of({
        text: `${DejaTooltipContainerComponent.TOOLTIPTEXT}_$`
    }).pipe(delay(50));

    // Promised model
    // eslint-disable-next-line rxjs/no-topromise
    public static TOOLTIPMODEL3 = DejaTooltipContainerComponent.TOOLTIPMODEL2$.toPromise();

    public toolTipModel: unknown;
    public tooltipVisible = false;

    public constructor() {
        this.toolTipModel = DejaTooltipContainerComponent.TOOLTIPMODEL1;
    }
}

const sendMouseEvent = (element: EventTarget, type: string, pageX: number, pageY: number, buttons = 0): void => {
    const eventInit = (): MouseEventInit => ({
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
        relatedTarget: element
    } as MouseEventInit);
    const event = new MouseEvent(type, eventInit());
    element.dispatchEvent(event);
};

describe('DejaTooltipComponent', () => {
    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [
                DejaTooltipContainerComponent
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                DejaTooltipModule
            ],
            providers: [
                {
                    provide: MediaService,
                    useClass:
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
        void expect(tooltipInstance).toBeTruthy();
    });

    it('should open the tooltip when the mouse still over and close after leave', done => {
        const fixture = TestBed.createComponent(DejaTooltipContainerComponent);
        fixture.detectChanges();

        void fixture.whenRenderingDone().then(() => {
            const tooltipDirectiveDebugElement = fixture.debugElement.query(By.directive(DejaTooltipDirective));
            sendMouseEvent(tooltipDirectiveDebugElement.nativeElement, 'mouseenter', 0, 0);
            fixture.detectChanges();

            timer(1000).subscribe(() => {
                fixture.detectChanges();
                void fixture.whenStable().then(() => {
                    const tooltip = document.querySelector<HTMLElement>('#tooltip');
                    void expect(tooltip?.innerText).toEqual(DejaTooltipContainerComponent.TOOLTIPTEXT);

                    sendMouseEvent(tooltipDirectiveDebugElement.nativeElement, 'mousemove', 0, 200);
                    fixture.detectChanges();
                    // eslint-disable-next-line rxjs/no-nested-subscribe
                    timer(500).subscribe(() => {
                        fixture.detectChanges();
                        void fixture.whenStable().then(() => {
                            const tooltip2 = document.querySelector('#tooltip');
                            void expect(tooltip2).toBeNull();
                            done();
                        });
                    });
                });
            });
        });
    });

    it('should open the tooltip when the mouse still over with an asynchronous model', done => {
        const fixture = TestBed.createComponent(DejaTooltipContainerComponent);
        fixture.detectChanges();

        return fixture.whenRenderingDone().then(() => {
            const containerComponent = fixture.componentInstance;
            containerComponent.toolTipModel = DejaTooltipContainerComponent.TOOLTIPMODEL2$;
            fixture.detectChanges();

            const tooltipDirectiveDebugElement = fixture.debugElement.query(By.directive(DejaTooltipDirective));
            sendMouseEvent(tooltipDirectiveDebugElement.nativeElement, 'mouseenter', 0, 0);
            fixture.detectChanges();

            timer(1000).subscribe(() => {
                fixture.detectChanges();
                void fixture.whenStable().then(() => {
                    fixture.detectChanges();
                    const tooltip = document.querySelector<HTMLElement>('#tooltip');
                    void expect(tooltip?.innerText).toEqual(`${DejaTooltipContainerComponent.TOOLTIPTEXT}_$`);
                    done();
                });
            });
        });
    });

    it('should open the tooltip when the mouse still over with a promised model', done => {
        const fixture = TestBed.createComponent(DejaTooltipContainerComponent);
        fixture.detectChanges();

        void fixture.whenRenderingDone().then(() => {
            const containerComponent = fixture.componentInstance;
            containerComponent.toolTipModel = DejaTooltipContainerComponent.TOOLTIPMODEL3;
            fixture.detectChanges();

            const tooltipDirectiveDebugElement = fixture.debugElement.query(By.directive(DejaTooltipDirective));
            sendMouseEvent(tooltipDirectiveDebugElement.nativeElement, 'mouseenter', 0, 0);
            fixture.detectChanges();

            timer(1000).subscribe(() => {
                fixture.detectChanges();
                void fixture.whenStable().then(() => {
                    fixture.detectChanges();
                    const tooltip = document.querySelector<HTMLElement>('#tooltip');
                    void expect(tooltip?.innerText).toEqual(`${DejaTooltipContainerComponent.TOOLTIPTEXT}_$`);
                    done();
                });
            });
        });
    });
});
