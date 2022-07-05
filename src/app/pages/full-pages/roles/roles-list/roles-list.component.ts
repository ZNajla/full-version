import { RoleService } from 'app/shared/auth/role.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { UsersService } from 'app/shared/auth/users.service';
import { Role } from 'app/shared/Models/RoleModel';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as swalFunctions from '../../../../shared/data/sweet-alerts';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddRoleModalComponent } from './add-role-modal/add-role-modal.component';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss',
              "/assets/sass/libs/datatables.scss",
              ],
  encapsulation: ViewEncapsulation.None,
})

export class RolesListComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;

  swal =  swalFunctions;
  public rolesList : Role[] = [];
  public roleform = this.formBuilder.group({
    role:["",Validators.required]
  })
  // row data
  public rows = [];
  public ColumnMode = ColumnMode;
  public limitRef = 10;

  // column header
  public columns = [
    { name: "Role", prop: "Role" },
    { name: "Actions", prop: "Role" },
  ];

  // private
  private tempData = [];

  constructor(private usersService:UsersService , private router:Router , private rolesService : RoleService , private formBuilder:FormBuilder , public toastr: ToastrService , private modalService: NgbModal) {
    this.tempData = this.rolesList;
   }

   // Public Methods
  // -----------------------------------------------------------------------------------------------------
  getAllRoles(){
    this.rolesService.getAllRoles().subscribe((data:Role[])=>{
    this.rolesList = data;
    this.rows = data ;
    this.tempData = data ;
      console.log("work!!!",this.rolesList);
    })
  }

  onDeleteRole(name: string){
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
            this.rolesService.deleteRole(name).subscribe( data => {
            console.log(data);
            this.ngOnInit();
          })
          swal.fire(
            'Deleted!',
            'Role has been deleted.',
            'success'
          )
        }
      })
  }

  onUpdateUser(id :string){
    console.log(id);
    this.usersService.getUserById(id).subscribe((data) =>{
      console.log(data);
      this.router.navigate([`/users-edit`]);
    })
  }
  
  addRole() {
    const modalRef = this.modalService.open(AddRoleModalComponent);
    modalRef.result.then((result) => {
      console.log(result);
      this.rolesService.addRole(result.role).subscribe((data) =>{
        this.toastr.success('Role has been added successfuly!','', { closeButton: true });
        this.ngOnInit();
      },error => {
        console.log("error",error);
      })
    }).catch((error) => {
      console.log(error);
    });
  }

  onUpDate(name : string){
    this.router.navigate([`roles-edit/${name}`]);
  }

  roleAdmin(name : string){
    return name == "Admin";
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
    this.getAllRoles();
  }

}