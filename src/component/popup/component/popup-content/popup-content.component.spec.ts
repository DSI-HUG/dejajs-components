import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DejaPopupContentComponent } from './popup-content.component';

describe('DpidialogContentComponent', () => {
  let component: DejaPopupContentComponent;
  let fixture: ComponentFixture<DejaPopupContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DejaPopupContentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DejaPopupContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
