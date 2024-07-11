import { HttpClient } from '@angular/common/http';
import { CSP_NONCE, Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  //load all categories
  public Categories(){
    return this.http.get(baseUrl+"/category/");
  }

  //add category
  public addCategory(category: any){
   return this.http.post(baseUrl+"/category/",category);
   
  }
}
