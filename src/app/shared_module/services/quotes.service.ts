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

    updateQuote(quote: QuoteResponse) {
        debugger;
        return this.http.put(`${environment.apiUrl}/api/quotes/5f23081224d7811bc8891519`, quote);
    }
}
