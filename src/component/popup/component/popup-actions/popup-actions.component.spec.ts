import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DejaPopupActionsComponent } from './popup-actions.component';

describe('DpidialogActionsComponent', () => {
  let component: DejaPopupActionsComponent;
  let fixture: ComponentFixture<DejaPopupActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DejaPopupActionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DejaPopupActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
