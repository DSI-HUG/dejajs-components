import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboListChildComponent } from './combo-list-child.component';

describe('ComboListChildComponent', () => {
  let component: ComboListChildComponent;
  let fixture: ComponentFixture<ComboListChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboListChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboListChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
