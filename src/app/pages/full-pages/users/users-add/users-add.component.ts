import { value } from './../../../../shared/data/dropdowns';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal , NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from 'app/shared/auth/role.service';
import { Role } from 'app/shared/Models/RoleModel';


@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss' , '/assets/sass/pages/page-users.scss', '/assets/sass/libs/select.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersAddComponent implements OnInit {

  popupModel;
  model: NgbDateStruct;
  registerFormSubmitted = false;
  ErrorMessage : string ;
  public roles : Role[] = [];

  public registerForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required],
    adresse: ['', Validators.required],
    gender: ['' , Validators.required],
    position: ['' , Validators.required],
    function : ['' , Validators.required],
    role:[''],
    password: ['']
  });

  constructor(public activeModal: NgbActiveModal ,private formBuilder: FormBuilder ,private roleService:RoleService) { 
    this.registerForm.reset();
  }

  ngOnInit(): void {
    this.getListRoles();
    this.registerForm.reset;
  }

  get rf() {
    return this.registerForm.controls;
  }

  //  On submit click, reset field value
  onSubmit() {
    console.log("-----------------");
    this.registerFormSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.activeModal.close(this.registerForm.value);
  }

  getListRoles(){
    this.roleService.getAllRoles().subscribe((data:Role[])=>{
      this.roles = data;
        console.log("work!!!",this.roles);
      })
  }

}