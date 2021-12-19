import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styles: [
  ]
})
export class ParentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  amountOfClicks: number = 0;
  isDisable: boolean = false;

  setClicksAmount(e: number) {
    this.amountOfClicks = e;
    if (this.amountOfClicks >= 10) {
      this.isDisable = true;
    }
  }
  
  resetClicksAmount() {
    this.amountOfClicks = 0;
    this.isDisable = false;
  }

}
