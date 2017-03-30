import { ChangeDetectorRef } from '@angular/core';
import { IDejaGridColumn, IDejaGridParentRow } from '../index';
export declare class DejaGridParentRowComponent {
    private changeDetectorRef;
    row: IDejaGridParentRow;
    cellTemplateExternal: any;
    parentTitleTemplateExternal: any;
    flatIndex: number;
    protected parentTitleTemplateInternal: any;
    protected cellTemplateInternal: any;
    private columnLayout;
    columns: IDejaGridColumn[];
    protected readonly cellTemplate: any;
    protected readonly parentTitleTemplate: any;
    constructor(changeDetectorRef: ChangeDetectorRef);
}
export interface IDejaGridParentRowColumnLayout {
    column0: number;
    columns: {
        column: IDejaGridColumn;
        left: number;
    }[];
}
