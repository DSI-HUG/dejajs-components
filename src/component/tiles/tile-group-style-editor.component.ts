/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import {
    ChangeDetectionStrategy,
    Component, OnInit,
    ViewEncapsulation
} from '@angular/core';
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
    protected colorPickerSelectedColor: Color;
    protected borderWidth: number;
    protected min = 0;
    protected max = 10;
    private tileGroup: DejaTileGroupComponent;

    public ngOnInit() {
        this.materialColors = this.injector.get(MaterialColors);
        this.tileGroup = this.config.data;
        this.borderWidth = this.tileGroup.getBorderWidthValue() * 4;
        this.colorPickerSelectedColor = this.tileGroup.borderColor ? Color.parse(this.tileGroup.borderColor) : Color.parse('black');
    }

    protected onColorPickerChange(color: Color) {
        this.tileGroup.updateBorderColor(color && color.toHex());
    }

    public onBorderWidthRmChange(width: number) {
        this.tileGroup.updateBorderWidth(width / 4);
    }
}
