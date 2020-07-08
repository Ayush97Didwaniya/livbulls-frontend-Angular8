import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private userService: UserService) {
    this.userService.getAll().subscribe(res => {
      console.log('user List', res);
    });
  }
  
  ngOnInit() {
  }

}
