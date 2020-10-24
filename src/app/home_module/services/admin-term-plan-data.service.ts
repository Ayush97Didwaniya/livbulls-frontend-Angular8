import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminTermPlanAdapter } from '../models/adminTermPlan';
import { map } from 'rxjs/operators';
import { AppInit } from '@app/core/adapter/services/app.init.service';

@Injectable({ providedIn: 'root' })
export class AdminTermPlanDataService {
    private API_BASE_URL = AppInit.settings.apiServer.base_url_backend;
    constructor(private http: HttpClient,
                private adminTermPlan: AdminTermPlanAdapter) { }

    getAdmimTermPlan() {
        return this.http.get<any>(`${this.API_BASE_URL}/api/termPlan`).pipe(map(termPlans => {
            return termPlans.map(termPlan => this.adminTermPlan.adapt(termPlan));
        }));
    }

    addTermPlan(formData) {
        return this.http.post<any>(`${this.API_BASE_URL}/api/termPlan`, formData);
    }

    updateTermPlan(formData) {
        return this.http.put<any>(`${this.API_BASE_URL}/api/termPlan`, formData);
    }

    deleteAdminTermPlan(id) {
        return this.http.delete<any>(`${this.API_BASE_URL}/api/termPlan/${id}`);
    }
}
