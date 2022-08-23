import { Detail_Processus } from './../Models/Detail-ProcessusModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ResponseModel } from '../Models/ResponseModel';
import { ResponseCode } from '../Enums/ResponseCode';
import { ProcessSteps } from '../Models/ProcessSteps';

export interface detail {
  action : string ;
  step : number ;
  etat : string ;
  commentaire : string ;
  user : string ;
  processusId : string ;
}


@Injectable({
  providedIn: 'root'
})
export class DetailWorkflowService {

  readonly url = 'https://localhost:7268/api/DetailProcess';

  constructor(public router: Router , private httpClient: HttpClient) { }

  public addDetailProcess(form : Detail_Processus[] , processId : any) {
    console.log("param : "+form + "id : "+processId);
    let body : detail[] = [];
    let vari : detail ;
    form.forEach(element => {
     vari = {
       action : element.Action ,
       step : element.Step ,
       etat : element.Etat ,
       commentaire : element.Commentaire ,
       user : element.User.id ,
       processusId : processId ,
     }
     body.push(vari);
    });
    console.log("body : "+body);
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.post<ResponseModel>(this.url + '/AddDetailProcess',body, { headers: headers }).pipe(
      map((res)=> {
        console.log(res.responseMessage);
      }
      ) 
    );
    
  }

  public getDetailsByProcess( id : string) {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.get<ResponseModel>(this.url + `/GetDetailProcess/${id}`, { headers: headers })
      .pipe(
        map((res) => {
          let detailsList = new Array<ProcessSteps>();
          console.log(res);
          if (res.responseCode == ResponseCode.OK) {
            if (res.dateSet) {
              res.dateSet.map((x: any) => {
                console.log(x);
                detailsList.push( new ProcessSteps(x.step , x.action, x.username , x.userEmail));
              });
            }
          }else{
            console.log(res.responseMessage);
          }
          console.log(detailsList);
          return detailsList;
        })
      );
  }

}
