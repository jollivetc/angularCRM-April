import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'crm-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss']
})
export class DummyComponent {
  @Input()
  label:string='';
  @Output()
  clicked:EventEmitter<string> = new EventEmitter<string>();

  onClicked():void{
    this.clicked.emit(`${this.label} was given`);
  }
}
