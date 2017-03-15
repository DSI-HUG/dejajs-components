import { IDejaGridColumn, IDejaGridColumnLayout, IDejaGridRow } from '../index';
export declare class DejaGridRowComponent {
    row: IDejaGridRow;
    currentColumn: IDejaGridColumn;
    cellTemplateExternal: any;
    flatIndex: number;
    protected cellTemplateInternal: any;
    columnLayout: IDejaGridColumnLayout;
    private _columnLayout;
    protected readonly cellTemplate: any;
}
