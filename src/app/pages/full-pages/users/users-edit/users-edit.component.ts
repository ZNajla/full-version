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
    position: ['', Validators.required],
    function: ['', Validators.required],
    birthDate: ['', Validators.required],
    facebook: ['', Validators.required],
    google: ['', Validators.required],
    linkedin: ['', Validators.required],
    role:['', Validators.required],
    password:['']
  });

  constructor(private formBuilder: FormBuilder, public toastr: ToastrService ,private userService : UsersService ,private roleService:RoleService) { }

  ngOnInit(): void {
    this.getUser();
    this.getListRoles();
  }

  getUser(){
    this.user = JSON.parse(localStorage.getItem('editUser'));
    this.updateForm.controls['userName'].setValue(this.user.userName);
    this.updateForm.controls['fullName'].setValue(this.user.fullName);
    this.updateForm.controls['email'].setValue(this.user.email);
    this.updateForm.controls['phoneNumber'].setValue(this.user.phoneNumber);
    this.updateForm.controls['adresse'].setValue(this.user.adresse);
    this.updateForm.controls['role'].setValue(this.user.role);
    this.updateForm.controls['position'].setValue(this.user.position);
    this.updateForm.controls['function'].setValue(this.user.function);
    this.updateForm.controls['birthDate'].setValue(this.user.birthDate);
    this.updateForm.controls['facebook'].setValue(this.user.facebook);
    this.updateForm.controls['google'].setValue(this.user.google);
    this.updateForm.controls['linkedin'].setValue(this.user.linkedin);
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
    // if (this.updateForm.invalid) {
    //   return;
    // }
    const body = {
      Fullname: this.updateForm.controls['fullName'].value,
      Username: this.updateForm.controls['userName'].value,
      Email: this.updateForm.controls['email'].value,
      PhoneNumber: this.user.phoneNumber,
      Adresse: this.user.adresse,
      Gender : this.user.gender,
      Position : this.updateForm.controls['position'].value,
      Function : this.updateForm.controls['function'].value,
      BirthDate: this.user.birthDate ,
      Facebook: this.user.facebook,
      Google: this.user.google,
      Linkedin: this.user.linkedin,
      LastTimeLogedIn: this.user.lastTimeLogedIn , 
      Role: this.updateForm.controls['role'].value,
      Password : "",
    };
    this.userService.updateUser(this.user.id, body).subscribe((data) =>{
      if(data.responseCode == 1){
        console.log("user up to date");
        this.toastr.success('User is uptodate!', 'Success');
      }else{
        this.toastr.error(data.responseMessage, 'ERROR');
      }
      
    })

  }


  updateUser2(){
    this.updateFormSubmitted = true;
    // if (this.updateForm.invalid) {
    //   return;
    // }
    const body = {
      Fullname: this.user.fullName,
      Username: this.user.userName,
      Email: this.user.email,
      PhoneNumber: this.updateForm.controls['phoneNumber'].value,
      Adresse: this.updateForm.controls['adresse'].value,
      Gender : this.user.gender,
      Position : this.user.position,
      Function : this.user.function,
      BirthDate: this.user.birthDate ,
      Facebook: this.updateForm.controls['facebook'].value,
      Google: this.updateForm.controls['google'].value,
      Linkedin: this.updateForm.controls['linkedin'].value,
      LastTimeLogedIn: this.user.lastTimeLogedIn , 
      Role: this.user.role,
      Password : "",
    };
    this.userService.updateUser(this.user.id, body).subscribe((data) =>{
      if(data.responseCode == 1){
        console.log("user up to date");
        this.toastr.success('User is uptodate!', 'Success');
      }else{
        this.toastr.error(data.responseMessage, 'ERROR');
      }
      
    })

  }


}
