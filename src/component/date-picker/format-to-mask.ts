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
export const formatToMask = {
    M: null,
    Mo: null,
    MM: [/[0|1]/, /\d/],
    MMM: null,
    MMMM: null,
    Q: null,
    Qo: null,
    D: null,
    Do: null,
    DD: [/[0-3]/, /\d/],
    DDD: null,
    DDDo: null,
    DDDD: null,
    d: null,
    do: null,
    dd: null,
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
    YY: [/\d/, /\d/],
    YYYY: [/[1|2]/, /\d/, /\d/, /\d/],
    Y: null,
    gg: null,
    gggg: null,
    GG: null,
    GGGG: null,
    A: null,
    a: null,
    H: null,
    HH: [/\d/, /\d/],
    h: null,
    hh: [/\d/, /\d/],
    k: null,
    kk: null,
    m: null,
    mm: [/\d/, /\d/],
    s: null,
    ss: [/\d/, /\d/],
    S: null,
    SS: null,
    SSS: null,
    z: null,
    zz: null,
    Z: null,
    ZZ: null,
    X: null,
    x: null,
};