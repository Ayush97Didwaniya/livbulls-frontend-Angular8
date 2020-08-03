import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-common-popup',
  templateUrl: './common-popup.component.html',
  styleUrls: ['./common-popup.component.css']
})
export class CommonPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private popUpRef: MatDialogRef<CommonPopupComponent>) { }

  ngOnInit() {
  }

}
