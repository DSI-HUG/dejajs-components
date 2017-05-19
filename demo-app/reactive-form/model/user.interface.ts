import { Color, IRange } from '../../../index';
import { ICountry } from '../../services/countries.service';

export interface IUser {
    name: string;                       // MdInput
    country: ICountry;                  // DejaSelect
    visitedCountries: ICountry[];       // DejaSelect => MultiSelect
    birthDate: Date;                    // DejaDatePicker && DejaDateSelector
    size: number,                       // DejaCircularPicker
    color: Color,                       // DejaColor Selector
    color2: Color,                      // DejaColorPicker
    skills: string[];                   // DejaChips
    remark: string;                     // DejaContentEditable
    ranges: IRange[];                   // DejaRange
}
