/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MaterialColors } from '../../core/colors/material-colors';
import { Color } from '../../core/graphics/color';
import { DejaPopupComponent } from '../popup/component/popup/popup.component';
import { DejaTileBorderDirection } from './tile-group.class';

export interface ITileGroupStyleEditorData {
    borderWidth: number;
    borderColor: string;
    borderDirection: DejaTileBorderDirection;
    update(borderWidth: number, borderColor: string, borderDirection: DejaTileBorderDirection): void;
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
    private model: ITileGroupStyleEditorData;

    public ngOnInit() {
        this.materialColors = this.injector.get(MaterialColors);
        this.model = this.config.data as ITileGroupStyleEditorData;
    }

    public get borderColor() {
        return this.model && this.model.borderColor ? Color.fromHex(this.model.borderColor) : null;
    }

    public set borderColor(value: Color) {
        this.model.borderColor = value.toHex();
        this.model.update(this.model.borderWidth, this.model.borderColor, this.model.borderDirection);
    }

    public get borderWidth() {
        return (this.model && this.model.borderWidth / 2) || null;
    }

    public set borderWidth(value: number) {
        if (value >= this.min && value <= this.max) {
            this.model.borderWidth = value * this.widthStep;
            this.model.update(this.model.borderWidth, this.model.borderColor, this.model.borderDirection);
        }
    }

    public get topBorder() {
        // tslint:disable-next-line:no-bitwise
        return !!this.model && (this.model.borderDirection & DejaTileBorderDirection.top) !== 0;
    }

    public set topBorder(value: boolean) {
        if (!this.model) {
            return;
        }

        if (value) {
            // tslint:disable-next-line:no-bitwise
            this.model.borderDirection |= DejaTileBorderDirection.top;
        } else {
            // tslint:disable-next-line:no-bitwise
            this.model.borderDirection &= ~DejaTileBorderDirection.top;
        }
        this.model.update(this.model.borderWidth, this.model.borderColor, this.model.borderDirection);
    }

    public get rightBorder() {
        // tslint:disable-next-line:no-bitwise
        return !!this.model && (this.model.borderDirection & DejaTileBorderDirection.right) !== 0;
    }

    public set rightBorder(value: boolean) {
        if (!this.model) {
            return;
        }

        if (value) {
            // tslint:disable-next-line:no-bitwise
            this.model.borderDirection |= DejaTileBorderDirection.right;
        } else {
            // tslint:disable-next-line:no-bitwise
            this.model.borderDirection &= ~DejaTileBorderDirection.right;
        }
        this.model.update(this.model.borderWidth, this.model.borderColor, this.model.borderDirection);
    }

    public get bottomBorder() {
        // tslint:disable-next-line:no-bitwise
        return !!this.model && (this.model.borderDirection & DejaTileBorderDirection.bottom) !== 0;
    }

    public set bottomBorder(value: boolean) {
        if (!this.model) {
            return;
        }

        if (value) {
            // tslint:disable-next-line:no-bitwise
            this.model.borderDirection |= DejaTileBorderDirection.bottom;
        } else {
            // tslint:disable-next-line:no-bitwise
            this.model.borderDirection &= ~DejaTileBorderDirection.bottom;
        }
        this.model.update(this.model.borderWidth, this.model.borderColor, this.model.borderDirection);
    }

    public get leftBorder() {
        // tslint:disable-next-line:no-bitwise
        return !!this.model && (this.model.borderDirection & DejaTileBorderDirection.left) !== 0;
    }

    public set leftBorder(value: boolean) {
        if (!this.model) {
            return;
        }

        if (value) {
            // tslint:disable-next-line:no-bitwise
            this.model.borderDirection |= DejaTileBorderDirection.left;
        } else {
            // tslint:disable-next-line:no-bitwise
            this.model.borderDirection &= ~DejaTileBorderDirection.left;
        }
        this.model.update(this.model.borderWidth, this.model.borderColor, this.model.borderDirection);
    }
}
