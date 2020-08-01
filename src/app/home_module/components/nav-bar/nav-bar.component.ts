import { Component, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
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
  userAdmin = false;
  toggle = false;

  @Output('tabClicked') tabClicked = new EventEmitter<string>();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    public activatedRoute: ActivatedRoute
    ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
        if (this.currentUser.username === 'jitGirdhar') {
          this.userAdmin = true;
        }
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

  redirectToComponent(tabName: string) {
    console.log(tabName);
    this.router.navigate([tabName], { relativeTo: this.activatedRoute });
  /* this.tabClicked.emit(tabName); */
  }

}
