import { Component, OnDestroy } from '@angular/core';
import { DemoObservableService } from '../common/demo-observable.service';
import { Observable, Subscription, catchError, map, of, take } from 'rxjs';

@Component({
  selector: 'crm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  myObservable?:Observable<number>;
  private subs:Subscription[]=[];
  phoneNumber:string='0123456789';

  constructor(private demoObservableService: DemoObservableService){}

  ngOnDestroy(): void {
    this.subs.forEach(s=>s.unsubscribe());
  }

  testObservable():void{
    const subscription = this.demoObservableService.getObservable()
      .pipe(
        map((x)=>x*10),
        take(2)
      )
      .subscribe({
        next:(value:number)=>{ console.log(value);},
        error:(error:Error)=>{console.error(error);},
        complete:()=>{console.log('end');}
      });
    this.subs.push(subscription);
  }

  testObservableAsync():void{
    this.myObservable = this.demoObservableService.getObservable()
      .pipe(
        map(x=>5*x),
        catchError((error)=> of(99999))
      );
  }

}
