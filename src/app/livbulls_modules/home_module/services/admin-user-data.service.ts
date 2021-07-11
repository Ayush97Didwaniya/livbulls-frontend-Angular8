import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppInit } from "@app/core/adapter/services/app.init.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserDetail, UserLoginDataAdapter } from "../models/user.modal";

@Injectable({providedIn: 'root'})
export class AdminUserDataService {
    private API_BASE_URL = AppInit.settings.apiServer.base_url_backend;
    constructor(private http: HttpClient,
        private userLoginData: UserLoginDataAdapter) { }

    getUserDetail(id): Observable<UserDetail> {
        return this.http.get<UserDetail>(`${this.API_BASE_URL}/api/userDetail/${id}`);
    }

    getAllUserData() {
        return this.http.get<any>(`${this.API_BASE_URL}/users`).pipe(map(users => {
            return users.map(users => this.userLoginData.adapt(users));
        }));
    }

    updateUserLoginData(id, param) {
        return this.http.put<any>(`${this.API_BASE_URL}/users/${id}`, param);
    }

    updateUserDetail(formData) {
        return this.http.put<any>(`${this.API_BASE_URL}/api/userDetail`, formData);
    }

    deleteUserData(id) {
        return this.http.delete<any>(`${this.API_BASE_URL}/users/${id}`);
    }
}