import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsersService } from 'app/shared/auth/users.service';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '../../../shared/directives/must-match.validator';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss', '/assets/sass/libs/select.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountSettingsComponent implements OnInit {

  activeTab = "general";
  generalFormSubmitted = false;
  changePasswordFormSubmitted = false;
  infoFormSubmitted = false;
  alertVisible = false;
  logedUser : any ;

  generalForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required])
  });

  changePasswordForm = this.formBuilder.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    retypeNewPassword: ['', [Validators.required]]
  }, {
    validator: MustMatch('newPassword', 'retypeNewPassword')
  });

  infoForm = new FormGroup({
    bdate: new FormControl(''),
    adresse: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required])
  });

  socialForm = new FormGroup({
    facebook: new FormControl(''),
    googlePlus: new FormControl(''),
    linkedin: new FormControl('')
  });

  constructor(private userService : UsersService , public toastr: ToastrService , private formBuilder: FormBuilder) { }

  ngOnInit() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.logedUser = userInfo ;
    console.log(this.logedUser);
    this.generalForm.controls['username'].setValue(userInfo.userName);
    this.generalForm.controls['name'].setValue(userInfo.fullName);
    this.generalForm.controls['email'].setValue(userInfo.email);
    this.infoForm.controls['bdate'].setValue(userInfo.birthDate);
    this.infoForm.controls['adresse'].setValue(userInfo.adresse);
    this.infoForm.controls['phone'].setValue(userInfo.phoneNumber);
    this.socialForm.controls['facebook'].setValue(userInfo.facebook);
    this.socialForm.controls['googlePlus'].setValue(userInfo.google);
    this.socialForm.controls['linkedin'].setValue(userInfo.linkedin);
  }

  setActiveTab(tab) {
    this.activeTab = tab;
  }

  get gf() {
    return this.generalForm.controls;
  }

  get cpf() {
    return this.changePasswordForm.controls;
  }

  get inf() {
    return this.infoForm.controls;
  }

  onGeneralFormSubmit() {
    this.generalFormSubmitted = true;
    if (this.generalForm.invalid) {
      return;
    }
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const body = {
      Fullname: this.generalForm.controls['name'].value,
      Username: this.generalForm.controls['username'].value,
      Email: userInfo.email,
      PhoneNumber: userInfo.phoneNumber,
      Adresse: userInfo.adresse,
      Gender : userInfo.gender,
      BirthDate: userInfo.birthdate ,
      Facebook: userInfo.facebook,
      Google: userInfo.google,
      Linkedin: userInfo.linkedin,
      LastTimeLogedIn: userInfo.lastTimeLogedIn , 
      Role: userInfo.role,
      Password : "",
    };
    this.userService.updateUser(userInfo.id,body).subscribe((data) =>{
      if(data.responseCode == 1){
        userInfo.fullname = data.dateSet.fullname ;
        userInfo.username = data.dateSet.username;
        localStorage.setItem("userInfo",JSON.stringify(userInfo));
        console.log("user up to date");
        this.toastr.success('User is uptodate!', 'Success');
      }else{
        this.toastr.error(data.responseMessage, 'ERROR');
      }
    })
  }

  onChangePasswordFormSubmit() {
    this.changePasswordFormSubmitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    }

    const body = {
      NewPassword : this.changePasswordForm.controls['newPassword'].value,
      CurrentPassword : this.changePasswordForm.controls['oldPassword'].value,
    }

    this.userService.changePassword(body).subscribe((data) => {
      if(data.responseCode == 1){
        this.toastr.success('Your Password changed successfuly', 'Success');
        this.ngOnInit();
        this.changePasswordForm.reset;
      }else{
        this.toastr.error(data.responseMessage, 'ERROR');
      }
    })
  }

  onInfoFormSubmit() {
    this.infoFormSubmitted = true;
    if (this.infoForm.invalid) {
      return;
    }

    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const body = {
      Fullname: userInfo.fullName,
      Username: userInfo.userName,
      Email: userInfo.email,
      PhoneNumber: this.infoForm.controls['phone'].value,
      Adresse: this.infoForm.controls['adresse'].value,
      Gender : userInfo.gender,
      BirthDate: this.infoForm.controls['bdate'].value ,
      Facebook: userInfo.facebook,
      Google: userInfo.google,
      Linkedin: userInfo.linkedin,
      LastTimeLogedIn: userInfo.lastTimeLogedIn , 
      Role: userInfo.role,
      Password : "",
    };
    this.userService.updateUser(userInfo.id,body).subscribe((data) =>{
      if(data.responseCode == 1){
        userInfo.phoneNumber = data.dateSet.phoneNumber ;
        userInfo.adresse = data.dateSet.adresse;
        userInfo.birthDate = data.dateSet.birthDate ;
        localStorage.setItem("userInfo",JSON.stringify(userInfo));
        console.log("user up to date");
        this.toastr.success('User is uptodate!', 'Success');
      }else{
        this.toastr.error(data.responseMessage, 'ERROR');
      }
    })
  }

  onSocialFormSubmit() {
    if (this.socialForm.invalid) {
      return;
    }
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const body = {
      Fullname: userInfo.fullName,
      Username: userInfo.userName,
      Email: userInfo.email,
      PhoneNumber: userInfo.phoneNumber,
      Adresse: userInfo.adresse,
      Gender : userInfo.gender,
      BirthDate: userInfo.birthDate,
      Facebook: this.socialForm.controls['facebook'].value,
      Google: this.socialForm.controls['googlePlus'].value,
      Linkedin: this.socialForm.controls['linkedin'].value,
      LastTimeLogedIn: userInfo.lastTimeLogedIn , 
      Role: userInfo.role,
      Password : "",
    };

    this.userService.updateUser(userInfo.id,body).subscribe((data) =>{
      if(data.responseCode == 1){
        userInfo.facebook = data.dateSet.facebook ;
        userInfo.google = data.dateSet.google;
        userInfo.linkedin = data.dateSet.linkedin ;
        localStorage.setItem("userInfo",JSON.stringify(userInfo));
        console.log("user up to date");
        this.toastr.success('User is uptodate!', 'Success');
      }else{
        this.toastr.error(data.responseMessage, 'ERROR');
      }
    })
  }

  resetGeneral(){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.generalForm.controls['username'].setValue(userInfo.userName);
    this.generalForm.controls['name'].setValue(userInfo.fullName);
    this.generalForm.controls['email'].setValue(userInfo.email);
  }

  resetSocial(){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.socialForm.controls['facebook'].setValue(userInfo.facebook);
    this.socialForm.controls['googlePlus'].setValue(userInfo.google);
    this.socialForm.controls['linkedin'].setValue(userInfo.linkedin);
  }

  resetInfo(){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.infoForm.controls['bdate'].setValue(userInfo.birthDate);
    this.infoForm.controls['adresse'].setValue(userInfo.adresse);
    this.infoForm.controls['phone'].setValue(userInfo.phoneNumber);
  }
}
