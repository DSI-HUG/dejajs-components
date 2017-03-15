export declare class AutoCompleteItem {
    label: string;
    kind: number;
    documentation: string;
    insertText: string;
    constructor();
    setLabel(label: string): AutoCompleteItem;
    setKind(kind: number): AutoCompleteItem;
    setDocumentation(documentation: string): AutoCompleteItem;
    setInsertText(insertText: string): AutoCompleteItem;
}
