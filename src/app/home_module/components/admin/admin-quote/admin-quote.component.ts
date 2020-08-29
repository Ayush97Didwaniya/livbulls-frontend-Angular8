import { Component, OnInit } from '@angular/core';
import { QuoteService } from '@app/shared_module/services/quotes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FFSharedService } from '@app/shared_module/services/ff-shared.service';

@Component({
  selector: 'app-admin-quote',
  templateUrl: './admin-quote.component.html',
  styleUrls: ['./admin-quote.component.css']
})
export class AdminQuoteComponent implements OnInit {
  quoteForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(private quoteService: QuoteService,
              private formBuilder: FormBuilder,
              private ffSharedService: FFSharedService) {}
  ngOnInit() {
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
           this.ffSharedService.openAlertPopUp('Message', 'Quote added SuccessFully!', true, false);
           this.loading = false;
        },
        error => {
           this.ffSharedService.openAlertPopUp('Error', error.toString(), true, false);
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
                this.ffSharedService.openAlertPopUp('Message', 'Quote Updated SuccessFully!', true, false);
                this.loading = false;
             },
             error => {
                this.ffSharedService.openAlertPopUp('Error', error.toString(), true, false);
                this.loading = false;
             });
    console.log('quote Update function called');
  }

}
