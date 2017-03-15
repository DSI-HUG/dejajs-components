import { Color } from '../graphics/color';
import { MaterialColor } from './index';
export declare class MaterialColors {
    private _colors;
    private palettes;
    private palet;
    readonly colors: MaterialColor[];
    getPalet(subColor: string): Color[];
}
