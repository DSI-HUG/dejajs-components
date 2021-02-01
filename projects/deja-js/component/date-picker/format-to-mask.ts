/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

/**
 * List of possible format for the date-picker converted to their mask.
 *
 * Not fully implemented yet
 */
/* eslint-disable @typescript-eslint/naming-convention */
export const formatToMask = {
    M: null,
    Mo: null,
    MM: 'F0',
    MMM: null,
    MMMM: null,
    Q: null,
    Qo: null,
    D: null,
    Do: null,
    DD: 'd0',
    DDD: null,
    DDDo: null,
    DDDD: null,
    d: null,
    do: null,
    dd: 'd0',
    ddd: null,
    dddd: null,
    e: null,
    E: null,
    w: null,
    wo: null,
    ww: null,
    W: null,
    Wo: null,
    WW: null,
    yy: '00',
    yyyy: 'B000',
    y: null,
    gg: null,
    gggg: null,
    GG: null,
    GGGG: null,
    A: null,
    a: null,
    H: null,
    HH: 'Hh',
    h: null,
    hh: 'Hh',
    k: null,
    kk: null,
    m: null,
    mm: 'm0',
    s: null,
    ss: 's0',
    S: null,
    SS: null,
    SSS: null,
    z: null,
    zz: null,
    Z: null,
    ZZ: null,
    X: null,
    x: null
} as { [f: string]: string };

export const formatToPattern = {
    M: null,
    Mo: null,
    MM: new Map<string, { pattern: RegExp; symbol?: string; optional?: boolean }>()
        .set('F', { pattern: new RegExp('[0|1]') })
        .set('0', { pattern: new RegExp('\\d') }),
    MMM: null,
    MMMM: null,
    Q: null,
    Qo: null,
    D: null,
    Do: null,
    DD: new Map<string, { pattern: RegExp; symbol?: string; optional?: boolean }>()
        .set('d', { pattern: new RegExp('[0-3]') })
        .set('0', { pattern: new RegExp('\\d') }),
    DDD: null,
    DDDo: null,
    DDDD: null,
    d: null,
    do: null,
    dd: new Map<string, { pattern: RegExp; symbol?: string; optional?: boolean }>()
        .set('d', { pattern: new RegExp('[0-3]') })
        .set('0', { pattern: new RegExp('\\d') }),
    ddd: null,
    dddd: null,
    e: null,
    E: null,
    w: null,
    wo: null,
    ww: null,
    W: null,
    Wo: null,
    WW: null,
    yy: new Map<string, { pattern: RegExp; symbol?: string; optional?: boolean }>()
        .set('0', { pattern: new RegExp('\\d') })
        .set('0', { pattern: new RegExp('\\d') }),
    yyyy: new Map<string, { pattern: RegExp; symbol?: string; optional?: boolean }>()
        .set('B', { pattern: new RegExp('[1|2]') })
        .set('0', { pattern: new RegExp('\\d') }),
    y: null,
    gg: null,
    gggg: null,
    GG: null,
    GGGG: null,
    A: null,
    a: null,
    H: null,
    HH: new Map<string, { pattern: RegExp; symbol?: string; optional?: boolean }>()
        .set('h', { pattern: new RegExp('\\d') })
        .set('H', { pattern: new RegExp('[0-2]') }),
    h: null,
    hh: new Map<string, { pattern: RegExp; symbol?: string; optional?: boolean }>()
        .set('h', { pattern: new RegExp('\\d') })
        .set('H', { pattern: new RegExp('[0-2]') }),
    k: null,
    kk: null,
    m: null,
    mm: new Map<string, { pattern: RegExp; symbol?: string; optional?: boolean }>()
        .set('m', { pattern: new RegExp('[0-5]') })
        .set('0', { pattern: new RegExp('\\d') }),
    s: null,
    ss: new Map<string, { pattern: RegExp; symbol?: string; optional?: boolean }>()
        .set('s', { pattern: new RegExp('[0-5]') })
        .set('0', { pattern: new RegExp('\\d') }),
    S: null,
    SS: null,
    SSS: null,
    z: null,
    zz: null,
    Z: null,
    ZZ: null,
    X: null,
    x: null
} as { [f: string]: Map<string, { pattern: RegExp; symbol?: string; optional?: boolean }> };

export const formatToUnitOfTime = {
    M: null,
    Mo: null,
    MM: 'months',
    MMM: null,
    MMMM: null,
    Q: null,
    Qo: null,
    D: null,
    Do: null,
    DD: null,
    DDD: null,
    DDDo: null,
    DDDD: null,
    d: null,
    do: null,
    dd: 'days',
    ddd: null,
    dddd: null,
    e: null,
    E: null,
    w: null,
    wo: null,
    ww: null,
    W: null,
    Wo: null,
    WW: null,
    yy: 'years',
    yyyy: 'years',
    y: null,
    gg: null,
    gggg: null,
    GG: null,
    GGGG: null,
    A: null,
    a: null,
    H: null,
    HH: 'hours',
    h: null,
    hh: 'hours',
    k: null,
    kk: null,
    m: null,
    mm: 'minutes',
    s: null,
    ss: 'seconds',
    S: null,
    SS: null,
    SSS: null,
    z: null,
    zz: null,
    Z: null,
    ZZ: null,
    X: null,
    x: null
} as { [f: string]: string };
