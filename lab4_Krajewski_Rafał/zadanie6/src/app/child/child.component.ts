import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styles: [
  ]
})
export class ChildComponent implements OnInit {

  
  @Output() countClick = new EventEmitter();
  @Output() onResetClick = new EventEmitter();
  @Input() isDisable: boolean = false;
  counter: number = 0;

  constructor() { 
    this.isDisable = false;
  }

  ngOnInit(): void {
  }

  click() {
    this.counter++;
    this.countClick.emit(this.counter);
  }

  resetClick() {
    this.counter = 0;
    this.onResetClick.emit();
  }

}
