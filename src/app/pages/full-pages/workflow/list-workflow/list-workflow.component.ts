import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { AuthService } from 'app/shared/auth/auth.service';
import { Workflow } from 'app/shared/Models/WorkflowModel';
import { DetailWorkflowService } from 'app/shared/services/detail-workflow.service';
import { WorkflowService } from 'app/shared/services/workflow.service';
import { ToastrService } from 'ngx-toastr';
import { AddWorkflowComponent } from '../add-workflow/add-workflow.component';
import { ViewDetailsComponent } from '../view-details/view-details.component';

@Component({
  selector: 'app-list-workflow',
  templateUrl: './list-workflow.component.html',
  styleUrls: ['./list-workflow.component.scss',
              "/assets/sass/libs/datatables.scss",]
})
export class ListWorkflowComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // row data
  public rows = [];
  public ColumnMode = ColumnMode;
  public limitRef = 10;
  public workflowsList : Workflow[] = [];

  // column header
  public columns = [
    { name: "workflow", prop: "nomProcessus" },
    { name: "description", prop: "description" },
    { name: "Actions", prop: "id" },
  ];

  // private
  private tempData = [];
  constructor(private workflowService:WorkflowService,public toastr: ToastrService , private modalService: NgbModal , private detailProcessService : DetailWorkflowService) {
    this.tempData = this.workflowsList;
   }


   // Public Methods
  // -----------------------------------------------------------------------------------------------------
  getAllWorkFlows(){
    this.workflowService.getAllWorkFlows().subscribe((data:Workflow[])=>{
    this.workflowsList = data;
    this.rows = data ;
    this.tempData = data ;
      console.log("work!!!",this.workflowsList);
    })
  }

  viewDetails(id : string) {
    const modalRef = this.modalService.open(ViewDetailsComponent);
    console.log(this.detailProcessService.getDetailsByProcess(id));
    modalRef.componentInstance.detail = this.detailProcessService.getDetailsByProcess(id);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  addProcess() {
    const modalRef = this.modalService.open(AddWorkflowComponent , {size : "xl"});
    modalRef.result.then((result) => {
      console.log(result);
      this.workflowService.addProcess(result.workflowForm).subscribe((data) =>{
        console.log(data);
        this.detailProcessService.addDetailProcess(result.details , data).subscribe((data) =>{
          console.log(data);
        });
      });
        this.toastr.success('Process has been added successfuly!','', { closeButton: true });
        this.ngOnInit();
  });
}
   /**
   * updateLimit
   *
   * @param limit
   */
    updateLimit(limit) {
      this.limitRef = limit.target.value;
    }

     /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.nomProcessus.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  ngOnInit(): void {
    this.getAllWorkFlows();
  }

}
