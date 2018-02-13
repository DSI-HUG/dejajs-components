import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DejaComboListActionbarComponent } from './combo-list-actionbar.component';

describe('ComboListActionbarComponent', () => {
  let component: DejaComboListActionbarComponent;
  let fixture: ComponentFixture<DejaComboListActionbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DejaComboListActionbarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DejaComboListActionbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
