import { Component, OnInit } from '@angular/core';
import { AppInit } from '@app/core/adapter/services/app.init.service';
import { AdminTermPlanDataService } from '@app/livbulls_modules/home_module/components/admin/services/admin-term-plan-data.service';

@Component({
  selector: 'app-term-plans',
  templateUrl: './term-plans.component.html',
  styleUrls: ['./term-plans.component.css']
})
export class TermPlansComponent implements OnInit {
  termPlans = [];
  baseImageUrl = AppInit.settings.image.image_base_Url;

  constructor(private termPlanDataService: AdminTermPlanDataService) { }

  ngOnInit() {
    this.getTermPlanList();
  }

  getTermPlanList() {
    this.termPlanDataService.getAdmimTermPlan().subscribe(result => {
      console.log('imageBaseUrl:', this.baseImageUrl);
      this.termPlans = result;
    });
  }
}
