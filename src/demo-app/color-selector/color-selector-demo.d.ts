import { Color, ColorEvent } from '../../common/core/graphics';
import { MaterialColors } from '../../common/core/style';
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
