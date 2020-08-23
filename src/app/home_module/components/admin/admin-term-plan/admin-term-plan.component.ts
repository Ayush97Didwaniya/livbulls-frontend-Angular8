import { Component, OnInit, PipeTransform, ViewChildren, QueryList } from '@angular/core';
import {Observable} from 'rxjs';
import {AdminTermPlanService} from '../../../services/admin-term-plan.service';

import {NgbdSortableHeader, SortEvent} from '../../../directive/sortable.directive';
import { AdminTermPlan } from '@app/home_module/models/adminTermPlan';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-admin-term-plan',
  templateUrl: './admin-term-plan.component.html',
  styleUrls: ['./admin-term-plan.component.css'],
  providers: [ AdminTermPlanService, DecimalPipe]
})
export class AdminTermPlanComponent implements OnInit {
  adminTermPlans$: Observable<AdminTermPlan[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: AdminTermPlanService) {
    this.adminTermPlans$ = service.adminTermPlans$;
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

  deleteTermPlan(termPlan) {

  }
}
