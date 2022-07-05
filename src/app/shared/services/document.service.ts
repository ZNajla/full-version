import { Documents } from './../Models/DocModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ResponseCode } from '../Enums/ResponseCode';
import { ResponseModel } from '../Models/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  readonly url = 'https://localhost:7268/api/Document';
  readonly url2 = 'https://localhost:7268/api/DocumentState';

  document : Documents;
  constructor(public router: Router , private httpClient: HttpClient) { }

  public addDoc(form : any) {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const body = {
      file: form.file,
      Reference: form.Reference,
      Titre: form.Titre,
      NbPage: form.NbPage,
      MotCle: form.MotCle,
      Version: form.Version, 
      CurrentState: form.CurrentState ,
      UserId : userInfo.id ,
      TypesId : form.TypesId,
    };
    console.log(body);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.post<ResponseModel>(this.url + '/AddDoc',body, { headers: headers }).pipe(
      map((res)=> {
        console.log(res.dateSet);
        return res ;
      }));
  }

  public getAllDocs() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.get<ResponseModel>(this.url + '/GetAllDoc', { headers: headers })
      .pipe(map((res) => {
          let documentList = new Array<Documents>();
          if (res.responseCode == ResponseCode.OK) {
            if (res.dateSet) {
              res.dateSet.map((x: any) => {
               switch (x.currentState) {
                  case 0:
                    x.currentState = 'Awaiting'
                    break;
                  case 1:
                    x.currentState = 'In Progress'
                    break;
                  case 2:
                    x.currentState = 'Draft'
                    break;
                  case 3:
                    x.currentState = 'Validated'
                    break;
                  case 4:
                    x.currentState = 'Rejected'
                    break;
                }
                documentList.push(
                  new Documents( x.id , x.url , x.reference , x.titre , x.nbPage , x.motCle , x.version , x.date ,x.dateUpdate,x.currentState,x.currentNumberState, x.user , x.types)
                );
              });
            }
          }
          return documentList;
        })
      );
  }

  addDocState(id : string){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.post<ResponseModel>(this.url2 + `/AddDocStatue/${id}`, { headers: headers }).pipe(
      map((res) => {
        console.log(res.responseMessage);
        return res;
      }));
  }

  getDocByIdUser(){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.get<ResponseModel>(this.url +`/GetDocByUserId/${userInfo.id}`, { headers: headers })
      .pipe(map((res) => {
          let documentList = new Array<Documents>();
          if (res.responseCode == ResponseCode.OK) {
            if (res.dateSet) {
              res.dateSet.map((x: any) => {
               switch (x.currentState) {
                  case 0:
                    x.currentState = 'Awaiting'
                    break;
                  case 1:
                    x.currentState = 'In Progress'
                    break;
                  case 2:
                    x.currentState = 'Draft'
                    break;
                  case 3:
                    x.currentState = 'Validated'
                    break;
                  case 4:
                    x.currentState = 'Rejected'
                    break;
                }
                documentList.push(
                  new Documents( x.id , x.url , x.reference , x.titre , x.nbPage , x.motCle , x.version , x.date ,x.dateUpdate,x.currentState,x.currentNumberState, x.user , x.types)
                );
              });
            }
          }
          return documentList;
        })
      );
  }

  public deleteDocument(id : string){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.delete<ResponseModel>(this.url + `/DeleteDoc/${id}`,{ headers : headers});
  }

  public getDocById(id : string){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.get<ResponseModel>(this.url +`/GetDocByUserId/${userInfo.id}`, { headers: headers })
      .pipe(map((res) => {
          let doc : Documents;
          if (res.responseCode == ResponseCode.OK) {
            if (res.dateSet) {
              switch (res.dateSet.currentState) {
                  case 0:
                    res.dateSet.currentState = 'Awaiting'
                    break;
                  case 1:
                    res.dateSet.currentState = 'In Progress'
                    break;
                  case 2:
                    res.dateSet.currentState = 'Draft'
                    break;
                  case 3:
                    res.dateSet.currentState = 'Validated'
                    break;
                  case 4:
                    res.dateSet.currentState = 'Rejected'
                    break;
              }
              doc = new Documents( res.dateSet.id , res.dateSet.url , res.dateSet.reference , res.dateSet.titre , res.dateSet.nbPage , res.dateSet.motCle , res.dateSet.version , res.dateSet.date ,res.dateSet.dateUpdate,res.dateSet.currentState,res.dateSet.currentNumberState, res.dateSet.user , res.dateSet.types)
            }
          }
          return doc;
      }));
  }
}