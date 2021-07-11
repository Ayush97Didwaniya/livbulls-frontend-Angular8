import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminTermPlanDataService } from '../../../services/admin-term-plan-data.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AppInit } from '@app/core/adapter/services/app.init.service';
import { FFSharedService } from '@app/shared_module/services/ff-shared.service';
import { HttpParams } from '@angular/common/http';
import { AdminUserDataService } from '@app/livbulls_modules/home_module/services/admin-user-data.service';
import { UserCompleteDetail, UserLoginData } from '@app/livbulls_modules/home_module/models/user.modal';
@Component({
  selector: 'app-edit-user-detail',
  templateUrl: './edit-user-detail.component.html',
  styleUrls: ['./edit-user-detail.component.css']
})
export class EditUserDetailComponent implements OnInit, OnDestroy {
  @Input() public dialogDataparam: UserLoginData;
  
  userCompleteDetails: UserCompleteDetail = new UserCompleteDetail();
  userDetailForm: FormGroup;

  termPlansList= [];
  
  imageBaseUrl = AppInit.settings.image.image_base_Url;
  imageUrl: string;
  images: string;

  subscriber$: any;

  userDetailApiCalled = false;
  userLoginApiCalled = false;

  constructor(public activeModal: NgbActiveModal,
              public userDetailservice: AdminUserDataService,
              public termPlanDataService: AdminTermPlanDataService,
              public ffSharedService: FFSharedService
              ) { }

  ngOnInit() {
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
        term_plans: new FormControl()
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
      this.imageUrl = res.imageUrl;
      this.setFormData();
    })
  }

  setFormData() {
    this.userDetailForm.patchValue({
      userLoginData:  this.userCompleteDetails.userLoginData
    });

    this.userDetailForm.patchValue({
      userDetail:  this.userCompleteDetails.userDetails
    });
  }

  ngOnDestroy() {
    if(this.subscriber$) {
      this.subscriber$.unsubscribe();
    }
  }

  updateUserDetail() {
    let userDetailChanged=true;
    if (!this.images && !this.userDetailForm.get('userDetail').dirty) {
      userDetailChanged =  false;
    }
    if(userDetailChanged) {
      const formData = new FormData();
      formData.append('id', this.dialogDataparam.userDetailRef);
      formData.append('file', this.images);
      formData.append('termPlans', this.userDetailForm.get('userDetail').get('term_plans').value);
      formData.append('parentUserMail', this.userDetailForm.get('userDetail').get('parentUser_email').value);
      formData.append('contact', this.userDetailForm.get('userDetail').get('contact').value);
      formData.append('imageUrl', this.imageUrl);
      this.userDetailservice.updateUserDetail(formData).subscribe(res=> {
        this.userDetailApiCalled = true;
        this.showSuccessPopup();
      }, error => {
        this.userDetailApiCalled = true;
        this.showErrorPopup();
      })
    } else {
      this.userDetailApiCalled = true;
    }

    let userLoginDataChange = true;
    if(!this.userDetailForm.get('userLoginData').dirty) {
      userLoginDataChange = false;
    }
    if(userLoginDataChange) {
      const loginData = this.userDetailForm.get('userLoginData');
      const params = new HttpParams().append('username', loginData.get('username').value)
      .append('firstName', loginData.get('firstName').value)
      .append('lastName', loginData.get('lastName').value)
      .append('email', loginData.get('email').value)
      
      this.userDetailservice.updateUserLoginData(this.dialogDataparam.id, params).subscribe(res=> {
        this.userLoginApiCalled = true;
        this.showSuccessPopup();
      }, error => {
        this.userLoginApiCalled = true;
        this.showErrorPopup();
      })
    } else {
      this.userLoginApiCalled = true;
    }
    if(!userDetailChanged && !userLoginDataChange) {
      this.ffSharedService.openAlertPopUp('Error', 'Please update something first', true, false);
    } 
  }

  showSuccessPopup() {
    if(this.userDetailApiCalled && this.userLoginApiCalled) {
      const successRef = this.ffSharedService.openAlertPopUp('Success', 'user Detail updated successfully,', true, false);
      successRef.result.then(data=> {
        if(data && data === 'ok') {
          this.activeModal.close('updated');
        }
      });
    }
  }

  showErrorPopup() {
    if(this.userDetailApiCalled && this.userLoginApiCalled) {
      this.ffSharedService.openAlertPopUp('Error', 'User Detail Not updated.', true, false);
    }
  }
}
