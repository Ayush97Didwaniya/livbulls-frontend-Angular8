import { Component, OnInit } from '@angular/core';
import { AdminTermPlanDataService } from '@app/home_module/services/admin-term-plan-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-term-plans',
  templateUrl: './term-plans.component.html',
  styleUrls: ['./term-plans.component.css']
})
export class TermPlansComponent implements OnInit {
  termPlans = [];
  base_Image_url = environment.imageBaseUrl;
  constructor(private termPlanDataService: AdminTermPlanDataService) { }

  ngOnInit() {
    this.getTermPlanList();
  }

  getTermPlanList() {
    this.termPlanDataService.getAdmimTermPlan().subscribe(result => {
      debugger;
      console.log('imageBaseUrl:', this.base_Image_url);
      this.termPlans = result;
    });
  }
}
