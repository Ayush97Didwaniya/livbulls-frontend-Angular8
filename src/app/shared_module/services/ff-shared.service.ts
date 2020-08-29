import { Injectable } from '@angular/core';
import { CommonPopupComponent } from '../components/common-popup/common-popup.component';
import { DialogParam } from '../models/dialog-param.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';

@Injectable({ providedIn: 'root' })
export class FFSharedService {
    data: DialogParam = new DialogParam();
    constructor(private modalService: NgbModal) { }

    public openAlertPopUp(headerMsg: string, messageStr: string, showOk: boolean, showYesNo: boolean) {
        this.data.header = headerMsg;
        this.data.message = messageStr;
        this.data.buttonOk = showOk;
        this.data.buttonYesNo = showYesNo;
        const modalRef = this.modalService.open(CommonPopupComponent, { centered: true });
        modalRef.componentInstance.dialogDataparam = this.data;
        return modalRef;
    }
}
