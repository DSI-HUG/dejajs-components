import { AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
export declare class DejaViewPortComponent implements OnDestroy, AfterViewInit {
    private changeDetectorRef;
    itemSizeMode: 'fixed' | 'auto';
    itemSize: string;
    protected vpBeforeSize: number;
    protected vpAfterSize: number;
    protected vpItems: DejaViewPortItem[];
    protected vpStartIndex: number;
    private _items;
    private element;
    private subscriptions;
    private lastScrollPos;
    private isHorizontal;
    private _direction;
    itemTemplateExternal: any;
    private itemTemplateInternal;
    private itemElements;
    private wrapperElement;
    items: any[];
    direction: 'vertical' | 'horizontal';
    private readonly itemTemplate;
    private readonly clientSize;
    private scrollPos;
    constructor(changeDetectorRef: ChangeDetectorRef);
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    private calcViewPort(maxSize?);
    private clearViewPort();
}
export declare class DejaViewPortItem {
    model: any;
    size: number;
    constructor(model: any, size?: number);
}
