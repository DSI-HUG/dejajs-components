/// <reference path="typings/global-event-emmitter.d.ts" />
export declare class GlobalEventEmmitter implements IGlobalEventEmmitter {
    private static _instance;
    static readonly instance: GlobalEventEmmitter;
    private _callbacks;
    off: (event: any, fn: any) => this;
    removeListener: (event: any, fn: any) => this;
    removeAllListeners: () => this;
    removeEventListener: (event?: string, fn?: () => void) => this;
    emit: (event: string, ...params: any[]) => this;
    listeners: (event: any) => any;
    hasListeners: (event: any) => boolean;
    on: (event: string, fn: (params: any[]) => void) => this;
    addEventListener: (event: string, fn: (params: any[]) => void) => this;
}
