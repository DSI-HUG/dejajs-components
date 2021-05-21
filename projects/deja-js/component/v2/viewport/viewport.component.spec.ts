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
import { Observable } from 'rxjs';
import { debounceTime, delay, filter, take, tap } from 'rxjs/operators';

import { ViewPortModule } from './index';
import { ViewPortComponent } from './viewport.component';
import { ViewPort, ViewPortItem, ViewPortService } from './viewport.service';

@Component({
    selector: 'ViewportContainerComponent',
    template: `<viewport style="position:relative;height:120px;width:500px;" [items]="items">
                    <ng-template #viewPortItemTemplate let-item>Item {{ item.label }}</ng-template>
                </viewport>`
})
class ViewportContainerComponent {
    public items = Array.from({ length: 100 }, (_v, k) => ({
        label: k,
        size: 10 + k % 20
    } as ViewPortItem<unknown>));
}

@Component({
    selector: 'ViewportAutoContainerComponent',
    // eslint-disable-next-line @angular-eslint/component-max-inline-declarations
    template: `<viewport style="position:relative;height:120px;width:500px" [models]="models" viewPortMode="auto">
                    <ng-template #viewPortItemTemplate let-item>
                        <div style="width:100%;overflow:hidden;position:relative;" [style.height.px]="item.model">
                            Size is {{ item.model }}px
                        </div>
                    </ng-template>
                </viewport>`
})
class ViewportAutoContainerComponent {
    public models: number[];

    public constructor() {
        this.models = Array.from({ length: 1000 }, (_v, k) => 20 + Math.floor(4 * k % 10));
    }
}

