/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { UnitValue } from '../../../common/core/graphics';
import { IDejaGridColumn } from '../index';

export class DejaGridColumnsLayoutInfos {
    public percentColumns: IDejaGridColumn[];
    public fixedColumns: IDejaGridColumn[];
    public responsiveColumns: IDejaGridColumn[];
    public totalFixedWidth: number;
    public totalPercentWidth: number;
    public columnsWidth: {
        [name: string]: UnitValue;
    };

    constructor(columns: IDejaGridColumn[]) {
        this.columnsWidth = {};
        this.percentColumns = [];
        this.fixedColumns = [];
        this.responsiveColumns = [];
        this.totalFixedWidth = 0;
        this.totalPercentWidth = 0;

        columns.forEach((column) => {
            let width = new UnitValue(column.width);
            if (width.value === undefined) {
                width = new UnitValue(10, '%');
            }

            if (width.isInvalid()) {
                throw new Error('Invalid column width unit can be for example: 11px or 23%');
            }

            if (width.unit && width.unit !== 'px' && width.unit !== '%') {
                throw new Error('Column width unit can be only px or %');
            }

            if (width.unit === '%') {
                this.percentColumns.push(column);
                this.totalPercentWidth += width.value;
            } else {
                this.fixedColumns.push(column);
                this.totalFixedWidth += width.value;
            }

            if (typeof column.responsive === 'number' || column.responsive === true) {
                this.responsiveColumns.push(column);
            }

            this.columnsWidth[column.name] = width;
        });

        this.responsiveColumns.sort((c1, c2) => {
            if (c1.responsive === true) {
                return 1;
            } else if (c2.responsive === true) {
                return -1;
            } else {
                return +c1.responsive - +c2.responsive;
            }
        });
    }
}
