import { Color } from '../../../../src/common/core/graphics/color';
import { ICountry } from '../../services/countries.service';
import { IUser } from './user.interface';

export const user = {
    birthDate: new Date(1968, 5, 24),
    color: new Color(2, 119, 189),
    color2: new Color(183, 28, 28),
    size: 174,
    ranges: [
        {
            min: 0,
            max: 10,
        },
        {
            min: 10,
            max: 30,
        },
        {
            min: 30,
            max: 80,
        }
    ],
    country: {
        naqme: 'Switzerland',
        code: 'CH',
    } as ICountry,
    visitedCountries: [{
        naqme: 'Switzerland',
        code: 'CH',
    } as ICountry],
    name: 'Serge',
    skills: ['angular2', 'ngrx', 'typescript', 'html5', 'css3'],
    remark: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Mauris auctor sit amet odio et aliquet. Curabitur auctor eleifend mattis.
Nullam sit amet quam tellus. Ut mattis tellus sed erat ultricies ornare.
Nulla dictum nisi eu tortor lacinia porttitor. Donec eu arcu et enim cursus viverra.
Praesent pulvinar dui nisi, a tincidunt arcu finibus sed.`,
} as IUser;
