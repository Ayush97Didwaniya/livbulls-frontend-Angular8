import { Component, OnInit, Input } from '@angular/core';
import { DialogParam } from '@app/shared_module/models/dialog-param.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-common-popup',
  templateUrl: './common-popup.component.html',
  styleUrls: ['./common-popup.component.css']
})
export class CommonPopupComponent implements OnInit {
  popupData: DialogParam = new DialogParam();
  okFlag = false;
  yesNoFlag = false;
  @Input() public dialogDataparam;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.popupData = this.dialogDataparam;
    this.okFlag = this.dialogDataparam.buttonOk;
    this.yesNoFlag = this.dialogDataparam.buttonYesNo;
    console.log('dialog param Data', this.popupData);
  }

  onCloseModal(closeParam) {
    this.activeModal.close(closeParam);
  }
}
