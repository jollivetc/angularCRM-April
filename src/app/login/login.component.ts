import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { User } from './model/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy{

  loginForm:FormGroup;
  loginErrorMessages = {
                  required: 'Enter you login',
                  minlength: 'More than 2 characteres'
                };
  private subs:Subscription[]= []

  constructor(private authent:AuthenticationService, private router:Router){
    if(this.authent.isAuthenticated()){
      this.authent.disconnect();
    }
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, checkNo$InPassword])
    });
  }
  ngOnDestroy(): void {
    this.subs.forEach(s=>s.unsubscribe());
  }

  submit():void{
    const sub:Subscription = this.authent.authentUser(this.loginForm.value.login, this.loginForm.value.password)
      .subscribe({
        next:(value:User)=>{this.router.navigateByUrl('/home');},
        error:(error:Error)=>{alert(JSON.stringify(error))},
        complete:()=>{}
      })
    this.subs.push(sub);
  }
}

function checkNo$InPassword(c:AbstractControl):ValidationErrors | null{
  if((c.value as string).indexOf('$')<0){
    return null;
  }else{
    return {checkNo$InPassword:true};
  }
}
