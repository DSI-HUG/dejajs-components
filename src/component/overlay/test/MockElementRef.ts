import {ElementRef} from '@angular/core';

export class MockElementRef extends ElementRef {
    constructor() { super(null);
        this.nativeElement = {
            getBoundingClientRect() {
                return { top : 0, left: 0};
            }
        };
    }
}
