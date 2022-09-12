import { Workflow } from 'app/shared/Models/WorkflowModel';
import { Component, Input, OnInit } from '@angular/core';
import { WorkflowService } from 'app/shared/services/workflow.service';
import { DetailWorkflowService } from 'app/shared/services/detail-workflow.service';
import { ProcessSteps } from 'app/shared/Models/ProcessSteps';

@Component({
  selector: 'app-view-type',
  templateUrl: './view-type.component.html',
  styleUrls: ['./view-type.component.scss']
})
export class ViewTypeComponent implements OnInit {
  @Input() public workflow : Workflow ;
  public detailProcess : ProcessSteps[] = [];
  constructor( private detailWorkflow : DetailWorkflowService) { }

  getworkflowDetails(id : string){
    this.detailWorkflow.getDetailsByProcess(id).subscribe((data) => {
      this.detailProcess = data ;
      console.table(this.detailProcess);
    });
  }
  ngOnInit(): void {
    this.getworkflowDetails(this.workflow.id);
    console.log(this.workflow);
  }

}
