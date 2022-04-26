import { UsersService } from './../../../../shared/auth/users.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from 'app/shared/Models/UserModel';
import { FormBuilder, Validators } from '@angular/forms';
import { RoleService } from 'app/shared/auth/role.service';
import { Role } from 'app/shared/Models/RoleModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss', '/assets/sass/pages/page-users.scss', '/assets/sass/libs/select.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersEditComponent implements OnInit {

  updateFormSubmitted = false;
  public user : User ;
  public roles : Role[] = [];

  public updateForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required],
    adresse: ['', Validators.required],
    role:['', Validators.required],
    password:['']
  });
  idUser : string;

  constructor(private formBuilder: FormBuilder, public toastr: ToastrService ,private userService : UsersService ,private roleService:RoleService) { }

  ngOnInit(): void {
    this.getUser();
    this.getListRoles();
  }

  getUser(){
    this.user = this.userService.getSelectedUser();
    this.idUser = this.user.id;
    this.updateForm.controls['userName'].setValue(this.user.userName);
    this.updateForm.controls['fullName'].setValue(this.user.fullName);
    this.updateForm.controls['email'].setValue(this.user.email);
    this.updateForm.controls['phoneNumber'].setValue(this.user.phoneNumber);
    this.updateForm.controls['adresse'].setValue(this.user.adresse);
    this.updateForm.controls['role'].setValue(this.user.role);
  }

  get rf() {
    return this.updateForm.controls;
  }

  getListRoles(){
    this.roleService.getAllRoles().subscribe((data:Role[])=>{
      this.roles = data;
        console.log("work!!!",this.roles);
      })
  }

  updateUser(){
    this.updateFormSubmitted = true;
    if (this.updateForm.invalid) {
      return;
    }
    this.userService.updateUser(this.idUser, this.updateForm.value).subscribe((data) =>{
      if(data.responseCode == 1){
        console.log("user up to date");
        this.toastr.success('User is uptodate!', 'Success');
      }else{
        this.toastr.error(data.responseMessage, 'ERROR');
      }
      
    })

  }
}
