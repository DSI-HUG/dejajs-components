/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { ResizeListenerModule } from './index';
import { DejaResizeListenerDirective } from './resize-listener.directive';

@Component({
    encapsulation: ViewEncapsulation.None,
    template: `<div id="fill" resize-listener (sizeChanged)="sizechanged($event)" ></div>`,
    styles: [`
    #fill {
        left: 0;
        top: 0;
        width: 100px;
        height: 100px;
        postion: absolute;
        background-color: #888;
    }`]
})
class ResizeListenerContainerComponent {
    public constructor(private elementRef: ElementRef) {
    }

    public sizechanged(_event: Event) {
        const element = this.elementRef.nativeElement as HTMLDivElement;
        const div = element.getElementsByTagName('div')[0];
        div.style.width = '200px';
    }
}

describe('DejaResizeListenerDirective', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ResizeListenerContainerComponent,
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                ResizeListenerModule,
            ]
        }).compileComponents();
    }));

    it('should create the component', async(() => {
        const fixture = TestBed.createComponent(ResizeListenerContainerComponent);
        fixture.detectChanges();
        const debugElement = fixture.debugElement.query(By.directive(DejaResizeListenerDirective));
        const instance = debugElement.componentInstance;
        expect(instance).toBeTruthy();
    }));

    it('should receive an event when the div is resized', async(() => {
        const fixture = TestBed.createComponent(ResizeListenerContainerComponent);
        const debugElement = fixture.debugElement.query(By.directive(DejaResizeListenerDirective)).nativeElement as HTMLElement;

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(debugElement.clientHeight).toBe(100);
            expect(debugElement.clientWidth).toBe(100);
            debugElement.style.height = '200px';
            fixture.detectChanges();
            expect(debugElement.clientHeight).toBe(200);
            Observable.timer(100)
                .first()
                .subscribe(() => {
                    // Check div resized by the event
                    fixture.detectChanges();
                    expect(debugElement.clientWidth).toBe(200);
                });
        });
    }));
});
