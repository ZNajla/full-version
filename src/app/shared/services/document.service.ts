import { Document } from './../Models/DocModel';
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
  document : Document;
  constructor(public router: Router , private httpClient: HttpClient) { }

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
              res.dateSet.map((x: Document) => {
                documentList.push(
                  new Document( x.id , x.Url , x.Reference , x.Titre , x.NbPage , x.MotCle , x.Version , x.Date , x.user , x.type)
                );
              });
            }
          }
          return documentList;
        })
      );
  }
}
