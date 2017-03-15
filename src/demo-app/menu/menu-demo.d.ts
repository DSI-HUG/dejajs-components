export declare class MenuDemoComponent {
    selected: string;
    items: ({
        text: string;
    } | {
        text: string;
        disabled: boolean;
    })[];
    protected tabIndex: number;
    select(text: string): void;
}
