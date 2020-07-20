import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TermPlansComponent } from '../term-plans/term-plans.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-refer-friend',
  templateUrl: './refer-friend.component.html',
  styleUrls: ['./refer-friend.component.css']
})
export class ReferFriendComponent implements OnInit {

  constructor(private modalService: NgbModal) {}


  ngOnInit() {
  }
  
/* 
  openPlansDialog() {
    const dialogRef = this.dialog.open(TermPlansComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  } */
  openPlansDialog(termPlan) {
    this.modalService.open(termPlan, { size: 'lg' });
  }

}
