import { Component, OnInit, PipeTransform, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import {Observable, Subscription, of} from 'rxjs';

import {NgbdSortableHeader, SortEvent} from '../../../directive/sortable.directive';
import { AdminTermPlan } from '@app/home_module/models/adminTermPlan';
import { FFSharedService } from '@app/shared_module/services/ff-shared.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditCreateAdminPlanComponent } from './edit-create-plan/edit-create-admin-plan/edit-create-admin-plan.component';
import { AdminTermPlanDataService } from '@app/home_module/services/admin-term-plan-data.service';
import { AdminTermPlanSharedService } from '@app/home_module/services/admin-term-plan-shared.service';
import { env } from 'process';
import { environment } from 'src/environments/environment';
import { AppInit } from '@app/core/adapter/services/app.init.service';

@Component({
  selector: 'app-admin-term-plan',
  templateUrl: './admin-term-plan.component.html',
  styleUrls: ['./admin-term-plan.component.css']
})
export class AdminTermPlanComponent implements OnInit, OnDestroy {
  adminTermPlans$: Observable<AdminTermPlan[]>;
  total$: Observable<number>;
  subscription$: Subscription;
  adminTermPlans: AdminTermPlan[];
  data: AdminTermPlan = new AdminTermPlan();
  imagesBaseUrl = AppInit.settings.image.image_base_Url;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public termPlanDataService: AdminTermPlanDataService,
              public termPlanSharedService: AdminTermPlanSharedService,
              private ffSharedService: FFSharedService,
              private modalService: NgbModal) {
    this.adminTermPlans$ = this.termPlanSharedService.adminTermPlans$;
    this.subscription$ = this.adminTermPlans$.subscribe(result => {
      this.adminTermPlans = result;
    });
    this.total$ = this.termPlanSharedService.total$;
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

    this.termPlanSharedService.sortColumn = column;
    this.termPlanSharedService.sortDirection = direction;
  }

  editTermPlan(termPlan) {
    this.data.id = termPlan.id;
    this.data.planName = termPlan.planName;
    this.data.description = termPlan.description;
    this.data.url = termPlan.url;

    const modalRef = this.modalService.open(EditCreateAdminPlanComponent, { centered: true });
    modalRef.componentInstance.dialogDataparam = this.data;
    modalRef.result.then((result) => {
      if (result === 'updated') {
        this.termPlanSharedService.fetchTermPlan();
      }
    }).catch((err) => {
       console.log(err);
    });
 //   return modalRef;
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
    this.termPlanDataService.deleteAdminTermPlan(termPlan.id).subscribe(result => {
      if (result) {
        this.adminTermPlans$ = of(this.adminTermPlans.filter(val => val.id !== termPlan.id));
      }
    }, error => {
      this.ffSharedService.openAlertPopUp('Error', error, true, false);
    });
  }

  addTermPlan() {
    const modalRef = this.modalService.open(EditCreateAdminPlanComponent, { centered: true });
    modalRef.result.then((result) => {
      if (result === 'added') {
        this.termPlanSharedService.fetchTermPlan();
      }
    }).catch((err) => {
       console.log(err);
    });
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
