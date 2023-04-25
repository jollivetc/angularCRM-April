import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthenticationService } from './authentication.service';

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

  constructor(private authent:AuthenticationService){
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, checkNo$InPassword])
    });
  }

  submit():void{
    const user = this.authent.authentUser(this.loginForm.value.login, this.loginForm.value.password)
    console.log(user);
  }
}

function checkNo$InPassword(c:AbstractControl):ValidationErrors | null{
  if((c.value as string).indexOf('$')<0){
    return null;
  }else{
    return {checkNo$InPassword:true};
  }
}
