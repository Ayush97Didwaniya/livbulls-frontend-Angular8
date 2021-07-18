import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SendEmailService } from '../../services/send-email.service';

@Component({
  selector: 'app-contact-us',
templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  isSuccess = false;
  isError = false;
  contactUsForm: FormGroup;
  submitted = false;

  constructor(private sendEmailService: SendEmailService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.contactUsForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      message: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.contactUsForm.controls; }

  onSubmit() {
    this.submitted = true;
    if(this.contactUsForm.invalid) {
      return;
    }
    this.sendEmailService.sendEmail(this.contactUsForm.value).subscribe(res=> {
      this.contactUsForm.reset();
      this.isSuccess = true;
      this.submitted = false;
    }, err => {
      this.contactUsForm.reset();
      this.isError = true;
      this.submitted = false;
    })
  //  this.sendEmailService.sendEmail()
  }

}
