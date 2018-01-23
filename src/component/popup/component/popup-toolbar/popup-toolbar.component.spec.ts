import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DejaPopupToolbarComponent } from './popup-toolbar.component';

describe('DpidialogToolbarComponent', () => {
  let component: DejaPopupToolbarComponent;
  let fixture: ComponentFixture<DejaPopupToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DejaPopupToolbarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DejaPopupToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
