import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../../shared/directives/must-match.validator';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { Observable } from 'rxjs';
import { RoleService } from 'app/shared/auth/role.service';
import { Role } from 'app/shared/Models/RoleModel';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html', 
  styleUrls: ['./register-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class RegisterPageComponent implements OnInit {
  registerFormSubmitted = false;
  ErrorMessage : string ;
  public roles : Role[] = [];

  public registerForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required],
    adresse: ['', Validators.required],
    role:['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private formBuilder: FormBuilder, private router: Router , private authService: AuthService ,private roleService:RoleService) { }

  ngOnInit() {
    this.getListRoles();
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

    console.log(this.registerForm.controls["fullName"].value);
    
    let fullName = this.registerForm.controls["fullName"].value;
    let userName = this.registerForm.controls["userName"].value;
    let email = this.registerForm.controls["email"].value;
    let adresse = this.registerForm.controls["adresse"].value;
    let phoneNumber = this.registerForm.controls["phoneNumber"].value;
    let role = this.registerForm.controls["role"].value;
    let password = this.registerForm.controls["password"].value;

    console.log("work!!!!");
    const res = this.authService.signupUser(this.registerForm.value) as Observable<any>;
    res.subscribe((data) => {
      if(data.responseCode == 1){
        console.log("result"+data);
        console.log("response code ok");
        this.registerForm.reset();
        this.router.navigate(['/dashboard']);
      }else{
        this.ErrorMessage = data.responseMessage ;
        console.log('error: ' + data.responseMessage);
      }
      });
  }

  getListRoles(){
    this.roleService.getAllRoles().subscribe((data:Role[])=>{
      this.roles = data;
        console.log("work!!!",this.roles);
      })
  }
}
