/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Color } from '../../common/core/graphics/color';
import { MaterialColors } from '../../common/core/style/material-colors';
import { DejaPopupComponent } from '../popup/component/popup/popup.component';
import { DejaTileGroupComponent } from './tile-group.component';

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
    public min = 1;
    public max = 5;
    public borderPositions = [{value: 'top', label: 'Haut'}, {value: 'right', label: 'Droite'}, {value: 'bottom', label: 'Bas'}, {value: 'left', label: 'Gauche'}];
    public selectedBorderPositions = ['top', 'right', 'bottom', 'left'];
    private tileGroup: DejaTileGroupComponent; // TODO change to model
    private changeDetectorRef: ChangeDetectorRef;
    private widthStep = 3;

    private _borderDisplayed: boolean;

    public get borderDisplayed(): boolean {
        return this._borderDisplayed;
    }

    public set borderDisplayed(value: boolean) {
        this._borderDisplayed = value;
        this.borderWidth = value ? 1 : 0;
        this.borderColor = this.borderColor; // restore old value
        if (!value) {
            this.tileGroup.deleteBorder();
        }
        this.changeDetectorRef.markForCheck();
    }

    private _borderColor: Color;

    public get borderColor(): Color {
        return this._borderColor;
    }

    public set borderColor(value: Color) {
        this._borderColor = value;
        this.updateBorderColorOnTileGroup();
    }

    private _borderWidth: number;

    public get borderWidth(): number {
        return this._borderWidth;
    }

    public set borderWidth(value: number) {
        this._borderWidth = value;
        if (value >= this.min && value <= this.max) {
            this.updateBorderDimensions();
        }
    }

    public ngOnInit() {
        this.materialColors = this.injector.get(MaterialColors);
        this.changeDetectorRef = this.injector.get(ChangeDetectorRef);
        this.tileGroup = this.config.data;
        const borderDimensions = this.computeBorderDimensions();
        this._borderWidth = borderDimensions.borderWidth;
        this.selectedBorderPositions = borderDimensions.borderPositions;
        this._borderColor = this.tileGroup.model.borderColor ? Color.parse(this.tileGroup.model.borderColor) : Color.parse('black');
        this._borderDisplayed = !!this._borderWidth;
    }

    private computeBorderDimensions(): { borderWidth: number; borderPositions: string[] } {
        let paddingParts = this.tileGroup.model.borderWidth && this.tileGroup.model.borderWidth
            .split(' ')
            .map(value => +value.replace('px', ''))
            .filter(value => !isNaN(value));

        if (!paddingParts || paddingParts.filter(value => !!value).length === 0) {
            return {borderWidth: 0, borderPositions: this.borderPositions.map(pos => pos.value)};
        } else if (paddingParts.length === 1) {
            return {
                borderWidth: (paddingParts[0] / this.widthStep),
                borderPositions: this.borderPositions.map(pos => pos.value)
            };
        } else {
            if (paddingParts.length === 2) {
                paddingParts = [...paddingParts, ...paddingParts];
            }
            const indexPositions: number[] = [];
            paddingParts.forEach((value, index) => {
                if (value) {
                    indexPositions.push(index);
                }
            });
            // @ts-ignore
            const positions = this.borderPositions.filter((pos, index) => indexPositions.indexOf(index) > -1).map(pos => pos.value);
            const width = paddingParts.filter(value => !!value)[0];
            return {borderWidth: (width / this.widthStep), borderPositions: positions};
        }
    }

    private updateBorderColorOnTileGroup() {
        this.tileGroup.updateBorderColor(this._borderColor && this._borderColor.toHex());
    }

    public updateBorderDimensions() {
        let padding = `${this.borderWidth * this.widthStep}px`;
        if (this.selectedBorderPositions.length !== 0 && this.selectedBorderPositions.length !== 4) {
            padding = this.borderPositions.map(pos => {
                if (this.selectedBorderPositions.indexOf(pos.value) > -1) {
                    return padding;
                } else {
                    return '0';
                }
            }).join(' ');
        }
        this.tileGroup.updateBorderWidth(padding);
    }
}
