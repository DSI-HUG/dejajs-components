/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Color } from '../../common/core/graphics';
import { MaterialColors } from '../../common/core/style';
import { DejaPopupComponent } from '../popup';
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
    protected materialColors: MaterialColors;
    protected min = 1;
    protected max = 5;
    private tileGroup: DejaTileGroupComponent;
    private changeDetectorRef: ChangeDetectorRef;

    private _borderDisplayed: boolean;

    get borderDisplayed(): boolean {
        return this._borderDisplayed;
    }

    set borderDisplayed(value: boolean) {
        this._borderDisplayed = value;
        this.borderWidth = value ? 1 : 0;
        this.borderColor = this.borderColor; // restore old value
        if (!value) {
            this.tileGroup.deleteBorder();
        }
        this.changeDetectorRef.markForCheck();
    }

    private _borderColor: Color;

    get borderColor(): Color {
        return this._borderColor;
    }

    set borderColor(value: Color) {
        this._borderColor = value;
        this.updateBorderColorOnTileGroup();
    }

    private _borderWidth: number;

    get borderWidth(): number {
        return this._borderWidth;
    }

    set borderWidth(value: number) {
        this._borderWidth = value;
        if (value >= this.min && value <= this.max) {
            this.tileGroup.updateBorderWidth(value);
        }
    }

    public ngOnInit() {
        this.materialColors = this.injector.get(MaterialColors);
        this.changeDetectorRef = this.injector.get(ChangeDetectorRef);
        this.tileGroup = this.config.data;
        this._borderWidth = this.tileGroup.getBorderWidthValue();
        this._borderColor = this.tileGroup.borderColor ? Color.parse(this.tileGroup.borderColor) : Color.parse('black');
        this._borderDisplayed = !!this._borderWidth;
    }

    private updateBorderColorOnTileGroup() {
        this.tileGroup.updateBorderColor(this._borderColor && this._borderColor.toHex());
    }
}
