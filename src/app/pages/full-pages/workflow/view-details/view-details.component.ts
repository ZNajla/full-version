import { Component, Input, OnInit } from '@angular/core';
import { ProcessSteps } from 'app/shared/Models/ProcessSteps';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})

export class ViewDetailsComponent implements OnInit {

  @Input() public detailProcess : ProcessSteps[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log("Input : ");
    this.detailProcess.forEach(element =>{
      console.log(element);
    })
  }

}