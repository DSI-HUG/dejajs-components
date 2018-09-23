import { Injectable } from '@angular/core';

@Injectable()
export class DejaSidenavService {

    public opened: boolean;
    public mode: 'over' | 'side' = 'side';
    public hidden = false;

    constructor() { }

    public open(): void {
        this.opened = true;
    }

    public close(): void {
        this.opened = false;
    }

    public toggle(): void {
        this.opened = !this.opened;
    }

}
