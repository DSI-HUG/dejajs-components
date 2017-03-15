export declare class DejaClipboardService {
    private clipboard;
    get(key: string): any;
    set(key: string, value: any): void;
    isAvailable(key: string): boolean;
    clear(): void;
}
