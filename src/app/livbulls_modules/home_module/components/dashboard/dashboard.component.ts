import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '@app/_models';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { AdminUserDataService } from '../../services/admin-user-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit  {
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  userData: User;
  userList = [{
              name: 'ayush', description: 'Hi My Name Is Ayush. I have been with livbulls' +
              'since 8 months. It was really benificial for me to spend money as per FF guidence.',
               url: '/assets/images/user.jpg',
               image: '/assets/images/dashboard5.jpg'
              },
              {
                name: 'Jitesh', description: 'Hi My Name Is JItesj. I have been with livbulls' +
                'since 8 months. It was really benificial for me to spend money as per FF guidence.',
                url: '/assets/images/user.jpg',
                image: '/assets/images/dashboard5.jpg'},
              {
                name: 'Jitesh', description: 'Hi My Name Is Priyansh. I have been with livbulls' +
                'since 8 months. It was really benificial for me to spend money as per FF guidence.',
                url: '/assets/images/user.jpg',
                image: '/assets/images/dashboard5.jpg'},
              {
                name: 'Jitesh', description: 'Hi My Name Is suhana. I have been with livbulls' +
                'since 8 months. It was really benificial for me to spend money as per FF guidence.',
                url: '/assets/images/user.jpg',
                image: '/assets/images/dashboard5.jpg'},
              {
                name: 'Jitesh', description: 'Hi My Name Is rahul. I have been with livbulls' +
                'since 8 months. It was really benificial for me to spend money as per FF guidence.',
                url: '/assets/images/user.jpg',
                image: '/assets/images/dashboard5.jpg'}
              ];

  // @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  constructor(private adminUserDataServie: AdminUserDataService) {

  }
/* 
  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  } */

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('currentUser'));
  }
}