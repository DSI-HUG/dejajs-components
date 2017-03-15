import { Color } from './index';
export declare class ColorEvent extends CustomEvent {
    color: Color;
    constructor(color: Color, eventInitDict?: CustomEventInit);
}
