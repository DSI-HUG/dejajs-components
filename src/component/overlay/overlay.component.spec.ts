/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayModule } from '@angular/cdk/overlay';
import { ObservableMedia } from '@angular/flex-layout';
import { MediaModule } from '../../common/core/media/index';
import { MediaService } from '../../common/core/media/media.service';
import { DejaConnectionPositionPair } from '../../common/core/overlay/connection-position-pair';
import { DejaOverlayComponent } from './overlay.component';
import { MockMediaService } from './test/MockMediaService';
import { MockObservableMedia } from './test/MockObservableMedia';

describe('DejaOverlayComponent', () => {

    let comp: DejaOverlayComponent;
    let fixture: ComponentFixture<DejaOverlayComponent>;
    let cdkOverlayContainerEl: HTMLElement;

    const removeStaledOverlayContainersFunction = () => {
        // Remove any stale overlay containers from previous tests that didn't clean up correctly.
        const staleContainers = document.querySelectorAll('.cdk-overlay-container');
        for (let i = staleContainers.length - 1; i >= 0; i--) {
            staleContainers[i].parentNode.removeChild(staleContainers[i]);
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DejaOverlayComponent], // declare the test component
            imports: [MediaModule, OverlayModule],
            providers: [{ provide: ObservableMedia, useClass: MockObservableMedia }, {
                provide: MediaService, useClass:
                    MockMediaService
            }]
        }).compileComponents();
    }));

    beforeAll(() => {
        removeStaledOverlayContainersFunction();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DejaOverlayComponent);
        comp = fixture.componentInstance; // BannerComponent test instance
        cdkOverlayContainerEl = document.querySelector('.cdk-overlay-container') as HTMLElement;
    });

    afterEach(() => {
        fixture.destroy();
        removeStaledOverlayContainersFunction();
    });

    it('should use ownerElement if set', () => {
        fixture.detectChanges();
        comp.show(null);
        expect(comp.ownerElement).toBeFalsy();
        const ownerElement: HTMLElement = document.createElement('div');
        ownerElement.setAttribute('id', 'overlayOwnerElement');
        document.body.appendChild(ownerElement);
        comp.ownerElement = ownerElement;
        fixture.detectChanges();
        const el: HTMLElement = comp.overlayOrigin.elementRef.nativeElement;
        expect(el).toBe(ownerElement);
    });

    it('should have deja-overlay-container class', () => {
        fixture.detectChanges();
        expect(cdkOverlayContainerEl.classList.contains('deja-overlay-container')).toBeTruthy();
    });

    it('should not have cdk-overlay-backdrop element if isVisible is false', () => {
        fixture.detectChanges();
        expect(comp.isVisible).toBeFalsy();
        const cdkBackdropContainerEl = document.querySelector('.cdk-overlay-backdrop') as HTMLElement;
        expect(cdkBackdropContainerEl).toBeNull();
    });

    it('should have cdk-overlay-backdrop element initialized property if isVisible is true', () => {
        comp.isVisible = true;
        fixture.detectChanges();
        expect(comp.isVisible).toBeTruthy();
        const cdkBackdropContainerEl = document.querySelector('.cdk-overlay-backdrop') as HTMLElement;
        expect(cdkBackdropContainerEl).toBeTruthy();
        expect(cdkBackdropContainerEl.classList.contains('cdk-overlay-transparent-backdrop')).toBeTruthy();
    });

    it('cdkBackdropContainerEl should have cdk-overlay-opaque-backdrop class', () => {
        comp.overlayBackdropClass = 'cdk-overlay-opaque-backdrop';
        comp.isVisible = true;
        fixture.detectChanges();
        const cdkBackdropContainerEl = document.querySelector('.cdk-overlay-backdrop') as HTMLElement;
        expect(cdkBackdropContainerEl.classList.contains('cdk-overlay-opaque-backdrop')).toBeTruthy();
    });

    it('should have isVisible=true when invoking show() method', () => {
        fixture.detectChanges();
        expect(comp.isVisible).toBeFalsy();
        comp.show(null);
        expect(comp.isVisible).toBeTruthy();
    });

    it('should have isVisible=false and emit closed event when invoking close() method', (done) => {
        fixture.detectChanges();
        comp.closed.subscribe(g => {
            expect(g).toBe(true);
            done();
        });
        expect(!comp.isVisible).toBeTruthy();
        comp.show(null);
        expect(comp.isVisible).toBeTruthy();
        comp.close();
        expect(comp.isVisible).toBeFalsy();
    });

    it('should have isVisible=false and emit closed event when clicking on backdrop div', (done) => {
        fixture.detectChanges();
        comp.closed.subscribe(g => {
            expect(g).toEqual(true);
            done();
        });
        expect(comp.isVisible).toBeFalsy();
        comp.show(null);
        expect(comp.isVisible).toBeTruthy();
        fixture.detectChanges();
        const cdkBackdropContainerEl = document.querySelector('.cdk-overlay-backdrop') as HTMLElement;
        cdkBackdropContainerEl.click();
        expect(comp.isVisible).toBeFalsy();
    });

    it('should use positionForMobile if isMobile=true', () => {
        fixture.detectChanges();
        expect(comp.isMobile).toBeFalsy();
        let returnedPositions = comp.positionsForMobile;
        expect(returnedPositions).toBeFalsy();

        const normalPosition = DejaConnectionPositionPair.parse('start top start bottom');
        const positionsForMobile = DejaConnectionPositionPair.parse('center center center center');
        comp.positions = normalPosition;
        comp.positionsForMobile = positionsForMobile;
        fixture.detectChanges();
        returnedPositions = comp.positions;
        expect(returnedPositions).toBe(normalPosition);

        comp.isMobile = true;
        fixture.detectChanges();
        returnedPositions = comp.positions;
        expect(returnedPositions).toBe(positionsForMobile);
    });

    it('should use widthForMobile if isMobile=true', () => {
        fixture.detectChanges();
        expect(comp.isMobile).toBeFalsy();
        let returnedWidth = comp.overlayWidth;
        expect(returnedWidth).toBeNull();
        returnedWidth = comp.widthForMobile;
        expect(returnedWidth).toEqual('100%');

        comp.isMobile = true;
        comp.widthForMobile = '50%';
        fixture.detectChanges();
        returnedWidth = comp.overlayWidth;
        expect(returnedWidth).toEqual('50%');
    });

    it('should emit visibleChange event when isVisible change', (done) => {
        fixture.detectChanges();
        comp.visibleChange.subscribe(g => {
            expect(g).toEqual(true);
            done();
        });
        comp.isVisible = true;
        fixture.detectChanges();
    });

    it('should emit closed event when invoking close()', (done) => {
        fixture.detectChanges();
        comp.closed.subscribe(g => {
            expect(g).toEqual(true);
            done();
        });
        comp.isVisible = true;
        fixture.detectChanges();
        comp.close();
    });
});
