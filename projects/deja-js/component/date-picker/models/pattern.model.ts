export interface Pattern {
    [character: string]: {
        pattern: RegExp;
        symbol?: string;
        optional?: boolean;
    };
}
