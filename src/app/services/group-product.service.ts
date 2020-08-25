import { Injectable } from '@angular/core';
import { Configure } from '../configure';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupProductService {

  constructor(private http: HttpClient) { }

  private config = new Configure();

  public getAllGroupProducts() {
    return this.http.get<any>(this.config.urlGroupProduct);
  }

  public addGroupProduct(name) {
    let groupProduct = { groupProductId: 0, groupName: name }
    console.log(this.config.urlGroupProduct)
    return this.http.post<any>(this.config.urlGroupProduct, groupProduct);
  
  }
  public updateGroupProduct(groupProduct) {
    console.log(this.config.urlGroupProduct)
    return this.http.post<any>(this.config.urlGroupProduct, groupProduct);
  }

  public delteGroupProduct(groupProductId) {
    return this.http.delete<any>(this.config.urlGroupProduct + '/' + groupProductId);
  }
}
