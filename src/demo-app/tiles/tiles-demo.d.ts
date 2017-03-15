import { OnInit } from '@angular/core';
import { DejaTilesAddEvent, DejaTilesRemoveEvent, IDejaMouseDraggableContext, IDejaMouseDroppableContext } from '../../component';
import { CountriesService } from '../services/countries.service';
export declare class TilesDemoComponent implements OnInit {
    private countriesService;
    protected tabIndex: number;
    protected designMode: boolean;
    private messages$;
    private message$;
    private tiles1$;
    private tiles2$;
    constructor(countriesService: CountriesService);
    protected readonly debug: any;
    ngOnInit(): void;
    protected getDragContext(): IDejaMouseDraggableContext;
    protected getDropContext(dropArea: HTMLElement): IDejaMouseDroppableContext;
    protected onContentAdding(event: DejaTilesAddEvent): void;
    protected onContentRemoving(event: DejaTilesRemoveEvent): void;
}
