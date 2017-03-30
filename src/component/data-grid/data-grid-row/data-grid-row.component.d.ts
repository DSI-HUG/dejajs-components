import { ChangeDetectorRef } from '@angular/core';
import { IDejaGridColumnLayout, IDejaGridRow } from '../index';
export declare class DejaGridRowComponent {
    private changeDetectorRef;
    row: IDejaGridRow;
    cellTemplateExternal: any;
    flatIndex: number;
    protected cellTemplateInternal: any;
    private _columnLayout;
    private refresh$sub;
    columnLayout: IDejaGridColumnLayout;
    protected readonly cellTemplate: any;
    constructor(changeDetectorRef: ChangeDetectorRef);
}
