import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { RoleService } from 'app/shared/auth/role.service';
import { UsersService } from 'app/shared/auth/users.service';
import { User } from 'app/shared/Models/UserModel';
import { ToastrService } from 'ngx-toastr';
import * as swalFunctions from '../../../../shared/data/sweet-alerts';
import swal from 'sweetalert2';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-roles-edit',
  templateUrl: './roles-edit.component.html',
  styleUrls: ['./roles-edit.component.scss']
})
export class RolesEditComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;

  swal =  swalFunctions;
  public userList : User[] = [];
  public userList2 : User[] = [];
  public role : string;

  public userIdform = this.formBuilder.group({
    userId:[""]
  })
  
   // row data
   public rows = [];
   public ColumnMode = ColumnMode;
   public limitRef = 10;
   
 
   // column header
   public columns = [
     { name: "Username", prop: "userName" },
     { name: "Full Name", prop: "fullName" },
     { name: "Email", prop: "email" },
     { name: "Role", prop: "role" },
     { name: "Actions", prop: "id" },
   ];
 
   // private
   private tempData = [];
 
  constructor(private roleService : RoleService ,private formBuilder: FormBuilder , private route : ActivatedRoute , private usersService : UsersService , public toastr: ToastrService) { 
    this.tempData = this.userList;
  }

  ngOnInit(): void {
    this.role = this.route.snapshot.paramMap.get('name');
    this.getAllUser(this.role);
    this.getUsers();
  }

  getUsers(){
    this.usersService.getUsersWithNoRole().subscribe((data:User[])=>{
      this.userList2 = data;
      console.log(this.userList2);
    });
  }
  
  getAllUser(name : string){
    this.roleService.getUsersByRole(name).subscribe((data:User[])=>{
    this.userList = data;
    console.log("work!!!",this.userList);
    this.rows = data ;
    this.tempData = data;
    })
  }

  removeUser(id : string ){
    swal.fire({
      title: '<strong> Are you sure to delete </strong>',
      icon: 'info',
      html: 'Press yes to delete it !!',
      showCloseButton: true,
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
            this.roleService.removeUserFromRole(id).subscribe( data => {
            console.log(data);
            this.ngOnInit();
          });
          swal.fire(
            'Deleted!',
            'The user has been deleted.',
            'success'
          )
        }
      })
  }
/**
   * addUser
   *
   * @param event
   */
  addUser(){
    const user = this.userIdform.value;
    console.log(user);
    this.roleService.addUserToRole(user.userId,this.role).subscribe(data =>{
      console.log(data);
      if(data.responseCode == 1){
        this.toastr.success('User is added!', 'Success');
        this.ngOnInit();
      }else{
        this.toastr.error(data.responseMessage, 'error');
      }
    })

  }

  userListSize(){
    return this.userList2.length > 0;
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

}
