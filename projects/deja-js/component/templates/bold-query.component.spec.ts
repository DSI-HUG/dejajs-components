/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DejaBoldQueryComponent } from './bold-query.component';

describe('DejaBoldQueryComponent', () => {

    let comp: DejaBoldQueryComponent;
    let fixture: ComponentFixture<DejaBoldQueryComponent>;
    let highlightOpenTag: string;
    const highlightEndTag = '</span>';

    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [
                DejaBoldQueryComponent
            ],
            imports: [
                CommonModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DejaBoldQueryComponent);
        comp = fixture.componentInstance; // Component test instance
        highlightOpenTag = `<span class="${comp.highlightClassName}">`;
    }));

    it('should create the component', waitForAsync(() => {
        void expect(comp).toBeTruthy();
    }));

    it('should highlight \'Grande\' search term', () => {
        comp.value = 'Grande Bretagne';
        comp.query = 'Grande';
        fixture.detectChanges();
        const result = `${highlightOpenTag}Grande${highlightEndTag} Bretagne`;
        void expect(comp.content).toEqual(result);
    });

    it('should highlight all \'e\'', () => {
        comp.value = 'Grande Bretagne';
        comp.query = 'e';
        fixture.detectChanges();
        const result = `Grand${highlightOpenTag}e${highlightEndTag} Br${highlightOpenTag}e${highlightEndTag}tagn${highlightOpenTag}e${highlightEndTag}`;
        void expect(comp.content).toEqual(result);
    });

    it('should highlight \'g\' only at the beginning of word', () => {
        comp.value = 'Grande Bretagne';
        comp.query = 'g';
        comp.atTheBeginningOfWordOnly = true;
        fixture.detectChanges();
        const result = `${highlightOpenTag}G${highlightEndTag}rande Bretagne`;
        void expect(comp.content).toEqual(result);
    });

    it('should highlight \'g\' only once', () => {
        comp.value = 'Grande Bretagne';
        comp.query = 'g';
        comp.firstOccurenceOnly = true;
        fixture.detectChanges();
        const result = `${highlightOpenTag}G${highlightEndTag}rande Bretagne`;
        void expect(comp.content).toEqual(result);
    });

    it('should highlight \'e\' only once per word', () => {
        comp.value = 'Grande Bretagne';
        comp.query = 'e';
        comp.firstOccurencePerWordOnly = true;
        fixture.detectChanges();
        const result = `Grand${highlightOpenTag}e${highlightEndTag} Br${highlightOpenTag}e${highlightEndTag}tagne`;
        void expect(comp.content).toEqual(result);
    });

    it('should highlight \'g\' but not \'G\' (case sensitive)', () => {
        comp.value = 'Grande Bretagne';
        comp.query = 'g';
        comp.regexpOption = '';
        fixture.detectChanges();
        const result = `Grande Breta${highlightOpenTag}g${highlightEndTag}ne`;
        void expect(comp.content).toEqual(result);
    });

    it('should apply highlight class name \'customClass\'', () => {
        comp.value = 'Grande Bretagne';
        comp.query = 'Grande';
        comp.regexpOption = 'i';
        comp.highlightClassName = 'customClass';
        fixture.detectChanges();
        const divEl = (fixture.debugElement.nativeElement as HTMLElement).querySelector('div');
        void expect(divEl.innerHTML).toContain('<span class="customClass">');
        /*
                fixture.whenStable().then(()=> {
                    fixture.detectChanges();
                    const el = fixture.debugElement.query(By.css('.customClass'));
                    void expect(el).toBeTruthy();
                    void expect(el.name).toEqual('span');
                    done();
                });
        */
    });

    it('should escape special chars', done => {
        comp.value = 'test caractères spéciaux +?^${}()|[]\\. Fin test.';
        comp.query = 'test';
        comp.regexpOption = '';
        fixture.detectChanges();
        void fixture.whenStable().then(() => {
            const result = `${highlightOpenTag}test${highlightEndTag} caractères spéciaux +?^\${}()|[]\\. Fin ${highlightOpenTag}test${highlightEndTag}.`;
            void expect(comp.content).toEqual(result);
            done();
        });
    });

});
