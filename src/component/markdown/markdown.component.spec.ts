/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectorRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { DejaMarkdownComponent } from './markdown.component';

describe('DejaMarkdownComponent', () => {
    let component: DejaMarkdownComponent;
    let fixture: ComponentFixture<DejaMarkdownComponent>;
    let backend: MockBackend;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations : [DejaMarkdownComponent],
            providers: [
                ChangeDetectorRef,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (b: ConnectionBackend, options: BaseRequestOptions) => new Http(b, options),
                    deps: [MockBackend, BaseRequestOptions]
                  }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DejaMarkdownComponent);
        component = fixture.componentInstance;
        backend = TestBed.get(MockBackend);
    }));

    it('should init component', () => {
        expect(component).toBeTruthy();
    });

    it('should do nothing if value is null', () => {
        component.value = null;
        fixture.detectChanges();
        expect(fixture.nativeElement.innerText).toEqual('');
    });

    it('should convert string value to html', () => {
        component.value = '<p class="pTest"><a href="www.google.ch">site google</a></p>';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.pTest > a').innerText).toEqual('site google');
    });

    it('should call markForCheck when set value', () => {
        const spy = spyOn((component as any).changeDetectorRef, 'markForCheck');

        component.value = '<p class="pTest"><a href="www.google.ch">site google</a></p>';
        fixture.detectChanges();

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get html from url', () => {
        backend.connections.subscribe((connection: any) => {
            connection.mockRespond(new Response(<ResponseOptions>{
                body: '<h1>qwertzqwertz</h1>'
            }));
        });

        component.url = 'aGoodUrl';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('h1').innerText).toEqual('qwertzqwertz');
    });

    it('should process http error', () => {
        backend.connections.subscribe((connection: any) => {
            connection.mockError(new Error('some error'));
        });

        component.url = 'aWrongUrl';
        fixture.detectChanges();

        expect(fixture.nativeElement.innerText).toEqual('Error: some error');
    });

});
