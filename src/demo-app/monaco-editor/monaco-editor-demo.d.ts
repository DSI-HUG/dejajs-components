import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEditorLanguage } from '../../component/monaco-editor/options/editor-language.model';
import { IEditorTheme } from '../../component/monaco-editor/options/editor-theme.component';
export declare class DejaMonacoEditorDemoComponent implements OnInit {
    private route;
    protected language: IEditorLanguage;
    protected languageJson: IEditorLanguage;
    protected xmlContent: string;
    protected xmlContentToCompare: string;
    protected jsonContent: string;
    protected jsonContentToCompare: string;
    protected theme: IEditorTheme;
    constructor(route: ActivatedRoute);
    ngOnInit(): void;
    onValueChange(): void;
    onValueToCompareChange(): void;
}
