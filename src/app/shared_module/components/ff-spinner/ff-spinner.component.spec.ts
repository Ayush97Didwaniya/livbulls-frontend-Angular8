import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FFSpinnerComponent } from './ff-spinner.component';

describe('WfmSpinnerComponent', () => {
  let component: FFSpinnerComponent;
  let fixture: ComponentFixture<FFSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FFSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FFSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
