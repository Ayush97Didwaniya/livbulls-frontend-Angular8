import { Injectable } from '@angular/core';
import { Adapter } from '@app/core/adapter/adapter';

export class UserLoginData {
    constructor(
      public id: number = 0,
      public firstName: string = '',
      public lastName: string = '',
      public username: string = '',
      public email: string = '',
      public imageUrl: string = '',
      public userDetailRef: string = ''
    ) {}
}
  
@Injectable({
  providedIn: 'root'
})
export class UserLoginDataAdapter implements Adapter<UserLoginData> {
  constructor() {}

  adapt(data: any): UserLoginData {
    return new UserLoginData(
      data.id,
      data.firstName,
      data.lastName,
      data.username,
      data.email,
      data.imageUrl,
      data.userDetailRef
    );
  }
}

export class UserDetail {
    refered_user_lists: [string];
    term_plans : [string];
    parentUser_email : string;
    imageUrl: string;
    contact:  number;
}
    
export class UserCompleteDetail {
    userLoginData: UserLoginData;
    userDetails: UserDetail;
}