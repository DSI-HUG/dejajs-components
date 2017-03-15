import { AutoCompleteItem } from './auto-complete-item.model';
import { IEditorLanguage } from './editor-language.model';
export declare class AutoCompleteSingleton {
    private static instance;
    private _autoCompleteValues;
    static getInstance(): AutoCompleteSingleton;
    readonly autoCompleteValues: {
        [p: string]: AutoCompleteItem[];
    };
    private constructor();
    initAutoComplete(language: IEditorLanguage): void;
    parseAutoCompleteValues(language: IEditorLanguage, content: string): AutoCompleteItem[];
    private parseXmlAutoComplete(content);
    private parseJsonAutoComplete(content);
}
