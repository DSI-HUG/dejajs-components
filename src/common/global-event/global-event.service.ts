import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {GlobalEventEmmitter} from "./global-event-emmitter";

@Injectable()
export class GlobalEventService {
    private globalEventEmmitter: GlobalEventEmmitter;

    constructor() {
        this.globalEventEmmitter = GlobalEventEmmitter.instance;
    }

    public register(event: string) {
        return new Observable<any[]>(observer => {
            this.globalEventEmmitter.on(event, (params: any[]) => {
                console.log('message received: ' + event + '  params: ' + params[0]);
                observer.next(params);
            });
        });
    }
}
