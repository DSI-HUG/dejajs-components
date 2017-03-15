import { Color } from '../graphics/color';
export declare class MaterialColor extends Color {
    name: string;
    subColors: MaterialColor[];
    static fromText(text: string): MaterialColor;
}