describe('ViewPortComponent', () => {
    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [
                ViewportContainerComponent
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                ViewPortModule
            ]
        }).compileComponents();
    }));

    const observeViewPort$ = (fixture: ComponentFixture<ViewportContainerComponent>, elementCount: number, expectedBeforeSize: number, expectedAfterSize: number, expectedViewPortSize: number, expectedViewPortStartIndex: number, expectedViewPortEndIndex: number): Observable<ViewPort<unknown>> => {
        const viewPortDebugElement = fixture.debugElement.query(By.directive(ViewPortComponent));
        const viewPortService = viewPortDebugElement.injector.get(ViewPortService);

        return viewPortService.viewPort$.pipe(
            delay(1),
            tap(() => fixture.detectChanges(true)),
            debounceTime(10),
            filter(result => result.viewPortSize > 0),
            take(1),
            tap(result => {
                const listitems = fixture.debugElement.queryAll(By.css('viewport > .viewport-wrapper > .listitem'));
                void expect(listitems.length).toEqual(elementCount);
                void expect(result.beforeSize).toEqual(expectedBeforeSize);
                void expect(result.afterSize).toEqual(expectedAfterSize);
                void expect(result.viewPortSize).toEqual(expectedViewPortSize);
                void expect(result.startIndex).toEqual(expectedViewPortStartIndex);
                void expect(result.endIndex).toEqual(expectedViewPortEndIndex);
            })
        );
    };

    it('should create the component', waitForAsync(() => {
        const fixture = TestBed.createComponent(ViewportContainerComponent);
        fixture.detectChanges();
        const viewPortDebugElement = fixture.debugElement.query(By.directive(ViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as HTMLElement;
        void expect(viewPortInstance).toBeTruthy();
    }));

    it('should render horizontally', done => {
        const fixture = TestBed.createComponent(ViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(ViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as ViewPortComponent<unknown>;

        observeViewPort$(fixture, 26, 0, 1480, 520, 0, 25).subscribe(() => {
            done();
        });

        viewPortInstance.viewPortMode = 'fixed';
        viewPortInstance.itemSize = 20;
        viewPortInstance.direction = 'horizontal';
        fixture.detectChanges();
    });

    it('should render all items width viewport disabled', done => {
        const fixture = TestBed.createComponent(ViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(ViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as ViewPortComponent<unknown>;

        observeViewPort$(fixture, 100, 0, 0, 1800, 0, 6).subscribe(() => {
            done();
        });

        viewPortInstance.viewPortMode = 'disabled';
        void expect('disabled' === viewPortInstance.viewPortMode);

        viewPortInstance.itemSize = 20;
        fixture.detectChanges();
    });

    it('should render with viewport fixed with an item size of 20', done => {
        const fixture = TestBed.createComponent(ViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(ViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as ViewPortComponent<unknown>;

        observeViewPort$(fixture, 7, 0, 1860, 140, 0, 6).subscribe(() => {
            done();
        });

        viewPortInstance.viewPortMode = 'fixed';
        void expect('fixed' === viewPortInstance.viewPortMode);

        viewPortInstance.itemSize = 20;
        fixture.detectChanges();
    });

    it('should render with viewport fixed with an item size of 35', done => {
        const fixture = TestBed.createComponent(ViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(ViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as ViewPortComponent<unknown>;

        observeViewPort$(fixture, 5, 0, 3325, 175, 0, 4).subscribe(() => {
            done();
        });

        viewPortInstance.viewPortMode = 'fixed';
        viewPortInstance.itemSize = 35;
        fixture.detectChanges();
    });

    it('should render with viewport variable at position 0', done => {
        const fixture = TestBed.createComponent(ViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(ViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as ViewPortComponent<unknown>;

        observeViewPort$(fixture, 9, 0, 1824, 126, 0, 8).subscribe(() => {
            done();
        });

        viewPortInstance.viewPortMode = 'variable';
        void expect('variable' === viewPortInstance.viewPortMode);

        fixture.detectChanges();
    });

    it('should render with viewport variable at position 90', done => {
        const fixture = TestBed.createComponent(ViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(ViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as ViewPortComponent<unknown>;
        const viewPortService = viewPortDebugElement.injector.get(ViewPortService);

        observeViewPort$(fixture, 8, 75, 1719, 156, 6, 13).subscribe(() => {
            done();
        });

        viewPortService.scrollPosition$.next(90);
        viewPortInstance.viewPortMode = 'variable';
        fixture.detectChanges();
    });

    it('should render with viewport variable at position 1200', done => {
        const fixture = TestBed.createComponent(ViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(ViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as ViewPortComponent<unknown>;
        const viewPortService = viewPortDebugElement.injector.get(ViewPortService);

        observeViewPort$(fixture, 9, 1191, 615, 144, 62, 70).subscribe(() => {
            done();
        });

        viewPortService.scrollPosition$.next(1200);
        viewPortInstance.viewPortMode = 'variable';
        fixture.detectChanges();
    });

    it('should render with buttons instead scrollbar at position 0', done => {
        const fixture = TestBed.createComponent(ViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(ViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as ViewPortComponent<unknown>;
        viewPortInstance.scrollingStyle = 'buttons';
        fixture.detectChanges();

        observeViewPort$(fixture, 5, 0, 1900, 100, 0, 4).subscribe(() => {
            done();
        });

        viewPortInstance.viewPortMode = 'fixed';
        viewPortInstance.itemSize = 20;
        fixture.detectChanges();
    });

    it('should able to refresh the viewport and return the same values', done => {
        const fixture = TestBed.createComponent(ViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(ViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as ViewPortComponent<unknown>;

        observeViewPort$(fixture, 4, 3840, 0, 160, 96, 99).subscribe(() => {
            done();
        });

        viewPortInstance.scrollPos = 10000;
        viewPortInstance.refreshViewPort();
        fixture.detectChanges();
    });
});

describe('ViewPortComponent', () => {
    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [
                ViewportAutoContainerComponent
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                ViewPortModule
            ]
        }).compileComponents();
    }));

    const observeViewPort$ = (fixture: ComponentFixture<ViewportAutoContainerComponent>, elementCount: number, expectedBeforeSize: number, expectedAfterSize: number, expectedViewPortSize: number, expectedViewPortStartIndex: number, expectedViewPortEndIndex: number): Observable<ViewPort<unknown>> => {
        const viewPortDebugElement = fixture.debugElement.query(By.directive(ViewPortComponent));
        const viewPortService = viewPortDebugElement.injector.get(ViewPortService);

        return viewPortService.viewPort$.pipe(
            delay(1),
            tap(() => fixture.detectChanges(true)),
            debounceTime(10),
            filter(result => result.visibleItems?.length && result.listSize > 0), // items must be sized
            take(1),
            tap(result => {
                const listitems = fixture.debugElement.queryAll(By.css('viewport > .viewport-wrapper > .listitem'));
                void expect(listitems.length).toEqual(elementCount);
                void expect(result.beforeSize).toEqual(expectedBeforeSize);
                void expect(result.afterSize).toEqual(expectedAfterSize);
                void expect(result.viewPortSize).toEqual(expectedViewPortSize);
                void expect(result.startIndex).toEqual(expectedViewPortStartIndex);
                void expect(result.endIndex).toEqual(expectedViewPortEndIndex);
            })
        );
    };

    it('should create the component', waitForAsync(() => {
        const fixture = TestBed.createComponent(ViewportAutoContainerComponent);
        fixture.detectChanges();
        const viewPortDebugElement = fixture.debugElement.query(By.directive(ViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as ViewPortComponent<unknown>;
        void expect(viewPortInstance).toBeTruthy();
        void expect('auto' === viewPortInstance.viewPortMode);
    }));

    it('should render with viewport auto at position 0', done => {
        const fixture = TestBed.createComponent(ViewportAutoContainerComponent);
        observeViewPort$(fixture, 5, 0, 39800, 134, 0, 4).subscribe(() => {
            done();
        });
        fixture.detectChanges();
    });

    it('should render with viewport auto at position 10000', done => {
        const fixture = TestBed.createComponent(ViewportAutoContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(ViewPortComponent));
        const viewPortService = viewPortDebugElement.injector.get(ViewPortService);

        observeViewPort$(fixture, 6, 9986, 29760, 174, 250, 255).subscribe(() => {
            done();
        });

        viewPortService.scrollPosition$.next(10000);
        fixture.detectChanges();
    });

    it('should render with viewport auto at position 16500', done => {
        const fixture = TestBed.createComponent(ViewportAutoContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(ViewPortComponent));
        const viewPortService = viewPortDebugElement.injector.get(ViewPortService);
        const viewPortElement = fixture.debugElement.query(By.css('.viewport-wrapper')).nativeElement as HTMLElement;

        observeViewPort$(fixture, 6, 16480, 23280, 176, 412, 417).subscribe(() => {
            // tslint:disable-next-line:no-string-literal
            void expect(viewPortElement.clientHeight).toEqual(120);
            done();
        });

        viewPortService.scrollPosition$.next(16500);
        fixture.detectChanges();
    });

    it('should able to refresh the viewport when the window is resized or scroll', done => {
        const fixture = TestBed.createComponent(ViewportAutoContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(ViewPortComponent));
        const viewPortElement = viewPortDebugElement.nativeElement as HTMLElement;
        const viewPortService = viewPortDebugElement.injector.get(ViewPortService);
        const wrapperDebugElement = fixture.debugElement.query(By.css('viewport > .viewport-wrapper'));
        const wrapperElement = wrapperDebugElement.nativeElement as HTMLElement;
        let pass = 0;

        viewPortService.viewPort$.pipe(
            delay(10),
            tap(() => fixture.detectChanges()),
            debounceTime(100),
            filter(result => result.visibleItems?.length && result.listSize > 0), // items must be sized
            take(3)
        ).subscribe(result => {
            const listitems = fixture.debugElement.queryAll(By.css('viewport > .viewport-wrapper > .listitem'));
            let customEvent: CustomEvent<unknown>;
            switch (pass++) {
                case 0:
                    void expect(listitems.length).toEqual(5);
                    void expect(result.beforeSize).toEqual(9960);
                    void expect(result.afterSize).toEqual(29840);
                    void expect(result.viewPortSize).toEqual(200);
                    void expect(result.startIndex).toEqual(249);
                    void expect(result.endIndex).toEqual(253);
                    viewPortElement.style.width = '1500px';
                    customEvent = new CustomEvent('resize', {});
                    window.dispatchEvent(customEvent);
                    break;

                case 1:
                    void expect(listitems.length).toEqual(6);
                    void expect(result.beforeSize).toEqual(9986);
                    void expect(result.afterSize).toEqual(29760);
                    void expect(result.viewPortSize).toEqual(174);
                    void expect(result.startIndex).toEqual(250);
                    void expect(result.endIndex).toEqual(255);
                    wrapperElement.scroll({ top: 1000 });
                    break;

                case 2:
                    void expect(listitems.length).toEqual(5);
                    void expect(result.beforeSize).toEqual(960);
                    void expect(result.afterSize).toEqual(38760);
                    void expect(result.viewPortSize).toEqual(200);
                    void expect(result.startIndex).toEqual(24);
                    void expect(result.endIndex).toEqual(28);
                    done();
                    break;
                default:
                    done();
            }
        });

        viewPortService.scrollPosition$.next(10000);
        fixture.detectChanges();
    });

    it('should refresh view port if windows is resized', done => {
        const fixture = TestBed.createComponent(ViewportAutoContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(ViewPortComponent));
        const viewPortService = viewPortDebugElement.injector.get(ViewPortService);
        let pass = 0;

        viewPortService.viewPort$.pipe(
            delay(1),
            tap(() => fixture.detectChanges(true)),
            debounceTime(10)
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
