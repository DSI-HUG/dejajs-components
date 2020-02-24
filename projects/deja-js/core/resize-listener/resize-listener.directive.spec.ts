/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { timer } from 'rxjs';
import { ResizeListenerModule } from './index';
import { DejaResizeListenerDirective } from './resize-listener.directive';

@Component({
    encapsulation: ViewEncapsulation.None,
    template: `<div id="fill" resize-listener (sizeChanged)="sizeChanged.emit()"></div>`,
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
    @Output() public sizeChanged = new EventEmitter<Event>();
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

    it('should receive an event when the div is resized', (done) => {
        const fixture = TestBed.createComponent(ResizeListenerContainerComponent);
        fixture.detectChanges();
        const instance = fixture.debugElement.componentInstance as ResizeListenerContainerComponent;
        const debugElement = fixture.debugElement.query(By.directive(DejaResizeListenerDirective));
        const divElement = debugElement.nativeElement as HTMLDivElement;

        const spy = spyOn(instance.sizeChanged, 'emit').and.callThrough();

        divElement.style.height = '200px';
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            timer(100).subscribe(() => {
                expect(spy).toHaveBeenCalledTimes(1);
                done();
            });
        });
    });
});
