import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ResponseCode } from '../Enums/ResponseCode';
import { ResponseModel } from '../Models/ResponseModel';
import { Workflow } from '../Models/WorkflowModel';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  readonly url = 'https://localhost:7268/api/Processus';
  
  constructor(public router: Router , private httpClient: HttpClient) { }

  public addProcess(form : any) {

    const body = {
      nomProcessus: form.workflowname,
      description: form.description,
    };

    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.post<ResponseModel>(this.url + '/AddProcessus',body, { headers: headers }).pipe(
      map((res)=> {
        return res.dateSet ;
      }
      ) 
    );
    
  }

  public getAllWorkFlows() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient
      .get<ResponseModel>(this.url + '/GetAllProcessus', { headers: headers })
      .pipe(
        map((res) => {
          let workflowList = new Array<Workflow>();
          if (res.responseCode == ResponseCode.OK) {
            if (res.dateSet) {
              // res.dateSet.map((x: Workflow) => {
              //   workflowList.push(
              //     new Workflow(x.id,x.nomProcessus,x.description)
              //   );
              // });
              return res.dateSet ;
            }
          }
        })
      );
  }

  public getWorkFlowsById(id : string) {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.get<ResponseModel>(this.url + `/GetProcessById/${id}`, { headers: headers }).pipe(map((res) => {
          console.log("resultat : "+res);
          if (res.responseCode == 1) {
            let workflow : Workflow;
              console.log(res.dateSet);
              workflow = new Workflow(res.dateSet.id , res.dateSet.nomProcessus , res.dateSet.description);
              return workflow ;
          }
        })
      );
  }

  // public deleteProcess(id : string){
  //   let userInfo = JSON.parse(localStorage.getItem('userInfo'));
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${userInfo?.token}`,
  //   });
  //   return this.httpClient.delete<ResponseModel>(this.url + `/DeleteProcessus/${id}`,{ headers : headers});
  // }
}
