import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Consumer } from '../model/consumer';
import { ConsumerService } from '../consumer .service';

@Component({
  selector: 'crm-consumer-list',
  templateUrl: './consumer-list.component.html',
  styleUrls: ['./consumer-list.component.scss']
})
export class ConsumerListComponent implements OnInit{

  search?:string;
  consumers?:Observable<Consumer[]>

  constructor(private consumerService:ConsumerService){}

  ngOnInit(): void {
    this.consumers = this.consumerService.getAllConsumers();
  }

  doSearch():void{
    this.consumers = this.consumerService.findConsumers(this.search!);
  }



}
