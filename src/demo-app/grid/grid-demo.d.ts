import { OnInit } from '@angular/core';
import { DejaGridRowsEvent, IDejaDragEvent, IDejaGridColumn } from '../../component';
import { DrugsService } from '../services/drugs.service';
export declare class GridDemoComponent implements OnInit {
    private drugsService;
    protected columns: IDejaGridColumn[];
    protected percentColumns: IDejaGridColumn[];
    protected responsiveColumns: IDejaGridColumn[];
    protected tabIndex: number;
    protected drugCounts: number;
    private drugsBigRecord$;
    private drugs$;
    private groupedDrugs$;
    private selectedItems;
    private gridComponent;
    constructor(drugsService: DrugsService);
    ngOnInit(): void;
    protected onSelectionChanged(e: DejaGridRowsEvent): void;
    protected onSelectionChanged2(): void;
    protected onSelectionChanged3(): void;
    protected onItemDragStart(event: IDejaDragEvent): void;
    protected onDivDragOver(event: IDejaDragEvent): void;
    protected onDivDropEvent(event: IDejaDragEvent): void;
    protected showMoreReaction(): void;
    protected onSuffixClicked(): void;
}
