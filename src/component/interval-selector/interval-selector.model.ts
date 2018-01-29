export class IntervalSelectorData {

    constructor(public intervalId: string, public model: any) {
    }
}

export class IntervalBoundary {

    constructor(public intervalId: string, public model: any, public openingBoundary: boolean, public selected: boolean, public forceSelection: boolean) {
    }
}

export class Interval {
    public openingBoundary: IntervalBoundary;
    public closingBoundary: IntervalBoundary;

    constructor(public intervalId: string, public compareFunction: Function, public enabled = true) {
    }

    public getBoundary(openingBoundary: boolean, model: any) {
        if (openingBoundary) {
            if (this.openingBoundary && this.openingBoundary.model === model) {
                return this.openingBoundary;
            } else if (!model) {
                return this.openingBoundary;
            }
        } else {
            if (this.closingBoundary && model && this.closingBoundary.model === model) {
                return this.closingBoundary;
            } else if (!model) {
                return this.closingBoundary;
            }
        }
        return null;
    }

    public compare(model1: any, model2: any): number {
        return this.compareFunction(model1, model2);
    }

    public deselectBoundary(openingBoundary?: boolean, model?: any) {
        if (openingBoundary === undefined) {
            this.deselectBoundary(true);
            this.deselectBoundary(false);
        } else {
            const boundary: IntervalBoundary = this.getBoundary(openingBoundary, model);
            if (boundary) {
                boundary.selected = false;
            }
        }
    }
}

export class IntervalSelectorEventData {

    constructor(public intervalId: string, public model: any, public openingBoundary: boolean, public selected: boolean, public bothOpeningAndClosingBoundary = false) {
    }
}
