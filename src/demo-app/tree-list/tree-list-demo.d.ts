import { OnInit } from '@angular/core';
import { GroupingService, IItemTree, ViewportMode } from '../../common/core';
import { DejaTextMetricsService, DejaTreeListItemsEvent, IDejaMouseDraggableContext, IDejaMouseDroppableContext, IDejaDragEvent } from '../../component';
import { CountriesService, ICountry } from '../services/countries.service';
export declare class DejaTreeListDemoComponent implements OnInit {
    private countriesService;
    private textMetricsService;
    protected variableMode: ViewportMode;
    protected noViewportMode: ViewportMode;
    protected noViewportList: IItemTree[];
    private groupedCountries;
    private countries;
    private selectedCountries;
    private selectedItemsOut;
    private selectedInfos;
    private loremList;
    private groupedTreeList;
    private treeList;
    constructor(countriesService: CountriesService, groupingService: GroupingService, textMetricsService: DejaTextMetricsService);
    ngOnInit(): void;
    protected onSelectionChanged(e: DejaTreeListItemsEvent): void;
    protected onSelectBusinessObject(e: ICountry[]): void;
    protected onItemDragStart(event: IDejaDragEvent): void;
    protected onDivDragOver(event: IDejaDragEvent): void;
    protected onDivDropEvent(event: IDejaDragEvent): void;
    protected onSuffixClicked(): void;
    protected getDragContext(): IDejaMouseDraggableContext;
    protected getDropContext(dropArea: HTMLElement): IDejaMouseDroppableContext;
}
