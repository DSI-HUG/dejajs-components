import { EventEmitter } from '@angular/core';
import { IDejaDragEvent, IDejaDropEvent } from '../../index';
import { IDejaGridColumn, IDejaGridGroupsEvent } from '../index';
export declare class DejaGridGroupAreaComponent {
    groupsChanged: EventEmitter<IDejaGridGroupsEvent>;
    groupRemoved: EventEmitter<IDejaGridGroupsEvent>;
    private _groups;
    private columnGroupKey;
    private groupGroupKey;
    groups: IDejaGridColumn[];
    constructor();
    protected getDragContext(group: IDejaGridColumn): {
        dragendcallback: (event: IDejaDragEvent) => void;
        dragstartcallback: (event: IDejaDragEvent) => void;
    };
    protected getDropContext(): {
        dragovercallback: (event: IDejaDropEvent) => void;
        dropcallback: (event: IDejaDropEvent) => void;
    };
    protected removeGroup(event: Event, index: number): boolean;
    protected getGroupColumnFromHTMLElement(element: HTMLElement): IDejaGridColumn;
    private getGroupElementFromHTMLElement(element);
}
