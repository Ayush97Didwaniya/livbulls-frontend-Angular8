import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FFSharedService } from '@app/shared_module/services/ff-shared.service';
import { AdminTermPlanDataService } from '@app/home_module/services/admin-term-plan-data.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-edit-create-admin-plan',
  templateUrl: './edit-create-admin-plan.component.html',
  styleUrls: ['./edit-create-admin-plan.component.css'],
})
export class EditCreateAdminPlanComponent implements OnInit {
  termPlanForm: FormGroup;
  addButtonActive = true;
  images;
  submitted = false;

  @Input() public dialogDataparam;

  constructor(private formBuilder: FormBuilder,
              public activeModal: NgbActiveModal,
              public termPlanDataservice: AdminTermPlanDataService,
              private ffSharedService: FFSharedService) { }

  ngOnInit() {
    this.termPlanForm = this.formBuilder.group({
      planName : ['', Validators.required],
      description : ['', Validators.required]
    });
    /* if (this.dialogDataparam) {
      this.addButtonActive = false;
      this.termPlanForm.patchValue(this.dialogDataparam);
    } */
  }

  // convenience getter for easy access to form fields
  get f() { return this.termPlanForm.controls; }

  selectImage(event) {
    debugger;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  addTermPlan() {
    console.log(this.termPlanForm);
    this.submitted = true;
    // stop here if form is invalid
    if (this.termPlanForm.invalid) {
      return;
    }

    const formData = new FormData();
    if (!this.images) {
      this.ffSharedService.openAlertPopUp('Error', 'Please upload any image', true, false);
    }
    formData.append('file', this.images);
    formData.append('planName', this.termPlanForm.get('planName').value);
    formData.append('description', this.termPlanForm.get('description').value);
    debugger;
    this.termPlanDataservice.addTermPlan(formData).subscribe(result => {
      console.log(result);
    }, error => {
      debugger;
      this.ffSharedService.openAlertPopUp('Error', error, true, false);
    });
  }

  updateTermPlan() {
    console.log(this.termPlanForm);
    debugger;
    console.log('id', this.dialogDataparam.id);
    console.log('update Term Plan');
  }
}
