/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DejaMarkdownComponent } from './markdown.component';

describe('DejaMarkdownComponent', () => {
    let component: DejaMarkdownComponent;
    let httpMock: HttpTestingController;
    let fixture: ComponentFixture<DejaMarkdownComponent>;

    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [
                DejaMarkdownComponent
            ],
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                ChangeDetectorRef
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DejaMarkdownComponent);
        component = fixture.componentInstance;
        httpMock = TestBed.inject(HttpTestingController);
    }));

    afterEach(() => {
        httpMock.verify();
    });

    it('should init component', () => {
        void expect(component).toBeTruthy();
        void expect(httpMock).toBeTruthy();
    });

    it('should do nothing if value is null', () => {
        component.value = null;
        fixture.detectChanges();
        void expect((fixture.nativeElement as HTMLElement).innerText).toEqual('');
    });

    it('should convert string value to html', () => {
        component.value = '<p class="pTest"><a href="www.google.ch">site google</a></p>';
        fixture.detectChanges();
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        void expect(((fixture.nativeElement as HTMLElement).querySelector('.pTest > a') as HTMLElement).innerText).toEqual('site google');
    });

    it('should call markForCheck when set value', () => {
        const spy = spyOn(component.changeDetectorRef, 'markForCheck');

        component.value = '<p class="pTest"><a href="www.google.ch">site google</a></p>';
        fixture.detectChanges();

        void expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get html from url', () => {
        component.url = 'aGoodUrl';
        httpMock.expectOne('aGoodUrl').flush('<h1>qwertzqwertz</h1>');

        // Must do detectChanges after httpMock.flush()
        fixture.detectChanges();
        void expect((fixture.nativeElement as HTMLElement).querySelector('h1').innerText).toEqual('qwertzqwertz');
    });

    it('should process http error', () => {
        component.url = 'aWrongUrl';
        httpMock.expectOne('aWrongUrl').error(new ErrorEvent('Error: some error'));

        fixture.detectChanges();
        // console.log(fixture.nativeElement.innerText);
        void expect((fixture.nativeElement as HTMLElement).innerText).toEqual('Http failure response for aWrongUrl: 0');
    });
});
