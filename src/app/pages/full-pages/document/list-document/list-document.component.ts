import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-list-document',
  templateUrl: './list-document.component.html',
  styleUrls: ['./list-document.component.scss',
  "/assets/sass/libs/datatables.scss",]
})
export class ListDocumentComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;

   // row data
   public rows = [];
   public ColumnMode = ColumnMode;
   public limitRef = 10;
   
 
   // column header
   public columns = [
     { name: "Document", prop: "Titre" },
     { name: "Version", prop: "Version" },
     { name: "Uploaded by", prop: "user" },
     { name: "Date Upload", prop: "Date"},
     { name: "Actions", prop: "id" },
   ];

   // private
  private tempData = [];
  constructor() { }

  /**
   * filterUpdate
   *
   * @param event
   */
   filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.userName.toLowerCase().indexOf(val) !== -1 || !val;
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
  }

}
