import { Component } from '@angular/core';

@Component({
  selector: 'crm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title:string = 'angularCRM';

  cat={firstname:'Felix'};

  fruits:string[] = ['apple','pear', 'strawberry','cherry','pineapple', 'banana'];

  counter:number=0;

  count($event: MouseEvent):void{
    console.log($event);
    this.counter++;
  }

}
