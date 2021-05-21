/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DejaChipsModule } from '.';
import { DejaChipsComponent } from './chips.component';

describe('DejaChipsComponent', () => {
    let component: DejaChipsComponent;
    let fixture: ComponentFixture<DejaChipsComponent>;

    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            imports: [
                DejaChipsModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DejaChipsComponent);
        component = fixture.componentInstance;
    }));

    it('should create the component', () => {
        void expect(component).toBeTruthy();
    });

    it('should init with string items', () => {
        component.items = ['Angular', 'Java', 'Oracle'];
        fixture.detectChanges();

        // TODO: should find a better way to query (with a class for example)
        const spans = fixture.debugElement.queryAll(By.css('span > span'));
        void expect(spans.length).toEqual(3);
        void expect((spans[0].nativeElement as HTMLElement).innerHTML).toEqual('Angular');
        void expect((spans[1].nativeElement as HTMLElement).innerHTML).toEqual('Java');
        void expect((spans[2].nativeElement as HTMLElement).innerHTML).toEqual('Oracle');
    });

    it('should init with object items and textField', () => {
        component.items = [
            { id: 1, name: 'Peter', speciality: 'Java' },
            { id: 2, name: 'Paul', speciality: 'C++' },
            { id: 3, name: 'Jack', speciality: 'HTML5' }
        ];
        component.textField = 'name';
        fixture.detectChanges();

        let spans = fixture.debugElement.queryAll(By.css('span > span'));
        void expect(spans.length).toEqual(3);
        void expect((spans[0].nativeElement as HTMLElement).innerHTML).toEqual('Peter');
        void expect((spans[1].nativeElement as HTMLElement).innerHTML).toEqual('Paul');
        void expect((spans[2].nativeElement as HTMLElement).innerHTML).toEqual('Jack');

        component.textField = 'speciality';
        fixture.detectChanges();

        spans = fixture.debugElement.queryAll(By.css('span > span'));
        void expect(spans.length).toEqual(3);
        void expect((spans[0].nativeElement as HTMLElement).innerHTML).toEqual('Java');
        void expect((spans[1].nativeElement as HTMLElement).innerHTML).toEqual('C++');
        void expect((spans[2].nativeElement as HTMLElement).innerHTML).toEqual('HTML5');
    });

    it('should init with object items and displayName', () => {
        component.items = [
            { id: 1, name: 'Peter', displayName: 'Pierre', speciality: 'Java' },
            { id: 2, name: 'Paul', displayName: 'Paul', speciality: 'C++' },
            { id: 3, name: 'Jack', displayName: 'Jacques', speciality: 'HTML5' }
        ];
        fixture.detectChanges();

        const spans = fixture.debugElement.queryAll(By.css('span > span'));
        void expect(spans.length).toEqual(3);
        void expect((spans[0].nativeElement as HTMLElement).innerHTML).toEqual('Pierre');
        void expect((spans[1].nativeElement as HTMLElement).innerHTML).toEqual('Paul');
        void expect((spans[2].nativeElement as HTMLElement).innerHTML).toEqual('Jacques');
    });

    it('should init with object items and toString()', () => {
        component.items = [
            { id: 1, name: 'Peter', toString: (): string => 'Pietro', speciality: 'Java' },
            { id: 2, name: 'Paul', toString: (): string => 'Paolo', speciality: 'C++' },
            { id: 3, name: 'Jack', toString: (): string => 'Giacomo', speciality: 'HTML5' }
        ];
        fixture.detectChanges();

        const spans = fixture.debugElement.queryAll(By.css('span > span'));
        void expect(spans.length).toEqual(3);
        void expect((spans[0].nativeElement as HTMLElement).innerHTML).toEqual('Pietro');
        void expect((spans[1].nativeElement as HTMLElement).innerHTML).toEqual('Paolo');
        void expect((spans[2].nativeElement as HTMLElement).innerHTML).toEqual('Giacomo');
    });

    // How to test the use of close button ?
    // We can test that a click event, call the onClose function
    // We can also test onClose function
    it('should call onClose when we click on closeButton', () => {
        component.items = ['Angular', 'Java', 'Oracle'];
        fixture.detectChanges();

        const closeButtons = fixture.debugElement.queryAll(By.css('#close-button'));
        void expect(closeButtons.length).toEqual(3);

        const spy = spyOn(component, 'onClose');

        const clickEvent = new MouseEvent('click');
        (closeButtons[1].nativeElement as HTMLElement).dispatchEvent(clickEvent);

        void expect(spy).toHaveBeenCalledWith(clickEvent, 'Java', 1);
    });

    it('onClose should remove item and emit an IDejaChipsComponentCloseEvent', () => {
        component.items = ['Angular', 'Java', 'Oracle'];
        fixture.detectChanges();

        const spy = spyOn(component.close, 'emit');

        const indexToRemove = 2;
        const itemToRemove = component.items[indexToRemove];
        const clickEvent = new MouseEvent('click');
        component.onClose(clickEvent, itemToRemove, indexToRemove);

        void expect(component.items.length).toBe(2);
        void expect(spy).toHaveBeenCalled();
    });

    it('should not display closeButton if component is readOnly', () => {
        component.items = ['Angular', 'Java', 'Oracle'];
        component.readonly = true;
        fixture.detectChanges();

        const closeButtons = fixture.debugElement.queryAll(By.css('i'));
        void expect(closeButtons.length).toEqual(0);
    });

    it('should not display closeButton if disabled equals boolean true', () => {
        component.items = ['Angular', 'Java', 'Oracle'];
        component.disabled = true;
        fixture.detectChanges();

        const closeButtons = fixture.debugElement.queryAll(By.css('i'));
        void expect(closeButtons.length).toEqual(0);
    });

    it('should not display closeButton if disabled equals "true"', () => {
        component.items = ['Angular', 'Java', 'Oracle'];
        component.disabled = 'true';
        fixture.detectChanges();

        const closeButtons = fixture.debugElement.queryAll(By.css('i'));
        void expect(closeButtons.length).toEqual(0);
    });
});
