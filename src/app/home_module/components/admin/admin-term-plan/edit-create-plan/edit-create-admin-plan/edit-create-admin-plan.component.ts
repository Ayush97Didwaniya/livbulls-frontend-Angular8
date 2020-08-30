import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-create-admin-plan',
  templateUrl: './edit-create-admin-plan.component.html',
  styleUrls: ['./edit-create-admin-plan.component.css']
})
export class EditCreateAdminPlanComponent implements OnInit {
  termPlanForm: FormGroup;
  addButtonActive = true;

  @Input() public dialogDataparam;

  constructor(private formBuilder: FormBuilder,
              public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.termPlanForm = this.formBuilder.group({
      planName : ['', Validators.required],
      description : ['', Validators.required],
      url: ['', Validators.required]
    });
    if ( this.dialogDataparam) {
      this.addButtonActive = false;
      this.termPlanForm.patchValue(this.dialogDataparam);
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.termPlanForm.controls; }

  addTermPlan() {
    console.log('add term plan');
  }

  updateTermPlan() {
    console.log('id', this.dialogDataparam.id);
    console.log('update Term Plan');
  }
}
