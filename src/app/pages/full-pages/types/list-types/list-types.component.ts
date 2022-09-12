import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import * as swalFunctions from '../../../../shared/data/sweet-alerts';
import swal from 'sweetalert2';
import { Types } from 'app/shared/Models/TypesModal';
import { Router } from '@angular/router';
import { TypesService } from 'app/shared/services/types.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AddTypeComponent } from '../add-type/add-type.component';
import { WorkflowService } from 'app/shared/services/workflow.service';
import { ViewTypeComponent } from '../view-type/view-type.component';
import { Workflow } from 'app/shared/Models/WorkflowModel';

@Component({
  selector: 'app-list-types',
  templateUrl: './list-types.component.html',
  styleUrls: ['./list-types.component.scss',
              "/assets/sass/libs/datatables.scss",],
  encapsulation: ViewEncapsulation.None,
})
export class ListTypesComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
 
  swal =  swalFunctions;
  public typeList : Types[] = [];
  public workflow : Workflow ;

  // row data
  public rows = [];
  public ColumnMode = ColumnMode;
  public limitRef = 10;


  // column header
  public columns = [
    { name: "Type", prop: "Nom" },
    { name: "Actions", prop: "Process.id" },
  ];

  // private
  private tempData = [];


  constructor( private workflowService:WorkflowService , private typesService : TypesService , public toastr: ToastrService , private modalService: NgbModal ) { 
    this.tempData = this.typeList;
  }

    // Public Methods
  // -----------------------------------------------------------------------------------------------------
  getAllTypes(){
    this.typesService.getAllTypes().subscribe((data:Types[])=>{
    this.typeList = data;
    this.rows = data ;
    this.tempData = data ;
      console.log("work!!!",this.typeList);
    })
  }

   addType() {
     const modalRef = this.modalService.open(AddTypeComponent);
     modalRef.result.then((result) => {
       console.log(result);
       const res = this.typesService.addType(result) as Observable<any>;
       res.subscribe((data) =>{
         this.toastr.success('Type has been added successfuly!','', { closeButton: true });
         this.ngOnInit();
       },error => {
         console.log("error",error);
       })
     }).catch((error) => {
       console.log(error);
     });
   }

   viewWorkFlow(id : string) {
    console.log(id);
    this.workflowService.getWorkFlowsById(id).subscribe((data : Workflow) => {
      this.workflow = data ;
      console.log(this.workflow);
      const modalRef = this.modalService.open(ViewTypeComponent , {size : "xl"});
      modalRef.componentInstance.workflow = this.workflow;
    });
    
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
        return d.Role.toLowerCase().indexOf(val) !== -1 || !val;
      });
  
      // update the rows
      this.rows = temp;
      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }
 
     /**
   * updateLimit
   *
   * @param limit
   */
  updateLimit(limit) {
    this.limitRef = limit.target.value;
  }

  ngOnInit(): void {
  this.getAllTypes();
  }

}
