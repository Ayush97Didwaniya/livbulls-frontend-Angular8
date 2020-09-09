import { Injectable } from '@angular/core';
import { Adapter } from '@app/core/adapter/adapter';

export class AdminUserList {
  constructor(
    public id: number = 0,
    public firstName: string = '',
    public lastName: string = '',
    public email: string = '',
    public imageUrl: string = '',
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class AdminUserListAdapter implements Adapter<AdminUserList> {
  constructor() {}

  adapt(data: any): AdminUserList {
    return new AdminUserList(
      data._id,
      data.firstName,
      data.lastName,
      data.email,
      data.imageUrl
    );
  }
}
