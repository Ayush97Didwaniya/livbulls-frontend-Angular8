import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { QuoteService } from '@app/shared_module/services/quotes.service';
import { QuoteResponse, QuoteAdapter } from '@app/shared_module/models/quote.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  quote: QuoteResponse = new QuoteResponse();
  loginModalRef: any;
  constructor(private modalService: NgbModal,
              private quoteService: QuoteService,
              private router: Router,
              private quoteAdapter: QuoteAdapter) { }

  ngOnInit() {
    this.callAPIS();
  }

  callAPIS() {
    this.quoteService.getQuote().subscribe((result: any) => {
      this.quote = this.quoteAdapter.adapt(result);
    }, err => {
      console.log(err);
    });
  }

  openLogin() {
    this.loginModalRef = this.modalService.open(LoginComponent, { centered: true });
   // this.loginModalRef.componentInstance.navigateToPath = 'admin';
    this.loginModalRef.result.then((result) => {
       if (result) {
          this.router.navigate([result]);
       }
      }).catch((err) => {
        console.log(err);
      });
    }


  openRegister() {
    const modalRef = this.modalService.open(RegisterComponent, { centered: true });
    modalRef.componentInstance.name = 'Register';
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    }).catch((res) => {});
}

}
