import { Document } from './../Models/DocModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ResponseCode } from '../Enums/ResponseCode';
import { ResponseModel } from '../Models/ResponseModel';
import { State } from '../Enums/State';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  readonly url = 'https://localhost:7268/api/Document';
  document : Document;
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
      DateUpdate: Date.now ,
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
      }
      ) 
    );
    
  }

  public getAllDocs() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient
      .get<ResponseModel>(this.url + '/GetAllDoc', { headers: headers })
      .pipe(
        map((res) => {
          let documentList = new Array<Document>();
          if (res.responseCode == ResponseCode.OK) {
            if (res.dateSet) {
              console.log(res.dateSet);
              res.dateSet.map((x: any) => {
               switch (x.currentState) {
                  case 0:
                    x.currentState = 'Awaiting'
                    break;
                  case 1:
                    x.currentState = 'In Progress'
                    break;
                  case 3:
                    x.currentState = 'Validated'
                    break;
                  case 4:
                    x.currentState = 'Rejected'
                    break;
                }
                documentList.push(
                  new Document( x.id , x.url , x.reference , x.titre , x.nbPage , x.motCle , x.version , x.date ,x.dateUpdate,x.currentState,x.currentNumberState, x.user , x.types)
                );
              });
            }
          }
          return documentList;
        })
      );
  }


  
}
