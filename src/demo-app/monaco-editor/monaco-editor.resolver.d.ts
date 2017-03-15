import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { MonacoEditorDemoService } from './monaco-editor-demo.service.';
export declare class MonacoEditorXmlFileResolver implements Resolve<any> {
    private _fileService;
    constructor(_fileService: MonacoEditorDemoService);
    resolve(): Observable<any>;
}
export declare class MonacoEditorXmlToCompareFileResolver implements Resolve<any> {
    private _fileService;
    constructor(_fileService: MonacoEditorDemoService);
    resolve(): Observable<any>;
}
export declare class MonacoEditorJsonFileResolver implements Resolve<any> {
    private _fileService;
    constructor(_fileService: MonacoEditorDemoService);
    resolve(): Observable<any>;
}
export declare class MonacoEditorJsonToCompareFileResolver implements Resolve<any> {
    private _fileService;
    constructor(_fileService: MonacoEditorDemoService);
    resolve(): Observable<any>;
}
