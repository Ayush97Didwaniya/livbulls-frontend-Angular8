import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services';
import { QuoteService } from '@app/shared_module/services/quotes.service';
import { FFSharedService } from '@app/shared_module/services/ff-shared.service';

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
              private ffSharedService: FFSharedService) {}

  ngOnInit() {
    console.log(this.userService.getAll());
    this.quoteForm = this.formBuilder.group({
      writter: ['', Validators.required],
      quotation: ['',  [Validators.required, Validators.minLength(10)]],
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.quoteForm.controls; }

  addQuote() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.quoteForm.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.quoteForm);
    this.quoteService.addQuote(this.quoteForm.value, '1')
    .subscribe(
        data => {
           debugger;
           this.ffSharedService.openAlertPopUp('Message', 'Quote added SuccessFully!');
           this.loading = false;
        },
        error => {
            debugger;
           this.ffSharedService.openAlertPopUp('Error', error.toString());
           this.loading = false;
        });
    console.log('quote add function called');
  }

  updateQuote() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.quoteForm.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.quoteForm);

    this.quoteService.updateQuote(this.quoteForm.value)
         .subscribe(
             data => {
               debugger;
                this.ffSharedService.openAlertPopUp('Message', 'Quote Updated SuccessFully!');
                this.loading = false;
             },
             error => {
                this.ffSharedService.openAlertPopUp('Error', error.toString());
                this.loading = false;
             });
    console.log('quote Update function called');
  }

  editPlans(termPlan) {
  /*   this.modalService.open(termPlan, { size: 'lg' }); */
  }

}
