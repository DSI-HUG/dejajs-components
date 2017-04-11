import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs/Rx';
import { IViewPort, IViewPortItem } from './viewport.service';
export declare enum ViewportMode {
    disabled = 0,
    fixed = 1,
    variable = 2,
    auto = 3,
}
export declare enum ViewportDirection {
    vertical = 0,
    horizontal = 1,
}
export declare class ViewPortService {
    static itemDefaultSize: number;
    viewPort$: Observable<IViewPort>;
    mode$: BehaviorSubject<string | ViewportMode>;
    items$: ReplaySubject<IViewPortItem[]>;
    maxSize$: BehaviorSubject<number>;
    ensureItem$: BehaviorSubject<number | IViewPortItem>;
    scrollPosition$: BehaviorSubject<number>;
    element$: ReplaySubject<HTMLElement>;
    itemsSize$: BehaviorSubject<number>;
    direction$: BehaviorSubject<string | ViewportDirection>;
    private refresh$;
    private lastCalculatedSize;
    private emptyViewPort;
    private measureViewPort;
    viewPortResult$: BehaviorSubject<IViewPort>;
    private _mode;
    private _itemsSize;
    private _direction;
    private _scrollPosition;
    private viewPort;
    private ignoreScrollEvent;
    readonly mode: ViewportMode;
    readonly itemsSize: number;
    readonly direction: ViewportDirection;
    constructor();
    clear(): void;
    refresh(): void;
}
export interface IViewPort {
    beforeSize: number;
    afterSize: number;
    visibleItems: IViewPortItem[];
    startIndex: number;
    endIndex: number;
    viewPortSize: number;
    listSize: number;
    scrollPos: number;
    items: IViewPortItem[];
}
export interface IViewPortItem {
    size?: number;
}
