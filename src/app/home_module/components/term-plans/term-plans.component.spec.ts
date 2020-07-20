import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermPlansComponent } from './term-plans.component';

describe('TermPlansComponent', () => {
  let component: TermPlansComponent;
  let fixture: ComponentFixture<TermPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermPlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
