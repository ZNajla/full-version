import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Task } from 'app/shared/Models/TaskModel';
import { TasksService } from 'app/shared/services/tasks.service';

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
   // row data
   public rows = [];
   public ColumnMode = ColumnMode;
   public limitRef = 10;
   
 
   // column header
   public columns = [
     { name: "Document", prop: "Document.titre" },
     { name: "Action", prop: "Action" },
     { name: "Date Upload", prop: "DateCreation"},
     { name: "Actions", prop: "id" },
   ];

   // private
  private tempData = [];
  
  constructor(private tacheService:TasksService) {
    this.tempData = this.taskList ;
   }

  getTasks(){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.tacheService.getTasksById(userInfo.id).subscribe((data:Task[])=>{
      this.taskList = data;
      this.rows = data ;
      this.tempData = data ;
        console.log("work!!!",this.taskList);
      })
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
