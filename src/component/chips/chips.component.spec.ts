/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DejaChipsComponent } from './chips.component';

describe('DejaChipsComponent', () => {
    let component: DejaChipsComponent;
    let fixture: ComponentFixture<DejaChipsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DejaChipsComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DejaChipsComponent);
        component = fixture.componentInstance;
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should init with string items', () => {
        component.items = ['Angular 2', 'Java', 'Oracle'];
        fixture.detectChanges();

        // TODO: should find a better way to query (with a class for example)
        const spans = fixture.debugElement.queryAll(By.css('span > span'));
        expect(spans.length).toEqual(3);
        expect(spans[0].nativeElement.innerHTML).toEqual('Angular 2');
        expect(spans[1].nativeElement.innerHTML).toEqual('Java');
        expect(spans[2].nativeElement.innerHTML).toEqual('Oracle');
    });

    it('should init with object items and textField', () => {
        component.items = [
            {id: 1, name: 'Peter', speciality: 'Java'},
            {id: 2, name: 'Paul', speciality: 'C++'},
            {id: 3, name: 'Jack', speciality: 'HTML5'}
        ];
        component.textField = 'name';
        fixture.detectChanges();

        let spans = fixture.debugElement.queryAll(By.css('span > span'));
        expect(spans.length).toEqual(3);
        expect(spans[0].nativeElement.innerHTML).toEqual('Peter');
        expect(spans[1].nativeElement.innerHTML).toEqual('Paul');
        expect(spans[2].nativeElement.innerHTML).toEqual('Jack');

        component.textField = 'speciality';
        fixture.detectChanges();

        spans = fixture.debugElement.queryAll(By.css('span > span'));
        expect(spans.length).toEqual(3);
        expect(spans[0].nativeElement.innerHTML).toEqual('Java');
        expect(spans[1].nativeElement.innerHTML).toEqual('C++');
        expect(spans[2].nativeElement.innerHTML).toEqual('HTML5');
    });

    it('should init with object items and displayName', () => {
        component.items = [
            {id: 1, name: 'Peter', displayName: 'Pierre', speciality: 'Java'},
            {id: 2, name: 'Paul', displayName: 'Paul', speciality: 'C++'},
            {id: 3, name: 'Jack', displayName: 'Jacques', speciality: 'HTML5'}
        ];
        fixture.detectChanges();

        const spans = fixture.debugElement.queryAll(By.css('span > span'));
        expect(spans.length).toEqual(3);
        expect(spans[0].nativeElement.innerHTML).toEqual('Pierre');
        expect(spans[1].nativeElement.innerHTML).toEqual('Paul');
        expect(spans[2].nativeElement.innerHTML).toEqual('Jacques');
    });

    it('should init with object items and toString()', () => {
        component.items = [
            {id: 1, name: 'Peter', toString: () => 'Pietro', speciality: 'Java', },
            {id: 2, name: 'Paul', toString: () => 'Paolo', speciality: 'C++'},
            {id: 3, name: 'Jack', toString: () => 'Giacomo', speciality: 'HTML5'}
        ];
        fixture.detectChanges();

        const spans = fixture.debugElement.queryAll(By.css('span > span'));
        expect(spans.length).toEqual(3);
        expect(spans[0].nativeElement.innerHTML).toEqual('Pietro');
        expect(spans[1].nativeElement.innerHTML).toEqual('Paolo');
        expect(spans[2].nativeElement.innerHTML).toEqual('Giacomo');
    });

    // How to test the use of close button ?
    // We can test that a click event, call the onClose function
    // We can also test onClose function
    it('should call onClose when we click on closeButton', () => {
        component.items = ['Angular 2', 'Java', 'Oracle'];
        fixture.detectChanges();

        const closeButtons = fixture.debugElement.queryAll(By.css('i'));
        expect(closeButtons.length).toEqual(3);

        const spy = spyOn(component, 'onClose');

        closeButtons[1].nativeElement.click();
        expect(spy).toHaveBeenCalledWith('Java', 1);
    });

    it('onClose should remove item and emit an IDejaChipsComponentCloseEvent', () => {
        component.items = ['Angular 2', 'Java', 'Oracle'];
        fixture.detectChanges();

        const spy = spyOn(component.close, 'emit');
        component.onClose('Oracle', 2);

        expect(component.items.length).toBe(2);
        expect(spy).toHaveBeenCalled();
    });

    it('should not display closeButton if component is readOnly', () => {
        component.items = ['Angular 2', 'Java', 'Oracle'];
        component.readonly = true;
        fixture.detectChanges();

        const closeButtons = fixture.debugElement.queryAll(By.css('i'));
        expect(closeButtons.length).toEqual(0);
    });

    it('should not display closeButton if disabled equals boolean true', () => {
        component.items = ['Angular 2', 'Java', 'Oracle'];
        component.disabled = true;
        fixture.detectChanges();

        const closeButtons = fixture.debugElement.queryAll(By.css('i'));
        expect(closeButtons.length).toEqual(0);
    });

    it('should not display closeButton if disabled equals "true"', () => {
        component.items = ['Angular 2', 'Java', 'Oracle'];
        component.disabled = 'true';
        fixture.detectChanges();

        const closeButtons = fixture.debugElement.queryAll(By.css('i'));
        expect(closeButtons.length).toEqual(0);
    });
});
