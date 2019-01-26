/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Color } from '../../common/core/graphics/color';
import { MaterialColors } from '../../common/core/style/material-colors';
import { DejaPopupComponent } from '../popup/component/popup/popup.component';
import { DejaTileBorderDirection, DejaTileGroup } from './tile-group.class';

export interface ITileGroupStyleEditorData {
    tileGroup: DejaTileGroup;
    update(): void;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-tile-group-style-editor',
    styleUrls: ['./tile-group-style-editor.component.scss',
    ],
    templateUrl: './tile-group-style-editor.component.html',
})
export class TileGroupStyleEditorComponent extends DejaPopupComponent implements OnInit {
    public materialColors: MaterialColors;
    public min = 0;
    public max = 20;
    private widthStep = 2;
    private tileGroup: DejaTileGroup;
    private update: () => void;

    public ngOnInit() {
        this.materialColors = this.injector.get(MaterialColors);
        const data = this.config.data as ITileGroupStyleEditorData;
        this.tileGroup = data.tileGroup;
        this.update = data.update;
    }

    public get borderColor() {
        return this.tileGroup && this.tileGroup.borderColor ? Color.fromHex(this.tileGroup.borderColor) : null;
    }

    public set borderColor(value: Color) {
        this.tileGroup.borderColor = value.toHex();
        this.update();
    }

    public get borderWidth() {
        return (this.tileGroup && this.tileGroup.borderWidth / 2) || null;
    }

    public set borderWidth(value: number) {
        if (value >= this.min && value <= this.max) {
            this.tileGroup.borderWidth = value * this.widthStep;
            this.update();
        }
    }

    public get topBorder() {
        // tslint:disable-next-line:no-bitwise
        return !!this.tileGroup && (this.tileGroup.borderDirection & DejaTileBorderDirection.top) !== 0;
    }

    public set topBorder(value: boolean) {
        if (!this.tileGroup) {
            return;
        }

        if (value) {
            // tslint:disable-next-line:no-bitwise
            this.tileGroup.borderDirection |= DejaTileBorderDirection.top;
        } else {
            // tslint:disable-next-line:no-bitwise
            this.tileGroup.borderDirection &= ~DejaTileBorderDirection.top;
        }
        this.update();
    }

    public get rightBorder() {
        // tslint:disable-next-line:no-bitwise
        return !!this.tileGroup && (this.tileGroup.borderDirection & DejaTileBorderDirection.right) !== 0;
    }

    public set rightBorder(value: boolean) {
        if (!this.tileGroup) {
            return;
        }

        if (value) {
            // tslint:disable-next-line:no-bitwise
            this.tileGroup.borderDirection |= DejaTileBorderDirection.right;
        } else {
            // tslint:disable-next-line:no-bitwise
            this.tileGroup.borderDirection &= ~DejaTileBorderDirection.right;
        }
        this.update();
    }

    public get bottomBorder() {
        // tslint:disable-next-line:no-bitwise
        return !!this.tileGroup && (this.tileGroup.borderDirection & DejaTileBorderDirection.bottom) !== 0;
    }

    public set bottomBorder(value: boolean) {
        if (!this.tileGroup) {
            return;
        }

        if (value) {
            // tslint:disable-next-line:no-bitwise
            this.tileGroup.borderDirection |= DejaTileBorderDirection.bottom;
        } else {
            // tslint:disable-next-line:no-bitwise
            this.tileGroup.borderDirection &= ~DejaTileBorderDirection.bottom;
        }
        this.update();
    }

    public get leftBorder() {
        // tslint:disable-next-line:no-bitwise
        return !!this.tileGroup && (this.tileGroup.borderDirection & DejaTileBorderDirection.left) !== 0;
    }

    public set leftBorder(value: boolean) {
        if (!this.tileGroup) {
            return;
        }

        if (value) {
            // tslint:disable-next-line:no-bitwise
            this.tileGroup.borderDirection |= DejaTileBorderDirection.left;
        } else {
            // tslint:disable-next-line:no-bitwise
            this.tileGroup.borderDirection &= ~DejaTileBorderDirection.left;
        }
        this.update();
    }
}
