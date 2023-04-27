import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConsumerService } from '../consumer .service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'crm-consumer-fiche',
  templateUrl: './consumer-fiche.component.html',
  styleUrls: ['./consumer-fiche.component.scss']
})
export class ConsumerFicheComponent implements OnDestroy {

  consumerForm: FormGroup;
  private subs:Subscription[]=[];

  constructor(private consumerService: ConsumerService){
    this.consumerForm = new FormGroup({
      civility: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    })
  }
  ngOnDestroy(): void {
    this.subs.forEach(s=>s.unsubscribe());
  }

  validate():void{
    const subscription = this.consumerService.save(this.consumerForm.value).subscribe({
      next:(value:any)=>{console.log(value)},
      error:(error:Error)=>{console.error(error)},
      complete:()=>{}
    })
    this.subs.push(subscription);
  }

}
