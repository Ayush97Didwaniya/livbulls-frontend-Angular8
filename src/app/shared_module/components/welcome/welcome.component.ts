import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private modalService: NgbModal,
    private router: Router) { }

  ngOnInit() {
  }

  
  openLogin() {
    const modalRef = this.modalService.open(LoginComponent, { centered: true });
    modalRef.componentInstance.name = 'Login';
    modalRef.result.then((result) => {
      if (result) {
        this.router.navigate([result]);
      }
    }).catch((res) => {});;
  }
  
  openRegister(){
    const modalRef = this.modalService.open(RegisterComponent, { centered: true });
    modalRef.componentInstance.name = 'Register';
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    }).catch((res) => {});;
}
}
