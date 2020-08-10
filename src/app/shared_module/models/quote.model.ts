import { Injectable } from '@angular/core';
import { Adapter } from '@app/core/adapter/adapter';

export class QuoteResponse {
  constructor(
    public writter: string = '',
    public quotation: string = '',
    public quoteId: string = ''
  ) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class QuoteAdapter implements Adapter<QuoteResponse> {
  constructor() {}

  adapt(data: any): QuoteResponse {
    return new QuoteResponse(
      data[0].writter,
      data[0].quotation,
      data[0].quoteId
    );
  }
}
