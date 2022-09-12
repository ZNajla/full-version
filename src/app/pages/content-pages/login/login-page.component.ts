import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { User } from 'app/shared/Models/UserModel';
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

  loginFormSubmitted = false;
  isLoginFailed = false;
  response : any ;
  readonly url = 'https://localhost:7268/api/User';
  ErrorMessage : string ;
  user : User ;
  logedUser : User;

  public loginForm = this.formBuilder.group({
    email:new FormControl('', [Validators.required]),
    password:new FormControl('', [Validators.required]),
    rememberMe: new FormControl(true)
  });


  constructor(private router: Router, private authService: AuthService,
    private spinner: NgxSpinnerService,
    private formBuilder:FormBuilder) {
  }


  get lf() {
    return this.loginForm.controls;
  }

  // On submit button click
  onSubmit() {
  this.loginFormSubmitted = true;
   this.spinner.show(undefined,
    {
      type: 'ball-triangle-path',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      fullScreen: true
    });
    console.log("on submit");
    const res = this.authService.signinUser(this.loginForm.controls["email"].value,this.loginForm.controls["password"].value) as Observable<any>;
    res.subscribe((data) => {
      if(data.responseCode == 1){
        console.log("responce code ok");
        localStorage.setItem("userInfo",JSON.stringify(data.dateSet));
        this.spinner.hide();
        if(data.dateSet.role == "Admin"){
          this.router.navigate(['/dashboard-Admin']);
        }else{
          this.router.navigate(['/dashboard-User'])
        }
      }else{
        this.ngOnInit();
        this.isLoginFailed = true;
        this.ngOnInit();
        this.ErrorMessage = data.responseMessage ;
        this.spinner.hide();
        this.ngOnInit();
        console.log('error: ' + data.responseMessage);
      }
      });
  }

  ngOnInit(){}
}