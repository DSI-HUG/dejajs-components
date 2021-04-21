/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IViewPortItem } from '@deja-js/component/core';
import { ViewPortService } from '@deja-js/component/core';
import { delay, filter } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';

import { DejaViewPortModule } from './index';
import { DejaViewPortComponent } from './viewport.component';

@Component({
    selector: 'DejaViewportContainerComponent',
    template: `<deja-viewport style="height: 120px;width: 1000px;" [items]="items">
                    <ng-template #itemTemplate let-item>Item {{ item.label }}</ng-template>
                </deja-viewport>`
})
class DejaViewportContainerComponent {
    public items = Array.from({ length: 100 }, (_v, k) => ({
        label: k,
        size: 10 + k % 20
    } as IViewPortItem));
}

@Component({
    selector: 'DejaViewportAutoContainerComponent',
    // eslint-disable-next-line @angular-eslint/component-max-inline-declarations
    template: `<deja-viewport style="height: 800px;width: 100px" [models]="models" viewportMode="auto">
                    <ng-template #itemTemplate let-item>
                        <div style="width:100%;overflow:hidden;position:relative;" [style.height.px]="item.model">
                            Size is {{ item.model }}px
                        </div>
                    </ng-template>
                </deja-viewport>`
})
class DejaViewportAutoContainerComponent {
    public models: number[];

    public constructor() {
        this.models = Array.from({ length: 1000 }, (_v, k) => 20 + Math.floor(4 * k % 10));
    }
}

