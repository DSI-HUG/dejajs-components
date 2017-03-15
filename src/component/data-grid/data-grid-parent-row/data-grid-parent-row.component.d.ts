import { IDejaGridColumn, IDejaGridParentRow } from '../index';
export declare class DejaGridParentRowComponent {
    row: IDejaGridParentRow;
    columns: IDejaGridColumn[];
    cellTemplateExternal: any;
    parentTitleTemplateExternal: any;
    flatIndex: number;
    protected parentTitleTemplateInternal: any;
    protected cellTemplateInternal: any;
    protected readonly columnLayout: IDejaGridParentRowColumnLayout;
    protected readonly cellTemplate: any;
    protected readonly parentTitleTemplate: any;
}
export interface IDejaGridParentRowColumnLayout {
    column0: number;
    columns: Array<{
        column: IDejaGridColumn;
        left: number;
    }>;
}
