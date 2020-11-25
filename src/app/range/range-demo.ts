/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { DejaRangeComponent, IStepRangeEvent, Range } from '@deja-js/component/range';
import { from, Observable } from 'rxjs';
import { defaultIfEmpty, map, scan } from 'rxjs/operators';

import { ranges, rangesWithInterval, readOnlyRanges, steps, weights } from './ranges.mock';
import { IWeight, Weight } from './weight.interface';

interface Error {
    gate: boolean;
    message: string;
}

@Component({
    selector: 'deja-range-demo',
    styleUrls: ['./range-demo.scss'],
    templateUrl: './range-demo.html'
})
export class DejaRangeDemoComponent {
    @Output() public readonly errorFeed = new EventEmitter();

    @ViewChild('dejaRange') public rangeRef: DejaRangeComponent;
    @ViewChild('dejaWeight') public weightRef: DejaRangeComponent;

    public tabIndex = 1;
    public readOnlyRanges: Range[];
    public rangesWithInterval: Range[];
    public steps: number[];
    public ranges: Range[];
    public numericStep = 1;
    public weights: Weight[];

    public errors$: Observable<Error[]>;

    public constructor() {
        this.readOnlyRanges = readOnlyRanges;
        this.rangesWithInterval = rangesWithInterval;
        this.ranges = ranges;

        this.weights = weights;
        this.steps = steps;

        this.computeRangeFromWeight();

        // error management
        this.errors$ = from(this.errorFeed).pipe(
            map((error: Error) => ({
                gate: true,
                message: error.message
            })),
            scan((acc, cur) => [...acc, cur], [] as Error[]),
            defaultIfEmpty([])
        );
    }

    /**
     * compute range min and max from weight value
     *
     * @private
     *
     * @memberOf DejaRangeDemoComponent
     */
    public computeRangeFromWeight(): void {
        let min = 0;

        this.weights = this.weights
            .map((weight: Weight) => {
                const weightDifference = weight.maxWeight - weight.minWeight;
                const rangeDifference = Math.log(4 * weightDifference);

                weight.min = min;
                weight.max = min + rangeDifference;

                min += rangeDifference;

                return weight;
            });
    }

    /**
     * compute next step for the weights (rounded to one)
     *
     * @public
     * @param {IStepRangeEvent} event
     * @returns
     *
     * @memberOf DejaRangeDemoComponent
     */
    public stepFn(event: IStepRangeEvent): number {

        const weight = event.ranges[event.index] as IWeight;

        const isLastWeight = event.ranges.length - 1 === event.index;

        const rangeDifference = event.newMax - weight.min;
        const weightDifference = Math.E ** (rangeDifference) / 4;
        let maxWeight = weight.minWeight + weightDifference;

        maxWeight = Math.round(maxWeight);
        maxWeight = Math.max(maxWeight, weight.minWeight + 1);

        if (!isLastWeight) {
            const nextWeight = event.ranges[event.index + 1] as IWeight;
            maxWeight = Math.min(maxWeight, nextWeight.maxWeight - 1);
            nextWeight.minWeight = maxWeight;
            weight.maxWeight = maxWeight;
        }

        const newRangeMax = weight.min + Math.log(4 * (maxWeight - weight.minWeight));

        return newRangeMax;
    }

    public remove(index: number): void {
        if (this.weights.length >= 2) {

            const weight = this.weights
                .find((_w: Weight, i: number) => index === i);

            const wgts = this.weights
                .filter((_w: Weight, i: number) => index !== i);

            if (index > 0) {
                wgts[index - 1].maxWeight = weight.maxWeight;
            }

            this.weights = wgts;

            this.weightRef.selected = 0;
            this.computeRangeFromWeight();
        }
    }

    public add(index: number): void {
        const weight = this.weights
            .find((_w: Weight, i: number) => index === i);

        const weightDifference = weight.maxWeight - weight.minWeight;
        if (weightDifference >= 2) {

            const leftWeight = new Weight(weight.minWeight, weight.minWeight + weightDifference / 2);

            weight.minWeight = weight.minWeight + weightDifference / 2;
            const leftWeights = index !== 0 ? this.weights.slice(0, index) : [];
            const rightWeights = index < this.weights.length ? this.weights.slice(index + 1) : [];
            this.weights = [...leftWeights, leftWeight, weight, ...rightWeights];

            this.weightRef.selected = 0;
            this.computeRangeFromWeight();
        }
    }

    /**
     * increase the maximum of the biggest weight
     *
     * @private
     *
     * @memberOf DejaRangeDemoComponent
     */
    public increase(): void {
        this.weights[this.weights.length - 1].maxWeight++;
        this.computeRangeFromWeight();
    }

    /**
     * decrease the minimum of the smallest weight
     *
     * @private
     *
     * @memberOf DejaRangeDemoComponent
     */
    public decrease(): void {
        if (this.weights[0].minWeight > 0) {
            this.weights[0].minWeight--;
            this.computeRangeFromWeight();
        }
    }
}
