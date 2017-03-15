export declare class MonacoEditorService {
    private _loading;
    private _loader;
    constructor();
    initMonacoLib(monacoLibPath: string): Promise<any>;
    private init(monacoLibPath);
}
