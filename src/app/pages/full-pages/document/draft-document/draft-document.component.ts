import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import * as swalFunctions from '../../../../shared/data/sweet-alerts';
import swal from 'sweetalert2';
import { Documents } from 'app/shared/Models/DocModel';
import { DocumentService } from 'app/shared/services/document.service';
import { Router } from '@angular/router';
import { TasksService } from 'app/shared/services/tasks.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ViewDocumentComponent } from '../view-document/view-document.component';

@Component({
  selector: 'app-draft-document',
  templateUrl: './draft-document.component.html',
  styleUrls: ['./draft-document.component.scss',
              '/assets/sass/libs/datatables.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DraftDocumentComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;


  swal =  swalFunctions;
  public docList : Documents[] = [];
   // row data
   public rows = [];
   public ColumnMode = ColumnMode;
   public limitRef = 10;
   
    // column header
    public columns = [
      { name: "Document", prop: "Titre" },
      { name: "State", prop: "CurrentState" },
      { name: "Uploaded by", prop: "user" },
      { name: "Date Upload", prop: "Date"},
      { name: "Actions", prop: "ID"},
    ];

     // private
  private tempData = [];

  constructor(private docService : DocumentService ,public router: Router, private tacheService:TasksService , private modalService: NgbModal , public toastr: ToastrService) 
  { 
    this.tempData = this.docList ;
  }
 
  ngOnInit(): void {
    this.getMyDoc();
  }

  getMyDoc(){
    console.log("--------------------------");
    this.docService.getMyDraft().subscribe((data:Documents[])=>{
      this.docList = data;
      this.rows = data ;
      this.tempData = data ;
        console.table(this.docList);
      })
   }

  onDeleteDoc(id: string){
    swal.fire({
      title: '<strong> Are you sure to delete </strong>',
      icon: 'info',
      html: 'Press yes to delete it !!',
      showCloseButton: false,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-o-up"></i> Yes!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText: '<i class="fa fa-thumbs-o-down"> No</i>',
      cancelButtonAriaLabel: 'Thumbs down',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      }}).then((result) => {
        if (result.isConfirmed) {
          console.log(id);
            this.docService.deleteDocument(id).subscribe( data => {
            console.log(data);
            this.ngOnInit();
          });
          swal.fire(
            'Deleted!',
            'Document has been deleted.',
            'success'
          )
        }
      })
  }

  viewDocument(id : string){
    this.docService.getDocById(id).subscribe((data : Documents) => {
    console.log(data);
    localStorage.setItem("Document",JSON.stringify(data));
    const modalRef = this.modalService.open(ViewDocumentComponent , {size : "xl" , animation: true});
});
}
     /**
   * filterByState
   *
   * @param event
   */
      filterByState(event) {
        const val = event.target.value.toLowerCase();
        // filter our data
        const temp = this.tempData.filter(function (d) {
          return d.CurrentState.toLowerCase().indexOf(val) !== -1 || !val;
      });
        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
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
            return d.Titre.toLowerCase().indexOf(val) !== -1 || !val;
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

}
