import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Consumer } from '../model/consumer';
import { ConsumerService } from '../consumer .service';
import { coerceNumberProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'crm-consumer-list',
  templateUrl: './consumer-list.component.html',
  styleUrls: ['./consumer-list.component.scss']
})
export class ConsumerListComponent implements OnInit{

  search:string='';
  consumers?:Observable<Consumer[]>

  constructor(private consumerService:ConsumerService){}

  ngOnInit(): void {
    this.consumers = this.consumerService.getAllConsumers();
  }

  doSearch():void{
    this.consumers = this.consumerService.findConsumers(this.search);
  }

  deleteConsumer(id:number):void{
    this.consumerService.deleteConsumer(id).subscribe({
      next:(value:object)=>{this.doSearch()},
      error:(error:Error)=>{console.error(error)},
      complete:()=>{}
    })
  }

}
