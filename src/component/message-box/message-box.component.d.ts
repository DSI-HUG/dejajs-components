import { OnInit } from '@angular/core';
export declare class DejaMessageBoxComponent implements OnInit {
    type: 'info' | 'primary' | 'success' | 'warn' | 'danger';
    title: string;
    icon: string;
    actions: Array<{
        text?: string;
        type?: 'info' | 'primary' | 'success' | 'warn' | 'danger';
        icon?: string;
        action: () => any;
    }>;
    protected actionsTemplate: any;
    private _horizontal;
    horizontal: boolean;
    constructor();
    ngOnInit(): void;
    private getIconFromType(type);
}
