/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

/**
 * the model compare function signature. This function must return 1 if model1 is displayed before model2
 * within the list interval.
 *
 */
export type ModelCompareFunction = (model1: any, model2: any) => number;
