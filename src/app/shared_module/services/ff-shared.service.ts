import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CommonPopupComponent } from '../components/common-popup/common-popup.component';

@Injectable({ providedIn: 'root' })
export class FFSharedService {
    constructor(private http: HttpClient,
                private baseDialog: MatDialog) { }

    public openAlertPopUp(messageStr: string, headerMsg: string, showOk = true, showYesNo = false) {
        const dialogRef = this.baseDialog.open(CommonPopupComponent, {
            height: 'auto',
            width: '550px',
            data: {
              header: headerMsg,
              message: messageStr,
              button_ok: showOk,
              button_yes: showYesNo,
              button_no: showYesNo,
            }
          });
        return dialogRef;
      }
}
