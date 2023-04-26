import { Injectable } from '@angular/core';
import { User } from './model/user';

const USER_TOKEN:string='crm-user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUser?:User;

  constructor() {
    if(sessionStorage.getItem(USER_TOKEN)){
      this.currentUser= JSON.parse(sessionStorage.getItem(USER_TOKEN)!);
    }
  }

  isAuthenticated():boolean{
    return !!this.currentUser
  }

  authentUser(login:string, password:string):User{
    this.currentUser = {
      id:1,
      login:login,
      firstname:'John',
      lastname:'Doe'
    };
    sessionStorage.setItem(USER_TOKEN, JSON.stringify(this.currentUser));
    return this.currentUser;
  }

  disconnect():void{
    this.currentUser = undefined;
    sessionStorage.clear()
  }
}
