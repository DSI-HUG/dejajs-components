import { OnInit } from '@angular/core';
export declare class MessageBoxDemoComponent implements OnInit {
    protected tabIndex: number;
    protected toolTipModel: {
        text: string;
    };
    protected actions: ({
        action: () => void;
        text: string;
        type: string;
    } | {
        action: () => void;
        text: string;
    } | {
        action: () => void;
        type: string;
    })[];
    protected closeAction: {
        action: () => void;
        icon: string;
    }[];
    private dialogVisible;
    private messages;
    constructor();
    ngOnInit(): void;
}
