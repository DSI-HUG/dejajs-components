import { Subject } from 'rxjs/Rx';
import { Color } from '../../common/core/graphics/index';
export declare class DejaColorFab {
    private _color;
    private _disabled;
    private _active;
    color$: Subject<Color>;
    active$: Subject<boolean>;
    disabled$: Subject<boolean>;
    constructor(_color: Color, _disabled: boolean, _active: boolean);
    color: Color;
    disabled: boolean;
    active: boolean;
}
