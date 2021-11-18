/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MediaService } from '@deja-js/component/core';
import { DejaConnectionPositionPair } from '@deja-js/component/core/overlay';

import { DejaOverlayModule } from './index';
import { DejaOverlayComponent } from './overlay.component';
import { MockMediaService } from './test/MockMediaService';

@Component({
    selector: 'DejaOverlayContainerComponent',
    template: '<deja-overlay>Overlay content</deja-overlay>'
})
class DejaOverlayContainerComponent {}

describe('DejaOverlayComponent', () => {

    let comp: DejaOverlayComponent;
    let fixture: ComponentFixture<DejaOverlayContainerComponent>;

    const removeStaledOverlayContainersFunction = (): void => {
        // Remove any stale overlay containers from previous tests that didn't clean up correctly.
        const staleContainers = document.querySelectorAll('.cdk-overlay-container');
        // eslint-disable-next-line no-loops/no-loops
        for (let i = staleContainers.length - 1; i >= 0; i--) {
            staleContainers[i].parentNode.removeChild(staleContainers[i]);
        }
    };

    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [DejaOverlayContainerComponent], // declare the test component
            imports: [DejaOverlayModule],
            providers: [
                {
                    provide: MediaService,
                    useClass:
                        MockMediaService
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeAll(() => {
        removeStaledOverlayContainersFunction();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DejaOverlayContainerComponent);
        const overlayDebugElement = fixture.debugElement.query(By.directive(DejaOverlayComponent));
        comp = overlayDebugElement.componentInstance as DejaOverlayComponent;
    });

    afterEach(() => {
        fixture.destroy();
        removeStaledOverlayContainersFunction();
    });

    it('should use ownerElement if set', () => {
        fixture.detectChanges();
        comp.show(null);
        void expect(comp.ownerElement).toBeFalsy();
        const ownerElement: HTMLElement = document.createElement('div');
        ownerElement.setAttribute('id', 'overlayOwnerElement');
        document.body.appendChild(ownerElement);
        comp.ownerElement = ownerElement;
        fixture.detectChanges();
        const el = comp.overlayOrigin.elementRef.nativeElement as HTMLElement;
        void expect(el).toBe(ownerElement);
    });

    it('should not have cdk-overlay-backdrop element if isVisible is false', () => {
        fixture.detectChanges();
        void expect(comp.isVisible).toBeFalsy();
        const cdkBackdropContainerEl = document.querySelector('.cdk-overlay-backdrop');
        void expect(cdkBackdropContainerEl).toBeNull();
    });

    it('should have cdk-overlay-backdrop element initialized property if isVisible is true', () => {
        comp.isVisible = true;
        fixture.detectChanges();
        void expect(comp.isVisible).toBeTruthy();
        const cdkBackdropContainerEl = document.querySelector('.cdk-overlay-backdrop');
        void expect(cdkBackdropContainerEl).toBeTruthy();
        void expect(cdkBackdropContainerEl.classList.contains('cdk-overlay-transparent-backdrop')).toBeTruthy();
    });

    it('should have backdrop and container class names', () => {
        comp.overlayBackdropClass = 'cdk-overlay-opaque-backdrop';
        comp.isVisible = true;
        fixture.detectChanges();
        const cdkBackdropContainerEl = document.querySelector('.cdk-overlay-backdrop');
        const cdkOverlayContainerEl = document.querySelector('.cdk-overlay-container');
        void expect(cdkOverlayContainerEl.classList.contains('deja-overlay-container')).toBeTruthy();
        void expect(cdkBackdropContainerEl.classList.contains('cdk-overlay-opaque-backdrop')).toBeTruthy();
    });

    it('should have overlay custom class when is visible', () => {
        comp.overlayContainerClass = 'class1 class2';
        comp.isVisible = true;
        fixture.detectChanges();
        const cdkOverlayContainerEl = document.querySelector('.cdk-overlay-container');
        void expect(cdkOverlayContainerEl.classList.contains('deja-overlay-container')).toBeTruthy();
        void expect(cdkOverlayContainerEl.classList.contains('class1')).toBeTruthy();
        void expect(cdkOverlayContainerEl.classList.contains('class2')).toBeTruthy();
    });

    it('should not have overlay custom class when is not visible', () => {
        comp.overlayContainerClass = 'class1 class2';
        comp.isVisible = true;
        fixture.detectChanges();
        comp.isVisible = false;
        fixture.detectChanges();
        const cdkOverlayContainerEl = document.querySelector('.cdk-overlay-container');
        void expect(cdkOverlayContainerEl.classList.contains('deja-overlay-container')).toBeTruthy();
        void expect(cdkOverlayContainerEl.classList.contains('class1')).toBeFalsy();
        void expect(cdkOverlayContainerEl.classList.contains('class2')).toBeFalsy();
    });

    it('should have isVisible=true when invoking show() method', () => {
        fixture.detectChanges();
        void expect(comp.isVisible).toBeFalsy();
        comp.show(null);
        void expect(comp.isVisible).toBeTruthy();
    });

    it('should have isVisible=false and emit closed event when invoking close() method', done => {
        fixture.detectChanges();
        comp.closed.subscribe((g: boolean) => {
            void expect(g).toBe(true);
            done();
        });
        void expect(!comp.isVisible).toBeTruthy();
        comp.show(null);
        void expect(comp.isVisible).toBeTruthy();
        comp.close();
        void expect(comp.isVisible).toBeFalsy();
    });

    it('should have isVisible=false and emit closed event when clicking on backdrop div', done => {
        fixture.detectChanges();
        comp.closed.subscribe((g: boolean) => {
            void expect(g).toEqual(true);
            done();
        });
        void expect(comp.isVisible).toBeFalsy();
        comp.show(null);
        void expect(comp.isVisible).toBeTruthy();
        fixture.detectChanges();
        const cdkBackdropContainerEl = document.querySelector<HTMLDivElement>('.cdk-overlay-backdrop');
        cdkBackdropContainerEl.click();
        void expect(comp.isVisible).toBeFalsy();
    });

    it('should use positionForMobile if isMobile=true', () => {
        fixture.detectChanges();
        void expect(comp.isMobile).toBeFalsy();
        let returnedPositions = comp.positionsForMobile;
        void expect(returnedPositions).toBeFalsy();

        const normalPosition = DejaConnectionPositionPair.parse('start top start bottom');
        const positionsForMobile = DejaConnectionPositionPair.parse('center center center center');
        comp.positions = normalPosition;
        comp.positionsForMobile = positionsForMobile;
        fixture.detectChanges();
        returnedPositions = comp.positions;
        void expect(returnedPositions).toBe(normalPosition);

        comp.isMobile = true;
        fixture.detectChanges();
        returnedPositions = comp.positions;
        void expect(returnedPositions).toBe(positionsForMobile);
    });

    it('should use widthForMobile if isMobile=true', () => {
        fixture.detectChanges();
        void expect(comp.isMobile).toBeFalsy();
        let returnedWidth = comp.overlayWidth;
        void expect(returnedWidth).toBeNull();
        returnedWidth = comp.widthForMobile;
        void expect(returnedWidth).toEqual('100%');

        comp.isMobile = true;
        comp.widthForMobile = '50%';
        fixture.detectChanges();
        returnedWidth = comp.overlayWidth;
        void expect(returnedWidth).toEqual('50%');
    });

    it('should emit visibleChange event when isVisible change', done => {
        fixture.detectChanges();
        comp.visibleChange.subscribe((g: boolean) => {
            void expect(g).toEqual(true);
            done();
        });
        comp.isVisible = true;
        fixture.detectChanges(false);
    });

    it('should emit closed event when invoking close()', done => {
        fixture.detectChanges();
        comp.closed.subscribe((g: boolean) => {
            void expect(g).toEqual(true);
            done();
        });
        comp.isVisible = true;
        fixture.detectChanges(true);
        comp.close();
    });
});
