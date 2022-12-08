/* eslint-disable @typescript-eslint/naming-convention */

export enum StyleConfigBorderDirection {
    none = 0x0,
    top = 0x1,
    right = 0x2,
    bottom = 0x4,
    left = 0x8,
    all = 0xF,
}

export class StyleConfig {
    public borderColor: string = void 0;
    public borderWidth: number = void 0;
    public borderDirection: StyleConfigBorderDirection = void 0;
}
