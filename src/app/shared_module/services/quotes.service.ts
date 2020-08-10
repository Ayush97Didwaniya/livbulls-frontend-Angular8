import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { QuoteResponse } from '../models/quote.model';

@Injectable({ providedIn: 'root' })
export class QuoteService {
    constructor(private http: HttpClient) { }

    getQuote() {
        return this.http.get<QuoteResponse>(`${environment.apiUrl}/api/quotes`);
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
        return this.http.post(`${environment.apiUrl}/api/quotes/`, quoteReqBody);
    }

    updateQuote(quote: QuoteResponse) {
        return this.http.put(`${environment.apiUrl}/api/quotes/1`, quote);
    }
}
