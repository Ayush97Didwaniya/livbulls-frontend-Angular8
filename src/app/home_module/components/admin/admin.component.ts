import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  quoteForm: FormGroup;
  loading = false;

  constructor(private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private userService: UserService) {}

  ngOnInit() {
    console.log(this.userService.getAll());
    this.quoteForm = this.formBuilder.group({
      author: ['', Validators.required],
      quote: ['', Validators.required],
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.quoteForm.controls; }


  onQuote() {

  }

  editPlans(termPlan) {
    this.modalService.open(termPlan, { size: 'lg' });
  }

}
