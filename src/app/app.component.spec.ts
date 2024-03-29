import { TestBed, waitForAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            imports: [
                AppModule
            ]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const app = fixture.debugElement.componentInstance;
        void expect(app).toBeTruthy();
    });

    it('should have as title \'dejajs-component\'', () => {
        const fixture = TestBed.createComponent(AppComponent);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const app = fixture.debugElement.componentInstance;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        void expect(app.title).toEqual('dejajs-component');
    });

    it('should render title in a h1 tag', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement as HTMLElement;
        void expect(compiled.querySelector('h1').textContent).toContain('Welcome to dejajs-component!');
    });
});
