import { Component } from '@angular/core';
import { User } from './_models';
import { AuthenticationService } from './_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LoginComponent } from './shared_module/components/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;

  constructor(
      private authenticationService: AuthenticationService,
      private modalService: NgbModal,
      private router: Router
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  
  ngOnInit() {
  }

  
  openLogin() {
    const modalRef = this.modalService.open(LoginComponent);
    modalRef.componentInstance.name = 'Login';
    modalRef.result.then((result) => {
      if (result) {
        this.router.navigate([result]);
      }
    });
  }

  routeOnTab(tabName: string) {
    this.router.navigate(['/' + tabName ]);
  }
  
}
