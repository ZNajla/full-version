import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Task } from 'app/shared/Models/TaskModel';
import { DocumentService } from 'app/shared/services/document.service';
import { TasksService } from 'app/shared/services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { ViewTaskComponent } from '../view-task/view-task.component';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss',
              '/assets/sass/libs/datatables.scss'],
  encapsulation: ViewEncapsulation.None,            
})
export class ListTasksComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;


  public taskList : Task[] = [];
  public task : Task ;
   // row data
   public rows = [];
   public ColumnMode = ColumnMode;
   public limitRef = 10;
   
 
   // column header
   public columns = [
     { name: "Document", prop: "Document.titre" },
     { name: "Action", prop: "Action" },
     { name: "Date Upload", prop: "DateCreation"},
     { name: "Actions", prop: ["ID" , "Etat"] },
   ];

   // private
  private tempData = [];
  
  constructor(private tacheService:TasksService , private modalService: NgbModal , private docService : DocumentService , public toastr: ToastrService) {
    this.tempData = this.taskList ;
   }

  getTasks(){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.tacheService.getTasksByUserId().subscribe((data:Task[])=>{
      this.taskList = data;
      this.rows = data ;
      this.tempData = data ;
        console.log("work!!!",this.taskList);
      })
  }

  viewTask(id : string) {
    console.log(id);
    this.tacheService.getTaskById(id).subscribe((data : Task) => {
      this.task = data ;
      console.log(this.task);
      const modalRef = this.modalService.open(ViewTaskComponent , {size : "lg"});
      modalRef.componentInstance.task = this.task;

      modalRef.result.then((result) => {
        console.log(result);
        this.docService.updateDocState(this.task.ID , result).subscribe((data2) =>{
          console.log(data2); 
        this.ngOnInit();
          if(result.StateDocument == 3){
            this.tacheService.addTache(this.task.Document.id).subscribe((data3) =>{
              console.log(data3.responseMessage);
              this.ngOnInit();
            })
          }
        });
        this.ngOnInit();
        this.toastr.success('successfuly!','', { closeButton: true });
     });
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
      return d.Document.toLowerCase().indexOf(val) !== -1 || !val;
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
    this.getTasks();
  }

}
