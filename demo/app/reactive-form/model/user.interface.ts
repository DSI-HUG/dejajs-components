/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Color } from '../../../../src/common/core/graphics/color';
import { IRange } from '../../../../src/component/range/range.interface';
import { ICountry } from '../../services/countries.service';

export interface IUser {
    name: string;                       // MdInput
    country: ICountry;                  // DejaSelect
    visitedCountries: ICountry[];       // DejaSelect => MultiSelect
    birthDate: Date;                    // DejaDatePicker && DejaDateSelector
    size: number;                       // DejaCircularPicker
    color: Color;                       // DejaColor Selector
    color2: Color;                      // DejaColorPicker
    skills: string[];                   // DejaChips
    remark: string;                     // DejaContentEditable
    ranges: IRange[];                   // DejaRange
}
