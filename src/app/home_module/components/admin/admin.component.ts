import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService, AlertService } from 'src/app/_services';
import { QuoteService } from '@app/shared_module/services/quotes.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  quoteForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
              private formBuilder: FormBuilder,
              private userService: UserService,
              private quoteService: QuoteService,
              private alertService: AlertService) {}

  ngOnInit() {
    console.log(this.userService.getAll());
    this.quoteForm = this.formBuilder.group({
      writter: ['', Validators.required],
      quotation: ['',  [Validators.required, Validators.minLength(10)]],
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.quoteForm.controls; }


  updateQuote() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.quoteForm.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.quoteForm);
    debugger;
    this.quoteService.updateQuote(this.quoteForm.value)
         .subscribe(
             data => {
                 this.alertService.success('Quote Updated successfully', true);
                 this.loading = false;
             },
             error => {
                 this.alertService.error(error);
                 this.loading = false;
             });
    console.log('quote Update function called');
  }

  editPlans(termPlan) {
  /*   this.modalService.open(termPlan, { size: 'lg' }); */
  }

}
