import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from 'app/shared/auth/role.service';
import { Role } from 'app/shared/Models/RoleModel';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss' , '/assets/sass/pages/page-users.scss', '/assets/sass/libs/select.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersAddComponent implements OnInit {

  registerFormSubmitted = false;
  ErrorMessage : string ;
  public roles : Role[] = [];

  public registerForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required],
    adresse: ['', Validators.required],
    role:[''],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(public activeModal: NgbActiveModal ,private formBuilder: FormBuilder ,private roleService:RoleService) { }

  ngOnInit(): void {
    this.getListRoles();
    this.registerForm.reset();
  }

  get rf() {
    return this.registerForm.controls;
  }

  //  On submit click, reset field value
  onSubmit() {
    this.registerFormSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    console.log("work!!!!");
    this.activeModal.close(this.registerForm.value);
  }

  getListRoles(){
    this.roleService.getAllRoles().subscribe((data:Role[])=>{
      this.roles = data;
        console.log("work!!!",this.roles);
      })
  }

}
