import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DejaPopupTrayComponent } from './popup-tray.component';

describe('DpidialogTrayComponent', () => {
  let component: DejaPopupTrayComponent;
  let fixture: ComponentFixture<DejaPopupTrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DejaPopupTrayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DejaPopupTrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
