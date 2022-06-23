import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ResponseCode } from '../Enums/ResponseCode';
import { ResponseModel } from '../Models/ResponseModel';
import { Types } from '../Models/TypesModal';

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  readonly url = 'https://localhost:7268/api/Types';
  constructor(private httpClient: HttpClient) { }

  public addType(form : any) {
    const body = {
      Nom : form.Nom,
      ProcessId : form.ProcessId,
    };
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient.post<ResponseModel>(this.url + '/AddType',body , { headers: headers }).pipe(
      map((res)=> {
        console.log(res.responseMessage);
      })
    );
  }

  public getAllTypes() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    return this.httpClient
      .get<ResponseModel>(this.url + '/GetAllTypes', { headers: headers })
      .pipe(
        map((res) => {
          let typesList = new Array<Types>();
          if (res.responseCode == ResponseCode.OK) {
            if (res.dateSet) {
              console.log("types : "+res.dateSet);
              res.dateSet.map((x:any) => {
                typesList.push(new Types(x.id , x.nom ));
              });
            }
          }
          return typesList;
        })
      );
  }
}
