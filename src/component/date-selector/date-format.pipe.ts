import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'dejaDate'
})
export class DejaDateFormatPipe implements PipeTransform {
    public transform(date: Date, format: string) {
        return moment(date).format(format);
    }
}
