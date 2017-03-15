export declare class UnitValue {
    value: number;
    unit: string;
    static equals(s1: UnitValue, s2: UnitValue): boolean;
    constructor(value?: number | string, unit?: string);
    clone(): UnitValue;
    toString(): string;
    isInvalid(): boolean;
}
