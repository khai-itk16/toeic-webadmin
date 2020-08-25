import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configure } from '../configure';

@Injectable({
  providedIn: 'root'
})
export class TypeProductService {
  constructor(private http: HttpClient) { }

  private config = new Configure();

  public getAllTypeProducts(groupId) {
    return this.http.get<any>(this.config.urlTypeProduct, {params: {groupProductId: groupId}});
  }

  public addTypeProduct(typeProduct) {
    return this.http.post<any>(this.config.urlTypeProduct, typeProduct);
  
  }
  public updateTypeProduct(typeProduct) {
    return this.http.post<any>(this.config.urlTypeProduct, typeProduct);
  }

  public delteTypeProduct(typeProductId) {
    return this.http.delete<any>(this.config.urlTypeProduct + '/' + typeProductId);
  }
}
