import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import * as swalFunctions from '../../../../shared/data/sweet-alerts';
import swal from 'sweetalert2';
import { Types } from 'app/shared/Models/TypesModal';
import { Router } from '@angular/router';
import { TypesService } from 'app/shared/services/types.service';

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
  
  // row data
  public rows = [];
  public ColumnMode = ColumnMode;
  public limitRef = 10;

  // column header
  public columns = [
    { name: "Type", prop: "Nom" },
    { name: "Actions", prop: "ID" },
  ];

  // private
  private tempData = [];


  constructor( private router:Router , private tpesService : TypesService ) { 
    this.tempData = this.typeList;
  }

    // Public Methods
  // -----------------------------------------------------------------------------------------------------
  getAllTypes(){
    this.rolesService.getAllRoles().subscribe((data:Role[])=>{
    this.rolesList = data;
    this.rows = data ;
    this.tempData = data ;
      console.log("work!!!",this.rolesList);
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
  }

}
