import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'crm-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent {

  @Input()
  field?:AbstractControl;
  @Input()
  errorMessages?:{[key:string]:string};

  isError():boolean{
    return !!this.field && this.field?.touched && !!this.field?.errors
  }

  getMessages():string[]{
    return  Object.keys(this.field?.errors as Object).map((key)=>{
      return !!this.errorMessages?.[key] ? this.errorMessages?.[key] : `missing value for error ${key}`;
    })
  }

}
