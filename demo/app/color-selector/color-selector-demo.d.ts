import { Color } from '../../src/common/core/graphics/color';
import { ColorEvent } from '../../src/common/core/graphics/color-event';
import { MaterialColors } from '../../src/common/core/style/material-colors';
export declare class DejaColorSelectorDemoComponent {
    protected materialColors: MaterialColors;
    protected tabIndex: number;
    protected selectedColor: Color;
    protected invalidColor: Color;
    private hoveredColor;
    constructor(materialColors: MaterialColors);
    protected onColorPickerHover(event: ColorEvent): void;
    protected onColorPickerChange(event: ColorEvent): void;
}
