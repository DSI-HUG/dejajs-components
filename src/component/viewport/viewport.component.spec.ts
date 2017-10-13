/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoConflictStyleCompatibilityMode } from '@angular/material';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { IViewPortItem, ViewportMode, ViewPortService } from '../../common/core/item-list/viewport.service';
import { DejaViewPortModule } from './index';
import { DejaViewPortComponent } from './viewport.component';

// TODO
// EnsureVisible

@Component({
    template: `<deja-viewport style="height: 120px;width: 1000px;" [items]="items">
                    <ng-template #itemTemplate let-item>
                        Item {{ item.label }}
                    </ng-template>
                </deja-viewport>`,
})
class DejaViewportContainerComponent {
    public items = Array.from({ length: 100 }, (_v, k) => ({
        label: k,
        size: 10 + k % 20,
    } as IViewPortItem));
}

@Component({
    template: `<deja-viewport style="height: 800px;width: 100px;" [models]="models" viewportMode="auto">
                    <ng-template #itemTemplate let-item>
                        <span style="white-space: normal;">
                            {{ item.model }}
                        </span>
                    </ng-template>
                </deja-viewport>`,
})
class DejaViewportAutoContainerComponent {
    public models: string[];

    constructor() {
        const loremIpsum = `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`;
        const variableLength = loremIpsum.length - 10;
        this.models = Array.from({ length: 1000 }, (_v, k) => {
            const length = 10 + Math.floor((k % 100) / 100 * variableLength);
            return loremIpsum.substr(0, length);
        });
    }
}

