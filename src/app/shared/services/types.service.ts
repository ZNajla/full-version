import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  readonly url = 'https://localhost:7268/api/Types';
  constructor() { }
}
