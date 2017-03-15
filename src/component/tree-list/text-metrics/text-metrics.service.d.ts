import { Observable } from 'rxjs/Rx';
export declare class DejaTextMetricsService {
    private canvas;
    private elemObservable;
    private computedStyles;
    private charSize$;
    constructor();
    metricsElem: HTMLElement;
    getTextWidth(text: string, elem: HTMLElement): number;
    getTextMaxWidth(texts: string[], elem: HTMLElement): number;
    getTextHeight(maxWidth: number, text: string): Observable<number>;
    private getNumberOfLines(maxWidth, text);
}
