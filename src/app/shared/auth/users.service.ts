import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ResponseCode } from '../Enums/ResponseCode';
import { ResponseModel } from '../Models/ResponseModel';
import { User } from '../Models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly url = 'https://localhost:7268/api/User';
  public user : User ;

  constructor(public router: Router , private httpClient: HttpClient) { }

  public getAllUsers() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient
      .get<ResponseModel>(this.url + '/GetAllUsers', { headers: headers })
      .pipe(
        map((res) => {
          let userList = new Array<User>();
          if (res.responseCode == ResponseCode.OK) {
            if (res.dateSet) {
              res.dateSet.map((x: User) => {
                userList.push(
                  new User(x.id,x.fullName, x.email, x.userName,x.phoneNumber,x.adresse, x.role )
                );
              });
            }
          }
          return userList;
        })
      );
  }

  public getUsersWithNoRole(){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient
      .get<ResponseModel>(this.url + '/GetAllUsers', { headers: headers })
      .pipe(
        map((res) => {
          let userList = new Array<User>();
          if (res.responseCode == ResponseCode.OK) {
            if (res.dateSet) {
              res.dateSet.map((x: User) => {
                if(x.role == null){
                  userList.push(
                    new User(x.id,x.fullName, x.email, x.userName,x.phoneNumber,x.adresse, x.role )
                  );
                }
              });
            }
          }
          return userList;
        })
      );
  }

  public getUserById(id : string){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient
      .get<ResponseModel>(this.url + `/GetUserById/${id}`, { headers: headers })
      .pipe(
        map((res) => {
          if (res.responseCode == ResponseCode.OK) {
            console.log(res);
            if (res.dateSet) {
              this.user = new User(res.dateSet.id,res.dateSet.fullName, res.dateSet.email, res.dateSet.userName,res.dateSet.phoneNumber,res.dateSet.adresse, res.dateSet.role );
            }
          }
          return this.user;
        })
      );
  }

  public getSelectedUser(){
    return this.user;
  }

  public deleteUser(id : string){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.delete<ResponseModel>(this.url + `/DeleteUser/${id}`,{ headers : headers});
  }

  public updateUser(id:string, form : any){
    const body = {
      Fullname: form.fullName,
      Username: form.userName,
      Email: form.email,
      PhoneNumber: form.phoneNumber,
      Adresse: form.adresse,
      Role: form.role,
      Password : "",
    };
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.put<ResponseModel>(this.url+`/UpdateUser/${id}`,body,{headers : headers}).pipe(
      map((res)=> {
        console.log(res.dateSet);
        return res ;
      }
      ) 
    );
  }
}
