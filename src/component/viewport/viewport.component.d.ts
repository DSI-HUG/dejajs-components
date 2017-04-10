import { AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { IViewPortItem, ViewportDirection, ViewportMode, ViewPortService } from '../../common/core/item-list';
export declare enum DejaViewPortScrollStyle {
    scrollbar = 0,
    buttons = 1,
}
export declare class DejaViewPortComponent implements OnDestroy, AfterViewInit {
    private changeDetectorRef;
    private viewPort;
    protected beforeSize: string;
    protected afterSize: string;
    protected vpItems: IDejaViewPortItem[];
    protected vpStartIndex: number;
    protected vpEndIndex: number;
    protected startOffset: number;
    protected hasUpButton: boolean;
    protected hasDownButton: boolean;
    protected isHorizontal: boolean;
    protected hasButtons: boolean;
    private _items;
    private element;
    private subscriptions;
    private hasButtons$;
    private buttonsStep;
    private mouseDown$Sub;
    private mouseWheel$Sub;
    private scrollPosition;
    itemTemplateExternal: any;
    private itemTemplateInternal;
    private wrapperElement;
    private downButton;
    private upButton;
    items: any[];
    scrollingStyle: DejaViewPortScrollStyle | string;
    direction: ViewportDirection | string;
    itemSize: number | string;
    private readonly itemTemplate;
    private readonly clientSize;
    private scrollPos;
    viewportMode: ViewportMode | string;
    constructor(changeDetectorRef: ChangeDetectorRef, viewPort: ViewPortService);
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    refresh(): void;
    ensureVisible(item: any): void;
    protected getItemSize(item: IViewPortItem): string | number;
}
export interface IDejaViewPortItem extends IViewPortItem {
    model: any;
}
