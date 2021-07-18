import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppInit } from "@app/core/adapter/services/app.init.service";
import { ContactUs } from "../models/send-email";

@Injectable({providedIn: 'root'})
export class SendEmailService {
    private API_BASE_URL = AppInit.settings.apiServer.base_url_backend;
    constructor(private http: HttpClient) { }
    
    sendEmail(contactData: ContactUs) {
        return this.http.post(`${this.API_BASE_URL}/emailSend`, contactData);
    }
}