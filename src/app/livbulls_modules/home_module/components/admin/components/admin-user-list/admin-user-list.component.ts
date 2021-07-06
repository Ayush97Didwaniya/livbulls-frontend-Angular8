import { Component, OnInit, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {NgbdSortableHeader, SortEvent} from '../../../../directive/sortable.directive';
import { DecimalPipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditUserDetailComponent } from './edit-user-detail/edit-user-detail.component';
import { UserLoginData } from '../../modals/user.modal';
import { AdminUserSharedService } from '../../services/admin-user-shared.service';
import { AdminUserDataService } from '../../services/admin-user-data.service';
import { FFSharedService } from '@app/shared_module/services/ff-shared.service';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css'],
  providers: [ AdminUserSharedService, DecimalPipe]
})
export class AdminUserListComponent implements OnInit , OnDestroy {

  adminUserList$: Observable<UserLoginData[]>;
  total$: Observable<number>;
  subscription$: Subscription;
  data: UserLoginData = new UserLoginData();

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: AdminUserSharedService,
              private modalService: NgbModal,
              private adminUserDataService: AdminUserDataService,
              private ffSharedService: FFSharedService) {
    this.adminUserList$ = service.adminUserList$;
    /* this.subscription$ = this.adminUserList$.subscribe(result => {
      this.adminUserList = result;
    }); */
    this.total$ = service.total$;
  }

  
  ngOnInit() {

  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
  
  editUserDetail(user: any) {
    const modalRef = this.modalService.open(EditUserDetailComponent, { centered: true, size: 'lg'});
    modalRef.componentInstance.dialogDataparam = user;
    modalRef.result.then((result) => {
      if(result && result==='updated') {
        this.service.fetchUserList();
      }
    }).catch((err) => {
       console.log(err);
    });

  }

  deleteUser(id: any) {
    this.adminUserDataService.deleteUserData(id).subscribe(data => {
      this.ffSharedService.openAlertPopUp('Success', data.res, true, false);
      this.service.fetchUserList();
    }, err => {
      this.ffSharedService.openAlertPopUp('Error', err, true, false);
    })
  } 

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
