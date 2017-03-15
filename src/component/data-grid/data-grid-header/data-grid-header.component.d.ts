import { ElementRef, EventEmitter } from '@angular/core';
import { IDejaDragEvent, IDejaDropEvent, ISortInfos } from '../../../index';
import { IDejaGridColumn, IDejaGridColumnEvent, IDejaGridColumnLayout, IDejaGridColumnLayoutEvent, IDejaGridColumnSizeEvent } from '../index';
export declare class DejaGridHeaderComponent {
    private elementRef;
    columnHeaderTemplateExternal: any;
    sortInfos: ISortInfos;
    columnSizeChanged: EventEmitter<IDejaGridColumnSizeEvent>;
    columnLayoutChanged: EventEmitter<IDejaGridColumnLayoutEvent>;
    columnHeaderClicked: EventEmitter<IDejaGridColumnEvent>;
    protected columnHeaderTemplateInternal: any;
    private _columnsDraggable;
    private _columnsSortable;
    private _columnsSizable;
    private _columnLayout;
    private backupColumnOrder;
    private _sizedColumn;
    private sizedOrigin;
    private columnGroupKey;
    private clickedColumn;
    private clickedTime;
    private mouseMoveObs;
    private mouseUpObs;
    columnsDraggable: boolean;
    columnsSortable: boolean;
    columnsSizable: boolean;
    columnLayout: IDejaGridColumnLayout;
    protected readonly columnHeaderTemplate: any;
    protected sizedColumn: IDejaGridColumn;
    constructor(elementRef: ElementRef);
    protected ngAfterViewInit(): void;
    protected getDragContext(column: IDejaGridColumn): {
        dragendcallback: (event: IDejaDragEvent) => void;
        dragstartcallback: (event: IDejaDragEvent) => void;
    };
    protected getDropContext(): {
        dragleavecallback: () => void;
        dragovercallback: (event: IDejaDropEvent) => void;
        dropcallback: (event: IDejaDropEvent) => void;
    };
    protected onMouseDown(event: MouseEvent): boolean;
    private mouseUp;
    private mouseMove;
    private getColumnElementFromHTMLElement(element);
    private getColumnFromHTMLElement(element);
}
