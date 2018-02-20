/* tslint:disable:no-unused-variable */
import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { RouterLinkStubDirective, RouterOutletStubComponent } from '../testing/router-stubs';
import { AppComponent } from './app.component';

@Component({ selector: 'app-header', template: '' })
class HeaderStubComponent { }

class RouterStub {
    // events: Observable<Event> = Observable.of<Event>();
}

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                HeaderStubComponent,
                RouterOutletStubComponent
            ],
            providers: [
                { provide: Router, useClass: RouterStub }
            ]
        });
    }));

    it('should create', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

});
