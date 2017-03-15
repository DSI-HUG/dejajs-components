import { UnitValue } from '../../../common/core/graphics';
import { IDejaGridColumn } from '../index';
export declare class DejaGridColumnsLayoutInfos {
    percentColumns: IDejaGridColumn[];
    fixedColumns: IDejaGridColumn[];
    responsiveColumns: IDejaGridColumn[];
    totalFixedWidth: number;
    totalPercentWidth: number;
    columnsWidth: {
        [name: string]: UnitValue;
    };
    constructor(columns: IDejaGridColumn[]);
}
