
import { User } from '@app/_models/user';
import { Component, OnInit, PipeTransform, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import {Observable, Subscription, of} from 'rxjs';
import { AdminUserListService } from '@app/home_module/services/admin-userlist.service';
import { AdminUserList, AdminUserListAdapter } from '@app/home_module/models/adminUserList';
import {NgbdSortableHeader, SortEvent} from '../../../directive/sortable.directive';
import { DecimalPipe } from '@angular/common';
import { FFSharedService } from '@app/shared_module/services/ff-shared.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css'],
  providers: [ AdminUserListService, DecimalPipe]
})
export class AdminUserListComponent implements OnInit , OnDestroy {

  adminUserList$: Observable<AdminUserList[]>;
  total$: Observable<number>;
  subscription$: Subscription;
  adminUserList: AdminUserList[];
  data: AdminUserList = new AdminUserList();

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: AdminUserListService,
              private ffSharedService: FFSharedService,
              private modalService: NgbModal) {
    this.adminUserList$ = service.adminUserList$;
    this.subscription$ = this.adminUserList$.subscribe(result => {
      this.adminUserList = result;
    });
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
  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
