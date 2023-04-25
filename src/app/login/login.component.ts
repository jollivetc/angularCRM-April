import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm:FormGroup;
  loginErrorMessages = {
                  required: 'Enter you login',
                  minlength: 'More than 2 characteres'
                };

  constructor(){
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, checkNo$InPassword])
    });
  }

  submit():void{
    console.log(this.loginForm)
  }
}

function checkNo$InPassword(c:AbstractControl):ValidationErrors | null{
  if((c.value as string).indexOf('$')<0){
    return null;
  }else{
    return {checkNo$InPassword:true};
  }
}
