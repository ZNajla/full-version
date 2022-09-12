import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import * as swalFunctions from '../../../../shared/data/sweet-alerts';
import swal from 'sweetalert2';
import { Workflow } from 'app/shared/Models/WorkflowModel';
import { DetailWorkflowService } from 'app/shared/services/detail-workflow.service';
import { WorkflowService } from 'app/shared/services/workflow.service';
import { ToastrService } from 'ngx-toastr';
import { AddWorkflowComponent } from '../add-workflow/add-workflow.component';
import { ViewDetailsComponent } from '../view-details/view-details.component';
import { ProcessSteps } from 'app/shared/Models/ProcessSteps';

@Component({
  selector: 'app-list-workflow',
  templateUrl: './list-workflow.component.html',
  styleUrls: ['./list-workflow.component.scss',
              "/assets/sass/libs/datatables.scss",],
  encapsulation: ViewEncapsulation.None,
})
export class ListWorkflowComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // row data
  public rows = [];
  public ColumnMode = ColumnMode;
  public limitRef = 10;
  public workflowsList : Workflow[] = [];
  public detailPrecess : ProcessSteps[] = [];
  isCollapsed = true;

  // column header
  public columns = [
    { name: "workflow", prop: "nomProcessus" },
    { name: "description", prop: "description" },
    { name: "Actions", prop: "id" },
  ];

  swal =  swalFunctions;

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
      console.table(this.workflowsList);
    })
  }

  viewDetails(id : string) {
    this.detailProcessService.getDetailsByProcess(id).subscribe((data:ProcessSteps[])=>{
      this.detailPrecess = data;
      console.log("detail process : "+this.detailPrecess);
      const modalRef2 = this.modalService.open(ViewDetailsComponent);
      modalRef2.componentInstance.detailProcess = this.detailPrecess;
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
          this.ngOnInit();
        });
      });
      this.ngOnInit();
      this.toastr.success('Process has been added successfuly!','', { closeButton: true });
   });
  }

  // onDeleteProcess(id: string){
  //   swal.fire({
  //     title: '<strong> Are you sure to delete </strong>',
  //     icon: 'info',
  //     html: 'Press yes to delete it !!',
  //     showCloseButton: false,
  //     showCancelButton: true,
  //     focusConfirm: false,
  //     confirmButtonText: '<i class="fa fa-thumbs-o-up"></i> Yes!',
  //     confirmButtonAriaLabel: 'Thumbs up, great!',
  //     cancelButtonText: '<i class="fa fa-thumbs-o-down"> No</i>',
  //     cancelButtonAriaLabel: 'Thumbs down',
  //     buttonsStyling: false,
  //     customClass: {
  //       confirmButton: 'btn btn-primary',
  //       cancelButton: 'btn btn-danger ml-1'
  //     }}).then((result) => {
  //       if (result.isConfirmed) {
  //           this.workflowService.deleteProcess(id).subscribe( data => {
  //           console.log(data);
  //           this.ngOnInit();
  //         });
  //         swal.fire(
  //           'Deleted!',
  //           'The Process has been deleted.',
  //           'success'
  //         )
  //       }
  //     })
  
  // }
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