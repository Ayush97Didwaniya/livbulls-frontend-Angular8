import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services';
import { QuoteService } from '@app/shared_module/services/quotes.service';
import { FFSharedService } from '@app/shared_module/services/ff-shared.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(
              private userService: UserService,
  ) {}

  ngOnInit() {
  }
}
