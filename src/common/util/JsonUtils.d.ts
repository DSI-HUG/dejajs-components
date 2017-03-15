export declare class JsonUtils {
    private static mapCaches;
    static deserializeJson<T>(obj: T, jsonObj: any): T;
    static deserializeJson2<T>(clazz: {
        new (): T;
    }, sourceObj: any, caseTransform?: boolean): T;
    static deserializeJsonList<T>(clazz: {
        new (): T;
    }, sourceList: any[], caseTransform?: boolean): T[];
    static toMap(objList: any[], idFieldName?: string): any;
    static getOneFrom(listPromise: Promise<any>, id: string, cacheName: string, idFieldName?: string): Promise<any>;
}
