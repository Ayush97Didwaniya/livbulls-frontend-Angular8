import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreateAdminPlanComponent } from './edit-create-admin-plan.component';

describe('EditCreateAdminPlanComponent', () => {
  let component: EditCreateAdminPlanComponent;
  let fixture: ComponentFixture<EditCreateAdminPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCreateAdminPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCreateAdminPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
