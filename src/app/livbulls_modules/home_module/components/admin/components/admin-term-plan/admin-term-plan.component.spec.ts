import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTermPlanComponent } from './admin-term-plan.component';

describe('AdminTermPlanComponent', () => {
  let component: AdminTermPlanComponent;
  let fixture: ComponentFixture<AdminTermPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTermPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTermPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
