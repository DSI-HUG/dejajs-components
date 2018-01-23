import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DejaPopupComponent } from './popup-box.component';

describe('DpidialogBoxComponent', () => {
  let component: DejaPopupComponent;
  let fixture: ComponentFixture<DejaPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DejaPopupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DejaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
