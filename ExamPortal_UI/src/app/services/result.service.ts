import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private _http:HttpClient) { }

  public saveResult(result:any){
    console.log("saving result..")
    console.log(result);
    return this._http.post(baseUrl+'/result',result);
  }

}
