import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ResponseCode } from '../Enums/ResponseCode';
import { ResponseModel } from '../Models/ResponseModel';
import { Role } from '../Models/RoleModel';
import { User } from '../Models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  readonly url = 'https://localhost:7268/api/Role';
  constructor(private httpClient: HttpClient) { }

  public addRole(role: string) {
    const body = {
      Role: role,
    };
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.post<ResponseModel>(this.url + '/AddRole',body , { headers: headers }).pipe(
      map((res)=> {
        console.log(res.responseMessage);
      })
    );
  }

  public getAllRoles() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient
      .get<ResponseModel>(this.url + '/GetAllRoles', { headers: headers })
      .pipe(
        map((res) => {
          let roleList = new Array<Role>();
          if (res.responseCode == ResponseCode.OK) {
            if (res.dateSet) {
              res.dateSet.map((x:string) => {
                roleList.push(new Role(x));
              });
            }
          }
          return roleList;
        })
      );
  }
  
  public getUsersByRole(name : string){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient
      .get<ResponseModel>(this.url + `/GetUsersByRole/${name}`, { headers: headers }).pipe(
        map((res) => {
          let userList = new Array<User>();
          if (res.responseCode == ResponseCode.OK) {
            if (res.dateSet) {
              res.dateSet.map((x: User) => {
                userList.push(
                  new User(x.id,x.fullName, x.email, x.userName,x.phoneNumber,x.adresse,x.gender ,x.position,x.function, x.birthDate , x.facebook , x.google , x.linkedin ,x.lastTimeLogedIn , x.role )
                );
              });
            }
          }
          return userList;
        })
      );
  } 

  public removeUserFromRole(id : string){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    console.log(id);
    return this.httpClient.delete<ResponseModel>(this.url + `/RemoveUserFromRole/${id}`,{ headers : headers});
  } 

  public addUserToRole(id : string , nameRole : string){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    const body = {
      iduser : id,
      roleName: nameRole,
    };
    return this.httpClient
      .post<ResponseModel>(this.url + '/AddUserToRole',body, { headers: headers }).pipe(
        map((res) => {
          if (res.responseCode == ResponseCode.OK) {
            console.log(res);
            console.log(res.responseMessage);
          }
          return res;
        })
      );
  }

  public deleteRole(name : string){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.delete<ResponseModel>(this.url + `/DeleteRole/${name}`,{ headers : headers});
  }
  
}
