import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { DatatableComponent, ColumnMode } from "@swimlane/ngx-datatable";
import { UsersService } from "app/shared/auth/users.service";
import { User } from "app/shared/Models/UserModel";
import { ToastrService } from "ngx-toastr";
import * as swalFunctions from '../../../../shared/data/sweet-alerts';
import swal from 'sweetalert2';
import { AuthService } from "app/shared/auth/auth.service";
import { Observable } from 'rxjs';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UsersAddComponent } from "../users-add/users-add.component";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: [
    "./users-list.component.scss",
    "/assets/sass/libs/datatables.scss",
  ],
  encapsulation: ViewEncapsulation.None,
})
export class UsersListComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;

  swal =  swalFunctions;
  public usersList : User[] = [];
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

  constructor(private usersService:UsersService , private router:Router,public toastr: ToastrService , private authService: AuthService , private modalService: NgbModal) {
    this.tempData = this.usersList;
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------
  getAllUser(){
    this.usersService.getAllUsers().subscribe((data:User[])=>{
    this.usersList = data;
    this.rows = data ;
    this.tempData = data ;
      console.log("work!!!",this.usersList);
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
      return d.userName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  deleteUser(id : string){
    this.usersService.deleteUser(id).subscribe((data) =>{
      console.log("user has een deleted");
      this.getAllUser();
      this.ngOnInit();
    },error =>{
      console.log("error",error);
    });
  }

  onDeleteUser(id: string){
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
            this.usersService.deleteUser(id).subscribe( data => {
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

  addUser() {
    const modalRef = this.modalService.open(UsersAddComponent , {size : "xl"});
    modalRef.result.then((result) => {
      console.log(result);
      const res = this.authService.signupUser(result) as Observable<any>;
      res.subscribe((data) =>{
        this.toastr.success('User has been added successfuly!','', { closeButton: true });
        this.ngOnInit();
      },error => {
        console.log("error",error);
      })
    }).catch((error) => {
      console.log(error);
    });
  }

  onUpdateUser(id :string){
    console.log(id);
    this.usersService.getUserById(id).subscribe((data) =>{
      console.log(data);
      this.router.navigate([`/users-edit`]);
    })
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
    this.getAllUser();
  }
}