describe('DejaViewPortComponent', () => {
    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [
                DejaViewportContainerComponent
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                DejaViewPortModule
            ]
        }).compileComponents();
    }));

    const observeViewPort$ = (fixture: ComponentFixture<DejaViewportContainerComponent>, elementCount: number, expectedBeforeSize: number, expectedAfterSize: number, expectedViewPortSize: number, expectedViewPortStartIndex: number, expectedViewPortEndIndex: number) => {
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortService = viewPortDebugElement.injector.get(ViewPortService);

        return viewPortService.viewPortResult$.pipe(
            delay(1),
            tap(() => fixture.detectChanges()),
            delay(1),
            filter(result => result.viewPortSize > 0),
            debounceTime(100),
            tap(result => {
                const listitems = fixture.debugElement.queryAll(By.css('deja-viewport > #viewport-wrapper > .listitem'));
                void expect(listitems.length).toEqual(elementCount);
                void expect(result.beforeSize).toEqual(expectedBeforeSize);
                void expect(result.afterSize).toEqual(expectedAfterSize);
                void expect(result.viewPortSize).toEqual(expectedViewPortSize);
                void expect(result.startIndex).toEqual(expectedViewPortStartIndex);
                void expect(result.endIndex).toEqual(expectedViewPortEndIndex);
            }));
    };

    it('should create the component', waitForAsync(() => {
        const fixture = TestBed.createComponent(DejaViewportContainerComponent);
        fixture.detectChanges();
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance;
        void expect(viewPortInstance).toBeTruthy();
    }));

    it('should render horizontally', done => {
        const fixture = TestBed.createComponent(DejaViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;

        observeViewPort$(fixture, 51, 0, 980, 1020, 0, 50).subscribe(() => {
            // tslint:disable-next-line:no-string-literal
            void expect(viewPortInstance.clientSize).toEqual(1000);
            done();
        });

        viewPortInstance.viewportMode = 'fixed';
        viewPortInstance.itemSize = 20;
        viewPortInstance.direction = 'horizontal';
        fixture.detectChanges();
    });

    it('should render all items width viewport disabled', done => {
        const fixture = TestBed.createComponent(DejaViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;

        observeViewPort$(fixture, 100, 0, 0, 1800, 0, 6).subscribe(() => {
            done();
        });

        viewPortInstance.viewportMode = 'disabled';
        void expect('disabled' === viewPortInstance.viewportMode as never);

        viewPortInstance.itemSize = 20;
        fixture.detectChanges();
    });

    it('should render with viewport fixed with an item size of 20', done => {
        const fixture = TestBed.createComponent(DejaViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;

        observeViewPort$(fixture, 7, 0, 1860, 140, 0, 6).subscribe(() => {
            done();
        });

        viewPortInstance.viewportMode = 'fixed';
        void expect('fixed' === viewPortInstance.viewportMode as never);

        viewPortInstance.itemSize = 20;
        fixture.detectChanges();
    });

    it('should render with viewport fixed with an item size of 35', done => {
        const fixture = TestBed.createComponent(DejaViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;

        observeViewPort$(fixture, 5, 0, 3325, 175, 0, 4).subscribe(() => {
            done();
        });

        viewPortInstance.viewportMode = 'fixed';
        viewPortInstance.itemSize = 35;
        fixture.detectChanges();
    });

    it('should render with viewport variable at position 0', done => {
        const fixture = TestBed.createComponent(DejaViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;

        observeViewPort$(fixture, 9, 0, 1824, 126, 0, 8).subscribe(() => {
            done();
        });

        viewPortInstance.viewportMode = 'variable';
        void expect('variable' === viewPortInstance.viewportMode as never);

        fixture.detectChanges();
    });

    it('should render with viewport variable at position 90', done => {
        const fixture = TestBed.createComponent(DejaViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;
        const viewPortService = viewPortDebugElement.injector.get(ViewPortService);

        observeViewPort$(fixture, 8, 75, 1719, 156, 6, 13).subscribe(() => {
            done();
        });

        viewPortService.scrollPosition$.next(90);
        viewPortInstance.viewportMode = 'variable';
        fixture.detectChanges();
    });

    it('should render with viewport variable at position 1200', done => {
        const fixture = TestBed.createComponent(DejaViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;
        const viewPortService = viewPortDebugElement.injector.get(ViewPortService);

        observeViewPort$(fixture, 9, 1191, 615, 144, 62, 70).subscribe(() => {
            done();
        });

        viewPortService.scrollPosition$.next(1200);
        viewPortInstance.viewportMode = 'variable';
        fixture.detectChanges();
    });

    it('should render with buttons instead scrollbar at position 0', done => {
        const fixture = TestBed.createComponent(DejaViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;
        viewPortInstance.scrollingStyle = 'buttons';
        fixture.detectChanges();

        observeViewPort$(fixture, 5, 0, 1900, 100, 0, 4).subscribe(() => {
            done();
        });

        viewPortInstance.viewportMode = 'fixed';
        viewPortInstance.itemSize = 20;
        fixture.detectChanges();
    });

    it('should able to refresh the viewport and return the same values', done => {
        const fixture = TestBed.createComponent(DejaViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;

        observeViewPort$(fixture, 4, 3840, 0, 160, 96, 99).subscribe(() => {
            done();
        });

        viewPortInstance.scrollPos = 10000;
        viewPortInstance.refresh();
        viewPortInstance.refreshViewPort();
        fixture.detectChanges();
    });
});

describe('DejaViewPortComponent', () => {
    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [
                DejaViewportAutoContainerComponent
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                DejaViewPortModule
            ]
        }).compileComponents();
    }));

    const observeViewPort$ = (fixture: ComponentFixture<DejaViewportAutoContainerComponent>, elementCount: number, expectedBeforeSize: number, expectedAfterSize: number, expectedViewPortSize: number, expectedViewPortStartIndex: number, expectedViewPortEndIndex: number) => {
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortService = viewPortDebugElement.injector.get(ViewPortService);

        return viewPortService.viewPortResult$.pipe(
            debounceTime(10),
            tap(() => fixture.detectChanges()),
            filter(result => result.visibleItems?.length && result.listSize > 0), // items must be sized
            tap(result => {
                const listitems = fixture.debugElement.queryAll(By.css('deja-viewport > #viewport-wrapper > .listitem'));
                void expect(listitems.length).toEqual(elementCount);
                void expect(result.beforeSize).toEqual(expectedBeforeSize);
                void expect(result.afterSize).toEqual(expectedAfterSize);
                void expect(result.viewPortSize).toEqual(expectedViewPortSize);
                void expect(result.startIndex).toEqual(expectedViewPortStartIndex);
                void expect(result.endIndex).toEqual(expectedViewPortEndIndex);
            }));
    };

    it('should create the component', waitForAsync(() => {
        const fixture = TestBed.createComponent(DejaViewportAutoContainerComponent);
        fixture.detectChanges();
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;
        void expect(viewPortInstance).toBeTruthy();
        void expect('auto' === viewPortInstance.viewportMode);
    }));

    it('should render with viewport auto at position 0', done => {
        const fixture = TestBed.createComponent(DejaViewportAutoContainerComponent);
        observeViewPort$(fixture, 21, 0, 39160, 840, 0, 20).subscribe(() => {
            done();
        });
        fixture.detectChanges();
    });

    it('should render with viewport auto at position 10000', done => {
        const fixture = TestBed.createComponent(DejaViewportAutoContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortService = viewPortDebugElement.injector.get(ViewPortService);

        observeViewPort$(fixture, 22, 9960, 29160, 880, 249, 270).subscribe(() => {
            done();
        });

        viewPortService.scrollPosition$.next(10000);
        fixture.detectChanges();
    });

    it('should render with viewport auto at position 16500', done => {
        const fixture = TestBed.createComponent(DejaViewportAutoContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortService = viewPortDebugElement.injector.get(ViewPortService);
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;

        observeViewPort$(fixture, 21, 16480, 22680, 840, 412, 432).subscribe(() => {
            // tslint:disable-next-line:no-string-literal
            void expect(viewPortInstance.clientSize).toEqual(800);
            done();
        });

        viewPortService.scrollPosition$.next(16500);
        fixture.detectChanges();
    });

    it('should able to refresh the viewport when the window is resized or scroll', done => {
        const fixture = TestBed.createComponent(DejaViewportAutoContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortElement = viewPortDebugElement.nativeElement;
        const viewPortService = viewPortDebugElement.injector.get(ViewPortService);
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;
        const wrapperDebugElement = fixture.debugElement.query(By.css('deja-viewport > #viewport-wrapper'));
        const wrapperElement = wrapperDebugElement.nativeElement as HTMLElement;
        let pass = 0;
        let elementCount = 22;
        let expectedBeforeSize = 9960;
        let expectedAfterSize = 29160;
        let expectedViewPortSize = 880;
        let expectedViewPortStartIndex = 249;
        let expectedViewPortEndIndex = 270;

        viewPortService.viewPortResult$.pipe(
            debounceTime(10),
            tap(() => fixture.detectChanges()),
            filter(result => result.visibleItems?.length && result.listSize > 0) // items must be sized
        ).subscribe(result => {
            const listitems = fixture.debugElement.queryAll(By.css('deja-viewport > #viewport-wrapper > .listitem'));
            void expect(listitems.length).toEqual(elementCount);
            void expect(result.beforeSize).toEqual(expectedBeforeSize);
            void expect(result.afterSize).toEqual(expectedAfterSize);
            void expect(result.viewPortSize).toEqual(expectedViewPortSize);
            void expect(result.startIndex).toEqual(expectedViewPortStartIndex);
            void expect(result.endIndex).toEqual(expectedViewPortEndIndex);
            let customEvent: CustomEvent<unknown>;
            switch (++pass) {
                case 1:
                    elementCount = 29;
                    expectedBeforeSize = 9986;
                    expectedAfterSize = 28840;
                    expectedViewPortSize = 820;
                    expectedViewPortStartIndex = 250;
                    expectedViewPortEndIndex = 278;
                    viewPortElement.style.width = '1500px';
                    customEvent = new CustomEvent('resize', {});
                    window.dispatchEvent(customEvent);
                    viewPortInstance.refresh();
                    break;

                case 2:
                    elementCount = 22;
                    expectedBeforeSize = 960;
                    expectedAfterSize = 37806;
                    expectedViewPortSize = 880;
                    expectedViewPortStartIndex = 24;
                    expectedViewPortEndIndex = 45;
                    wrapperElement.scrollTop = 1000;
                    customEvent = new CustomEvent('scroll', {});
                    wrapperElement.dispatchEvent(customEvent);
                    break;
                default:
                    done();
            }
        });

        viewPortService.scrollPosition$.next(10000);
        fixture.detectChanges();
    });

    it('should refresh view port if windows is resized', done => {
        const fixture = TestBed.createComponent(DejaViewportAutoContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortService = viewPortDebugElement.injector.get(ViewPortService);
        let pass = 0;

        viewPortService.viewPortResult$.pipe(
            debounceTime(100)
        ).subscribe(vp => {
            // Bind view port
            fixture.detectChanges();
            void expect(vp.beforeSize).toEqual(0);
            void expect(vp.afterSize).toBeGreaterThan(0);
            void expect(vp.viewPortSize).toBeGreaterThan(0);
            void expect(vp.startIndex).toEqual(0);
            void expect(vp.endIndex).toBeGreaterThan(0);
            let event: Event;
            switch (++pass) {
                case 1:
                    event = new Event('resize', {});
                    window.dispatchEvent(event);
                    break;

                default:
                    done();
                    break;

            }
        });

        fixture.detectChanges();
    });
});
