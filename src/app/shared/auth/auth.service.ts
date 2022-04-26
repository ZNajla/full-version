import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ResponseModel } from '../Models/ResponseModel';
import { User } from '../Models/UserModel';

@Injectable()
export class AuthService {

   readonly url = 'https://localhost:7268/api/User';

   user : User ;
   loged : boolean ;

  constructor(public router: Router , private httpClient: HttpClient) {
  
  }

  /* fonction signupUser pour ajouter un nouveau */
  signupUser(form : any) {

    const body = {
      Fullname: form.fullName,
      Username: form.userName,
      Email: form.email,
      PhoneNumber: form.phoneNumber,
      Adresse: form.adresse,
      Role: form.role, 
      Password: form.password,
    };

    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.post<ResponseModel>(this.url + '/AddNewUser',body, { headers: headers }).pipe(
      map((res)=> {
        console.log(res.dateSet);
        return res ;
      }
      ) 
    );
    
  }

  signinUser(email: string, password: string) {
    const body = {
      Email:email ,
      Password: password,
    };
    return this.httpClient.post<ResponseModel>(this.url + '/Login', body).pipe(
      map((res) => {
        if (res.responseCode == 1) {
          console.log(res);
          this.loged = true ;
        }
        return res;
      })
    );

    //uncomment above firebase auth code and remove this temp code
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(true);
      }, 1000);
    });

  }

  logout() {
    localStorage.removeItem("userInfo");
    this.router.navigate(['/Login']);
  }

  
  isAuthenticated() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if(userInfo == null){
      return false;
    }else{
      return true;
    }
  }
}
