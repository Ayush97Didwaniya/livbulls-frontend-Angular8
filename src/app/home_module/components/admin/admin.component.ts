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
                const dialogRef = this.ffSharedService.openAlertPopUp('avav', 'asdas');
                this.loading = false;
             },
             error => {
                const dialogRef = this.ffSharedService.openAlertPopUp('avav', 'asdas');
                this.loading = false;
             });
    console.log('quote Update function called');
  }

  editPlans(termPlan) {
  /*   this.modalService.open(termPlan, { size: 'lg' }); */
  }

}
