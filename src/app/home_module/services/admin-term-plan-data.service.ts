import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminTermPlanAdapter } from '../models/adminTermPlan';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AdminTermPlanDataService {
    constructor(private http: HttpClient,
                private adminTermPlan: AdminTermPlanAdapter) { }

    getAdmimTermPlan() {
        return this.http.get<any>(`${environment.apiUrl}/api/termPlan`).pipe(map(termPlans => {
            return termPlans.map(termPlan => this.adminTermPlan.adapt(termPlan));
        }));
    }

    addTermPlan(formData) {
        return this.http.post<any>(`${environment.apiUrl}/api/termPlan`, formData);
    }

    updateTermPlan(formData) {
        return this.http.put<any>(`${environment.apiUrl}/api/termPlan`, formData);
    }

    deleteAdminTermPlan(id) {
        return this.http.delete<any>(`${environment.apiUrl}/api/termPlan/${id}`);
    }
}
