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

  public getTasksById(id : string) {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.get<ResponseModel>(this.url + `/GetTachesById/${id}`, { headers: headers })
      .pipe(
        map((res) => {
          let tasksList = new Array<Task>();
          if (res.responseCode == ResponseCode.OK) {
            if (res.dateSet) {
              console.log(res.dateSet);
              res.dateSet.map((x: any) => {
                tasksList.push(
                  new Task( x.id , x.action , x.dateCreation , x.document , x.user)
                );
              });
            }
          }
          return tasksList;
        })
      );
  }
}
