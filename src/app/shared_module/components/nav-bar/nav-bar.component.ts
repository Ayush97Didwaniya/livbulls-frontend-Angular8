import { Component, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { User } from 'src/app/_models';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  toggle:Boolean = false;
  @Output('tabClicked') tabClicked = new EventEmitter<string>();
  
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
    });
    }

  ngOnInit() {
  }

  dropdownToggle(){
    this.toggle = !this.toggle;
  }
  
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/welcome']);
  } 
  
  sendMessageToParent (tabName: string) {
    console.log(tabName);
    this.tabClicked.emit(tabName);
  }

}
