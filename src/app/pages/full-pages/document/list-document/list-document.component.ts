import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Documents } from 'app/shared/Models/DocModel';
import { DocumentService } from 'app/shared/services/document.service';
import { TasksService } from 'app/shared/services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AddDocumentComponent } from './add-document/add-document.component';

@Component({
  selector: 'app-list-document',
  templateUrl: './list-document.component.html',
  styleUrls: ['./list-document.component.scss',
              '/assets/sass/libs/datatables.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListDocumentComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;


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
     { name: "Actions", prop:[ "ID" , "Url" , "Titre" ]},
   ];

   // private
  private tempData = [];
  constructor(private docService : DocumentService ,public router: Router, private tacheService:TasksService , private modalService: NgbModal , public toastr: ToastrService ) {
    this.tempData = this.docList ;
   }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------
  getAllDocs(){
    this.docService.getAllDocs().subscribe((data:Documents[])=>{
    this.docList = data;
    this.rows = data ;
    this.tempData = data ;
      console.log("work!!!",this.docList);
    })
  }
  
  addDoc() {
    const modalRef = this.modalService.open(AddDocumentComponent , {size : "xl" , animation: true});
    modalRef.result.then((result) => {
      console.log("resultat form model : "+result);
      const res = this.docService.addDoc(result) as Observable<any>;
      res.subscribe((data) =>{
        this.toastr.success('Document has been added successfuly!','', { closeButton: true });
        this.docService.addDocState(data.dateSet).subscribe((data2) => {
          console.log(data2.responseMessage);
        });
        this.tacheService.addTache(data.dateSet).subscribe((data3) =>{
          console.log(data3.responseMessage);
        })
        console.log(data);
        this.ngOnInit();
      },error => {
        console.log("error",error);
      })
    }).catch((error) => {
      console.log(error);
    });
  }

  viewDocument(id : string){
    this.docService.getDocById(id).subscribe((data : Documents) => {
      console.log(data);
      localStorage.setItem("Document",JSON.stringify(data));
      this.router.navigate(['/Document-view']);
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
  
  ngOnInit(): void {
    this.getAllDocs();
  }

}
