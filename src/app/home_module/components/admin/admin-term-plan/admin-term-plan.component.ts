import { Component, OnInit, PipeTransform, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import {Observable, Subscription, of} from 'rxjs';
import {AdminTermPlanService} from '../../../services/admin-term-plan.service';

import {NgbdSortableHeader, SortEvent} from '../../../directive/sortable.directive';
import { AdminTermPlan } from '@app/home_module/models/adminTermPlan';
import { DecimalPipe } from '@angular/common';
import { FFSharedService } from '@app/shared_module/services/ff-shared.service';

@Component({
  selector: 'app-admin-term-plan',
  templateUrl: './admin-term-plan.component.html',
  styleUrls: ['./admin-term-plan.component.css'],
  providers: [ AdminTermPlanService, DecimalPipe]
})
export class AdminTermPlanComponent implements OnInit, OnDestroy {
  adminTermPlans$: Observable<AdminTermPlan[]>;
  total$: Observable<number>;
  subscription$: Subscription;
  adminTermPlans: AdminTermPlan[];

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: AdminTermPlanService,
              private ffSharedService: FFSharedService) {
    this.adminTermPlans$ = service.adminTermPlans$;
    this.subscription$ = this.adminTermPlans$.subscribe(result => {
      this.adminTermPlans = result;
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

  editTermPlan(termPlan) {

  }

  deletePopup(termPlan) {
    const modalRef = this.ffSharedService.openAlertPopUp('Message', 'Are u really want to delete this term Plan!', false, true);
    modalRef.result.then((result) => {
      if (result === 'yes') {
        this.deleteTermPlan(termPlan);
      }
    }).catch((err) => {
       console.log(err);
    });
  }

  deleteTermPlan(termPlan) {
    this.service.deleteAdminTermPlan(termPlan.id).subscribe(result => {
      if (result) {
        this.adminTermPlans$ = of(this.adminTermPlans.filter(val => val.id !== termPlan.id));
      }
    }, error => {
      this.ffSharedService.openAlertPopUp('Error', error, true, false);
    });
}

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
