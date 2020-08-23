import { Injectable } from '@angular/core';
import { Adapter } from '@app/core/adapter/adapter';

export class AdminTermPlan {
  constructor(
    public id: number = 0,
    public planName: string = '',
    public description: string = '',
    public url: string = '',
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class AdminTermPlanAdapter implements Adapter<AdminTermPlan> {
  constructor() {}

  adapt(data: any): AdminTermPlan {
    return new AdminTermPlan(
      data._id,
      data.planName,
      data.description,
      data.url
    );
  }
}
