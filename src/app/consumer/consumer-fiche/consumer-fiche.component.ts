import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConsumerService } from '../consumer .service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Consumer } from '../model/consumer';

@Component({
  selector: 'crm-consumer-fiche',
  templateUrl: './consumer-fiche.component.html',
  styleUrls: ['./consumer-fiche.component.scss']
})
export class ConsumerFicheComponent implements OnInit, OnDestroy {

  consumerForm: FormGroup;
  private subs:Subscription[]=[];
  private consumer:any = {}

  constructor(private consumerService: ConsumerService, private route:ActivatedRoute, private router:Router){
    this.consumerForm = new FormGroup({
      civility: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    })

  }
  ngOnInit(): void {
    const id=this.route.snapshot.paramMap.get('id');
    if(id){
      this.consumerService.getConsumer(id!).subscribe({
        next:(value:Consumer)=>{this.consumerForm.patchValue(value), this.consumer = value},
        error:(error:Error)=>{console.error(error)},
        complete:()=>{}
      })
    }
  }
  ngOnDestroy(): void {
    this.subs.forEach(s=>s.unsubscribe());
  }

  validate():void{
    let data = {...this.consumer, ...this.consumerForm.value};
    const subscription = this.consumerService.save(data).subscribe({
      next:(value:Consumer)=>{this.router.navigateByUrl('/consumers')},
      error:(error:Error)=>{console.error(error)},
      complete:()=>{}
    })
    this.subs.push(subscription);
  }

}
