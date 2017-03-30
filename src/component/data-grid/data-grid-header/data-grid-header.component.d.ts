import { ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { IDejaDragEvent, IDejaDropEvent, ISortInfos } from '../../../index';
import { IDejaGridColumn, IDejaGridColumnEvent, IDejaGridColumnLayout, IDejaGridColumnLayoutEvent, IDejaGridColumnSizeEvent } from '../index';
export declare class DejaGridHeaderComponent implements OnDestroy {
    private changeDetectorRef;
    columnHeaderTemplateExternal: any;
    sortInfos: ISortInfos;
    columnSizeChanged: EventEmitter<IDejaGridColumnSizeEvent>;
    columnLayoutChanged: EventEmitter<IDejaGridColumnLayoutEvent>;
    columnHeaderClicked: EventEmitter<IDejaGridColumnEvent>;
    protected columnHeaderTemplateInternal: any;
    protected sizedColumn: IDejaGridColumn;
    private _columnsDraggable;
    private _columnsSortable;
    private _columnsSizable;
    private _columnLayout;
    private backupColumnOrder;
    private columnGroupKey;
    private subscriptions;
    columnsDraggable: boolean;
    columnsSortable: boolean;
    columnsSizable: boolean;
    columnLayout: IDejaGridColumnLayout;
    protected readonly columnHeaderTemplate: any;
    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef);
    ngOnDestroy(): void;
    refresh(): void;
    protected getDragContext(column: IDejaGridColumn): {
        dragendcallback: (event: IDejaDragEvent) => void;
        dragstartcallback: (event: IDejaDragEvent) => void;
    };
    protected getDropContext(): {
        dragleavecallback: () => void;
        dragovercallback: (event: IDejaDropEvent) => void;
        dropcallback: (event: IDejaDropEvent) => void;
    };
    private getColumnElementFromHTMLElement(element);
    private getColumnFromHTMLElement(element);
}
