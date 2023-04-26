import { Injectable } from '@angular/core';
import { User } from './model/user';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

const USER_TOKEN:string='crm-user';
const JWT_TOKEN:string='crm-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUser?:User;
  private jwtToken?:string;

  constructor(private http:HttpClient) {
    if(sessionStorage.getItem(USER_TOKEN)){
      this.currentUser= JSON.parse(sessionStorage.getItem(USER_TOKEN)!);
      this.jwtToken=sessionStorage.getItem(JWT_TOKEN)!;
    }
  }

  isAuthenticated():boolean{
    return !!this.currentUser
  }

  get jwt(){
    return this.jwtToken
  }

  authentUser(login:string, password:string):Observable<User>{
    return this.http.post<AuthentResponse>('/api/auth/login', {email:login, password:password})
      .pipe(
        map((resp:AuthentResponse)=>{
          this.currentUser = resp.user;
          this.jwtToken = resp.token;
          sessionStorage.setItem(USER_TOKEN, JSON.stringify(this.currentUser));
          sessionStorage.setItem(JWT_TOKEN, this.jwtToken);
          return this.currentUser;
        })
      );
  }

  disconnect():void{
    this.currentUser = undefined;
    this.jwtToken = undefined;
    sessionStorage.clear()
  }
}

interface AuthentResponse {
  user:User,
  token:string
}
