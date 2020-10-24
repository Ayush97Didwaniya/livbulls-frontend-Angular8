import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { QuoteResponse } from '../models/quote.model';
import { AppInit } from '@app/core/adapter/services/app.init.service';

@Injectable({ providedIn: 'root' })
export class QuoteService {
    private API_BASE_URL = AppInit.settings.apiServer.base_url_backend;
    constructor(private http: HttpClient) { }

    getQuote() {
        return this.http.get<QuoteResponse>(`${this.API_BASE_URL}/api/quotes`);
    }

    addQuote(quote: any, quoteId1: string) {
        const quoteReqBody = {
            writter: quote.writter,
            quotation: quote.quotation,
            quoteId: quoteId1
        };
     /*    const headers = {
            'Content-Type': 'application/json'
        }; */
        return this.http.post(`${this.API_BASE_URL}/api/quotes/`, quoteReqBody);
    }

    updateQuote(quote: QuoteResponse) {
        return this.http.put(`${this.API_BASE_URL}/api/quotes/`, quote);
    }
}
