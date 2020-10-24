import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import { AppInit } from '@app/core/adapter/services/app.init.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    private API_BASE_URL = AppInit.settings.apiServer.base_url_backend;
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${this.API_BASE_URL}/users`);
    }

    getById(id: number) {
        return this.http.get(`${this.API_BASE_URL}/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`${this.API_BASE_URL}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${this.API_BASE_URL}/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.API_BASE_URL}/users/${id}`);
    }
}
