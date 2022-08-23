import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ResponseCode } from '../Enums/ResponseCode';
import { ResponseModel } from '../Models/ResponseModel';
import { Task } from '../Models/TaskModel';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  readonly url = 'https://localhost:7268/api/Tache';

  constructor(public router: Router , private httpClient: HttpClient) { }

  addTache(id : string){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.post<ResponseModel>(this.url + `/AddTache/${id}`, { headers: headers }).pipe(
      map((res) => {
        console.log(res.responseMessage);
        return res;
      }));
  }

  public getTasksByUserId() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.get<ResponseModel>(this.url + `/GetTachesByUserId/${userInfo.id}`, { headers: headers })
      .pipe(
        map((res) => {
          let tasksList = new Array<Task>();
          if (res.responseCode == ResponseCode.OK) {
            if (res.dateSet) {
              res.dateSet.map((x: any) => {
                switch (x.etat) {
                  case 0:
                    x.etat = 'Awaiting'
                    break;
                  case 3:
                    x.etat = 'Validated'
                    break;
                  case 4:
                    x.etat = 'Rejected'
                    break;
              }
                tasksList.push(
                  new Task( x.id , x.action , x.etat , x.dateCreation , x.document , x.user)
                );
              });
            }
          }
          return tasksList;
        })
      );
  }

  public getTaskById(id : string){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.get<ResponseModel>(this.url +`/GetTachesById/${id}`, { headers: headers })
      .pipe(map((res) => {
          let task : Task;
          if (res.responseCode == ResponseCode.OK) {
            if (res.dateSet) {
              switch (res.dateSet.etat) {
                case 0:
                  res.dateSet.etat = 'Awaiting'
                  break;
                case 3:
                  res.dateSet.etat = 'Validated'
                  break;
                case 4:
                  res.dateSet.etat = 'Rejected'
                  break;
            }
              task = new Task( res.dateSet.id , res.dateSet.action , res.dateSet.etat , res.dateSet.dateCreation , res.dateSet.document , res.dateSet.user );
            }
          }
          return task;
      }));
  }
}