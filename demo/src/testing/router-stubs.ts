
import { Component, Directive, HostListener, Injectable, Input } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// export for convenience.
export { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';

@Directive({
    selector: '[routerLink]',
})
export class RouterLinkStubDirective {
    @Input('routerLink') public linkParams: any;
    public navigatedTo: any = null;

    @HostListener('click')
    public onClick() {
        this.navigatedTo = this.linkParams;
    }
}

@Directive({
    selector: '[routerLinkActive]'
})
export class RouterLinkActiveStubDirective {
    @Input('routerLinkActive') public linkParams: any;
}

@Component({ selector: 'router-outlet', template: '' })
export class RouterOutletStubComponent { }

@Injectable()
export class RouterStub {
    public navigate(commands: any[], extras?: NavigationExtras) { }
}

@Injectable()
export class ActivatedRouteStub {

    // ActivatedRoute.params is Observable
    private subject = new BehaviorSubject(this.testParams);
    public params = this.subject.asObservable();

    // Test parameters
    private _testParams: {};
    get testParams() { return this._testParams; }
    set testParams(params: {}) {
        this._testParams = params;
        this.subject.next(params);
    }

    // ActivatedRoute.snapshot.params
    get snapshot() {
        return { params: this.testParams };
    }
}
