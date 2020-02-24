/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Color } from '@deja-js/core';
import { DejaTileBorderDirection, DejaTilesModule } from './index';
import { ITileGroupStyleEditorData, TileGroupStyleEditorComponent } from './tile-group-style-editor.component';

class TileGroupStyleEditorDataImpl implements ITileGroupStyleEditorData {
    public values = {
        name: 'Orange',
        color: Color.fromHex('#e96c00'),
        borderWidth: 4,
        borderDirection: DejaTileBorderDirection.bottom
    };

    public borderColor: string;
    public borderDirection: DejaTileBorderDirection;
    public borderWidth: number;

    constructor() {
        this.borderColor = this.values.color.toHex();
        this.borderDirection = this.values.borderDirection;
        this.borderWidth = this.values.borderWidth;
    }

    public update(): void {
    }
}

const expectSameColor = (c1: Color, c2: Color) => {
    expect(c1.r).toBe(c2.r);
    expect(c1.g).toBe(c2.g);
    expect(c1.b).toBe(c2.b);
};

const expectSameHexColor = (s1: string, s2: string) => {
    const c1 = Color.fromHex(s1);
    const c2 = Color.fromHex(s2);
    expect(c1.r).toBe(c2.r);
    expect(c1.g).toBe(c2.g);
    expect(c1.b).toBe(c2.b);
};

describe('TileGroupStyleEditorComponent', () => {
    let component: TileGroupStyleEditorComponent;
    let fixture: ComponentFixture<TileGroupStyleEditorComponent>;
    let tileGroupStyleEditorDataImpl: TileGroupStyleEditorDataImpl;

    beforeEach(async(() => {
        tileGroupStyleEditorDataImpl = new TileGroupStyleEditorDataImpl();
        TestBed.configureTestingModule({
            imports: [
                DejaTilesModule,
                MatDialogModule,
                BrowserAnimationsModule
            ],
            declarations: [],
            providers: [
                {provide: MatDialogRef, useValue: {}},
                {provide: MAT_DIALOG_DATA, useValue: {data: tileGroupStyleEditorDataImpl}},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TileGroupStyleEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get and set borderColor', () => {
        spyOn(tileGroupStyleEditorDataImpl, 'update');
        expectSameColor(component.borderColor, tileGroupStyleEditorDataImpl.values.color);
        const colorHex = '#fff';
        component.borderColor = Color.fromHex(colorHex);
        expectSameHexColor(tileGroupStyleEditorDataImpl.borderColor, colorHex);
        expect(tileGroupStyleEditorDataImpl.update).toHaveBeenCalledTimes(1);
    });

    it('should get and set borderWidth', () => {
        spyOn(tileGroupStyleEditorDataImpl, 'update');
        expect(component.borderWidth).toBe(tileGroupStyleEditorDataImpl.values.borderWidth / 2);
        component.borderWidth = 5;
        expect(tileGroupStyleEditorDataImpl.borderWidth).toBe(10);
        expect(tileGroupStyleEditorDataImpl.update).toHaveBeenCalledTimes(1);
    });

    it('should get and set borderDirections', () => {
        spyOn(tileGroupStyleEditorDataImpl, 'update');
        let nbCall = 0;
        expect(component.topBorder).toBeFalsy();
        expect(component.rightBorder).toBeFalsy();
        expect(component.leftBorder).toBeFalsy();
        expect(component.bottomBorder).toBeTruthy();

        component.topBorder = true;
        // tslint:disable-next-line:no-bitwise
        expect((tileGroupStyleEditorDataImpl.borderDirection & DejaTileBorderDirection.top) !== 0).toBeTruthy('border direction should be top');
        expect(tileGroupStyleEditorDataImpl.update).toHaveBeenCalledTimes(++nbCall);
        component.topBorder = false;
        // tslint:disable-next-line:no-bitwise
        expect((tileGroupStyleEditorDataImpl.borderDirection & DejaTileBorderDirection.top) !== 0).toBeFalsy('border direction shouldn\'t be top');
        expect(tileGroupStyleEditorDataImpl.update).toHaveBeenCalledTimes(++nbCall);

        component.rightBorder = true;
        // tslint:disable-next-line:no-bitwise
        expect((tileGroupStyleEditorDataImpl.borderDirection & DejaTileBorderDirection.right) !== 0).toBeTruthy('border direction should be right');
        expect(tileGroupStyleEditorDataImpl.update).toHaveBeenCalledTimes(++nbCall);
        component.rightBorder = false;
        // tslint:disable-next-line:no-bitwise
        expect((tileGroupStyleEditorDataImpl.borderDirection & DejaTileBorderDirection.right) !== 0).toBeFalsy('border direction shouldn\'t be right');
        expect(tileGroupStyleEditorDataImpl.update).toHaveBeenCalledTimes(++nbCall);

        component.leftBorder = true;
        // tslint:disable-next-line:no-bitwise
        expect((tileGroupStyleEditorDataImpl.borderDirection & DejaTileBorderDirection.left) !== 0).toBeTruthy('border direction should be left');
        expect(tileGroupStyleEditorDataImpl.update).toHaveBeenCalledTimes(++nbCall);
        component.leftBorder = false;
        // tslint:disable-next-line:no-bitwise
        expect((tileGroupStyleEditorDataImpl.borderDirection & DejaTileBorderDirection.left) !== 0).toBeFalsy('border direction shouldn\'t be left');
        expect(tileGroupStyleEditorDataImpl.update).toHaveBeenCalledTimes(++nbCall);

        component.bottomBorder = true;
        // tslint:disable-next-line:no-bitwise
        expect((tileGroupStyleEditorDataImpl.borderDirection & DejaTileBorderDirection.bottom) !== 0).toBeTruthy('border direction should be bottom');
        expect(tileGroupStyleEditorDataImpl.update).toHaveBeenCalledTimes(++nbCall);
        component.bottomBorder = false;
        // tslint:disable-next-line:no-bitwise
        expect((tileGroupStyleEditorDataImpl.borderDirection & DejaTileBorderDirection.bottom) !== 0).toBeFalsy('border direction shouldn\'t be bottom');
        expect(tileGroupStyleEditorDataImpl.update).toHaveBeenCalledTimes(++nbCall);

    });
});