describe('DejaViewPortComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DejaViewportContainerComponent,
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                NoConflictStyleCompatibilityMode,
                DejaViewPortModule,
            ],
        }).compileComponents();
    }));

    const noop = () => { };

    const observeViewPort$ = (fixture: ComponentFixture<DejaViewportContainerComponent>, elementCount: number, expectedBeforeSize: number, expectedAfterSize: number, expectedViewPortSize: number, expectedViewPortStartIndex: number, expectedViewPortEndIndex: number) => {
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortService = viewPortDebugElement.injector.get(ViewPortService);

        return Observable.from(viewPortService.viewPortResult$)
            .do(() => fixture.detectChanges())
            .filter((result) => result.viewPortSize > 0)
            .do((result) => {
                const listitems = fixture.debugElement.queryAll(By.css('deja-viewport > #viewport-wrapper > .listitem'));
                expect(listitems.length).toEqual(elementCount);
                expect(result.beforeSize).toEqual(expectedBeforeSize);
                expect(result.afterSize).toEqual(expectedAfterSize);
                expect(result.viewPortSize).toEqual(expectedViewPortSize);
                expect(result.startIndex).toEqual(expectedViewPortStartIndex);
                expect(result.endIndex).toEqual(expectedViewPortEndIndex);
            });
    };

    it('should create the component', async(() => {
        const fixture = TestBed.createComponent(DejaViewportContainerComponent);
        fixture.detectChanges();
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance;
        expect(viewPortInstance).toBeTruthy();
    }));

    it('should render horizontally', async(() => {
        const fixture = TestBed.createComponent(DejaViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;

        observeViewPort$(fixture, 51, 0, 980, 1020, 0, 50).subscribe(() => {
            // tslint:disable-next-line:no-string-literal
            expect(viewPortInstance['clientSize']).toEqual(1000);
        });

        viewPortInstance.viewportMode = 'fixed';
        viewPortInstance.itemSize = 20;
        viewPortInstance.direction = 'horizontal';
        fixture.detectChanges();
    }));

    it('should render all items width viewport disabled', async(() => {
        const fixture = TestBed.createComponent(DejaViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;

        observeViewPort$(fixture, 100, 0, 1860, 140, 0, 99).subscribe(noop);

        viewPortInstance.viewportMode = 'disabled';
        expect(ViewportMode.disabled === viewPortInstance.viewportMode as any);

        viewPortInstance.itemSize = 20;
        fixture.detectChanges();
    }));

    it('should render with viewport fixed with an item size of 20', async(() => {
        const fixture = TestBed.createComponent(DejaViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;

        observeViewPort$(fixture, 7, 0, 1860, 140, 0, 6).subscribe(() => noop);

        viewPortInstance.viewportMode = 'fixed';
        expect(ViewportMode.fixed === viewPortInstance.viewportMode as any);

        viewPortInstance.itemSize = 20;
        fixture.detectChanges();
    }));

    it('should render with viewport fixed with an item size of 35', async(() => {
        const fixture = TestBed.createComponent(DejaViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;

        observeViewPort$(fixture, 5, 0, 3325, 175, 0, 4).subscribe(() => noop);

        viewPortInstance.viewportMode = 'fixed';
        viewPortInstance.itemSize = 35;
        fixture.detectChanges();
    }));

    it('should render with viewport variable at position 0', async(() => {
        const fixture = TestBed.createComponent(DejaViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;

        observeViewPort$(fixture, 9, 0, 1824, 126, 0, 8).subscribe(() => noop);

        viewPortInstance.viewportMode = 'variable';
        expect(ViewportMode.variable === viewPortInstance.viewportMode as any);

        fixture.detectChanges();
    }));

    it('should render with viewport variable at position 90', async(() => {
        const fixture = TestBed.createComponent(DejaViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;
        const viewPortService = viewPortDebugElement.injector.get(ViewPortService);

        observeViewPort$(fixture, 8, 75, 1719, 156, 6, 13).subscribe(noop);

        viewPortService.scrollPosition$.next(90);
        viewPortInstance.viewportMode = 'variable';
        fixture.detectChanges();
    }));

    it('should render with viewport variable at position 1200', async(() => {
        const fixture = TestBed.createComponent(DejaViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;
        const viewPortService = viewPortDebugElement.injector.get(ViewPortService);

        observeViewPort$(fixture, 9, 1191, 615, 144, 62, 70).subscribe(noop);

        viewPortService.scrollPosition$.next(1200);
        viewPortInstance.viewportMode = 'variable';
        fixture.detectChanges();
    }));

    it('should render with buttons instead scrollbar at position 0', async(() => {
        const fixture = TestBed.createComponent(DejaViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;
        viewPortInstance.scrollingStyle = 'buttons';
        fixture.detectChanges();

        observeViewPort$(fixture, 5, 0, 1900, 100, 0, 4).subscribe(() => noop);

        viewPortInstance.viewportMode = 'fixed';
        viewPortInstance.itemSize = 20;
        fixture.detectChanges();
    }));
});

describe('DejaViewPortComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DejaViewportAutoContainerComponent,
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                NoConflictStyleCompatibilityMode,
                DejaViewPortModule,
            ],
        }).compileComponents();
    }));

    const noop = () => { };

    const observeViewPort$ = (fixture: ComponentFixture<DejaViewportAutoContainerComponent>, elementCount: number, expectedBeforeSize: number, expectedAfterSize: number, expectedViewPortSize: number, expectedViewPortStartIndex: number, expectedViewPortEndIndex: number) => {
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortService = viewPortDebugElement.injector.get(ViewPortService);

        return Observable.from(viewPortService.viewPortResult$)
            .do(() => fixture.detectChanges())
            .filter((result) => result.visibleItems && result.visibleItems.length && result.visibleItems[0].size > 0) // items must be sized
            .do((result) => {
                const listitems = fixture.debugElement.queryAll(By.css('deja-viewport > #viewport-wrapper > .listitem'));
                expect(listitems.length).toEqual(elementCount);
                expect(result.beforeSize).toEqual(expectedBeforeSize);
                expect(result.afterSize).toEqual(expectedAfterSize);
                expect(result.viewPortSize).toEqual(expectedViewPortSize);
                expect(result.startIndex).toEqual(expectedViewPortStartIndex);
                expect(result.endIndex).toEqual(expectedViewPortEndIndex);
            });
    };

    it('should create the component', async(() => {
        const fixture = TestBed.createComponent(DejaViewportAutoContainerComponent);
        fixture.detectChanges();
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;
        expect(viewPortInstance).toBeTruthy();
        expect(ViewportMode.auto === viewPortInstance.viewportMode as ViewportMode);
    }));

    it('should render with viewport auto at position 0', async(() => {
        const fixture = TestBed.createComponent(DejaViewportAutoContainerComponent);
        observeViewPort$(fixture, 12, 0, 40726, 864, 0, 11).subscribe(noop);
        fixture.detectChanges();
    }));

    it('should render with viewport auto at position 10000', async(() => {
        const fixture = TestBed.createComponent(DejaViewportAutoContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortService = viewPortDebugElement.injector.get(ViewPortService);

        observeViewPort$(fixture, 2, 9960, 42030, 1026, 249, 250).subscribe(noop);

        viewPortService.scrollPosition$.next(10000);
        fixture.detectChanges();
    }));

    it('should render with viewport auto at position 16500', async(() => {
        const fixture = TestBed.createComponent(DejaViewportAutoContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortService = viewPortDebugElement.injector.get(ViewPortService);
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;

        observeViewPort$(fixture, 6, 16480, 26532, 954, 412, 417).subscribe(() => {
            // tslint:disable-next-line:no-string-literal
            expect(viewPortInstance['clientSize']).toEqual(800);
        });

        viewPortService.scrollPosition$.next(16500);
        fixture.detectChanges();
    }));

    it('should able to refresh the viewport and return the same values', async(() => {
        const fixture = TestBed.createComponent(DejaViewportAutoContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortService = viewPortDebugElement.injector.get(ViewPortService);
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;
        let pass = 0;

        observeViewPort$(fixture, 2, 9960, 42030, 1026, 249, 250).subscribe(() => {
            if (++pass === 1) {
                // tslint:disable-next-line:no-string-literal
                viewPortInstance.refreshViewPort(viewPortInstance['_items'][249], true);
            } else if (++pass === 2) {
                // tslint:disable-next-line:no-string-literal
                viewPortInstance.refreshViewPort(viewPortInstance['_items'][250], true);
            } else if (++pass === 3) {
                // tslint:disable-next-line:no-string-literal
                viewPortInstance.refreshViewPort(viewPortInstance['_items'][0], true);
            }
        });

        viewPortService.scrollPosition$.next(10000);
        viewPortInstance.refreshViewPort();
        fixture.detectChanges();
    }));

    it('should able to refresh the viewport when the window is resized or scroll', async(() => {
        const fixture = TestBed.createComponent(DejaViewportAutoContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortElement = viewPortDebugElement.nativeElement;
        const viewPortService = viewPortDebugElement.injector.get(ViewPortService);
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;
        const wrapperDebugElement = fixture.debugElement.query(By.css('deja-viewport > #viewport-wrapper'));
        const wrapperElement = wrapperDebugElement.nativeElement as HTMLElement;
        let pass = 0;
        let elementCount = 2;
        let expectedBeforeSize = 9960;
        let expectedAfterSize = 42030;
        let expectedViewPortSize = 1026;
        let expectedViewPortStartIndex = 249;
        let expectedViewPortEndIndex = 250;

        Observable.from(viewPortService.viewPortResult$)
            .do(() => fixture.detectChanges())
            .filter((result) => result.visibleItems && result.visibleItems.length && result.visibleItems[0].size > 0) // items must be sized
            .subscribe((result) => {
                const listitems = fixture.debugElement.queryAll(By.css('deja-viewport > #viewport-wrapper > .listitem'));
                expect(listitems.length).toEqual(elementCount);
                expect(result.beforeSize).toEqual(expectedBeforeSize);
                expect(result.afterSize).toEqual(expectedAfterSize);
                expect(result.viewPortSize).toEqual(expectedViewPortSize);
                expect(result.startIndex).toEqual(expectedViewPortStartIndex);
                expect(result.endIndex).toEqual(expectedViewPortEndIndex);
                if (++pass === 1) {
                    elementCount = 23;
                    expectedBeforeSize = 9996;
                    expectedAfterSize = 29080;
                    expectedViewPortSize = 836;
                    expectedViewPortStartIndex = 250;
                    expectedViewPortEndIndex = 272;
                    viewPortElement.style.width = '1500px';
                    const event = new CustomEvent('resize', {});
                    window.dispatchEvent(event);
                    viewPortInstance.refresh();
                } else if (pass === 2) {
                    elementCount = 28;
                    expectedBeforeSize = 996;
                    expectedAfterSize = 37752;
                    expectedViewPortSize = 806;
                    expectedViewPortStartIndex = 26;
                    expectedViewPortEndIndex = 53;
                    wrapperElement.scrollTop = 1000;
                    const event = new CustomEvent('scroll', {});
                    wrapperElement.dispatchEvent(event);
                }
            });

        viewPortService.scrollPosition$.next(10000);
        fixture.detectChanges();
    }));
});
