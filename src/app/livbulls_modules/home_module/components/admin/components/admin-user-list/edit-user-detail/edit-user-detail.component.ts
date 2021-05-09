import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminUserDataService } from '../../../services/admin-user-data.service';
import { AdminTermPlanDataService } from '../../../services/admin-term-plan-data.service';
import { UserCompleteDetail, UserLoginData } from '../../../modals/user.modal';
import { FormControl, FormGroup } from '@angular/forms';
import { AppInit } from '@app/core/adapter/services/app.init.service';
import { FFSharedService } from '@app/shared_module/services/ff-shared.service';
@Component({
  selector: 'app-edit-user-detail',
  templateUrl: './edit-user-detail.component.html',
  styleUrls: ['./edit-user-detail.component.css']
})
export class EditUserDetailComponent implements OnInit, OnDestroy {
  @Input() public dialogDataparam: UserLoginData;
  
  userCompleteDetails: UserCompleteDetail = new UserCompleteDetail();
  userDetailForm: FormGroup;

  termPlansForm= new FormControl();
  termPlansList= [];
  
  imageBaseUrl = AppInit.settings.image.image_base_Url;
  imageUrl: string;
  images: string;

  subscriber$: any;

  constructor(public activeModal: NgbActiveModal,
              public userDetailservice: AdminUserDataService,
              public termPlanDataService: AdminTermPlanDataService,
              public ffSharedService: FFSharedService
              ) { }

  ngOnInit() {
    debugger;
    this.userCompleteDetails.userLoginData = this.dialogDataparam;
    this.initializeFormGroup();
    this.getAllTermPlans();
    this.callUserDetailApi(this.dialogDataparam.userDetailRef);
  }

   // convenience getter for easy access to form fields
   get f() { return this.userDetailForm.controls; }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  initializeFormGroup() {
    this.userDetailForm = new FormGroup({
      userLoginData: new FormGroup({
        firstName: new FormControl(),
        lastName: new FormControl(),
        email: new FormControl(),
        username: new FormControl()
      }),
      userDetail: new FormGroup({
        contact: new FormControl(),
        parentUser_email: new FormControl(),
      })
    })
  }

  getAllTermPlans(): void {
    this.termPlanDataService.getAdmimTermPlan().subscribe(res=> {
      res.forEach(element => {
        this.termPlansList.push({name: element.planName, id: element.id.toString()});
      });
    }, err => {
      console.log(err);
    });
  }

  callUserDetailApi(userDetailRef: string) {
    this.subscriber$ = this.userDetailservice.getUserDetail(userDetailRef).subscribe(res=> {
      this.userCompleteDetails.userDetails = res;
      this.termPlansForm.setValue(res.term_plans);
      this.imageUrl = res.imageUrl;
      this.setFormData();
    })
  }

  setFormData() {
    console.log(this.userDetailForm.dirty);
    this.userDetailForm.patchValue({
      userLoginData:  this.userCompleteDetails.userLoginData
    });
    debugger;
    this.userDetailForm.patchValue({
      userDetail:  this.userCompleteDetails.userDetails
    });
    console.log(this.userDetailForm.dirty);
  }

  ngOnDestroy() {
    if(this.subscriber$) {
      this.subscriber$.unsubscribe();
    }
  }

  updateUserDetail() {
    debugger;
    console.log(this.termPlansForm.value);
    let userDetailChanged=true;
    if (!this.images && !this.userDetailForm.get('userDetail').dirty && !this.termPlansForm.dirty) {
      userDetailChanged =  false;
    }
    if(userDetailChanged) {
      const formData = new FormData();
      formData.append('id', this.dialogDataparam.userDetailRef);
      formData.append('file', this.images);
      formData.append('termPlans', this.termPlansForm.value);
      formData.append('parentUserMail', this.userDetailForm.get('userDetail').get('parentUser_email').value);
      formData.append('contact', this.userDetailForm.get('userDetail').get('contact').value);
      formData.append('imageUrl', this.imageUrl);
      this.userDetailservice.updateUserDetail(formData).subscribe(res=> {
        debugger;
      }, error => {
      //  this.ffSharedService.openAlertPopUp('Error', error, true, false);
      })
    }

    let userLoginDataChange = true;
    if(!this.userDetailForm.get('userLoginData').dirty) {
      userLoginDataChange = false;
    }
    if(userLoginDataChange) {

    }
    if(userDetailChanged && userLoginDataChange) {
      this.ffSharedService.openAlertPopUp('Error', 'Please update something first', true, false);
    } 
  }
}
