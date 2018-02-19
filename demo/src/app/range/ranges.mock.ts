/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Range } from '../../../src/component/range/range.interface';
import { Weight } from './weight.interface';

export const readOnlyRanges = [
    new Range(4, 16),
    new Range(16, 20),
    new Range(20, 24),
    new Range(24, 36),
];

export const ranges = [
    new Range(0, 12.5),
    new Range(12.5, 25),
    new Range(25, 30),
];

export const rangesWithInterval = [
    new Range(0, 12),
    new Range(12, 20),
    new Range(20, 24),
];

export const weights = [
    new Weight(3, 4),
    new Weight(4, 6),
    new Weight(6, 9),
    new Weight(9, 12),
    new Weight(12, 16),
    new Weight(16, 20),
    new Weight(20, 25),
    new Weight(25, 32),
    new Weight(32, 40),
    new Weight(40, 200),
];

export const steps = [
    1, 2, 4, 8, 16, 20, 22, 24,
];
