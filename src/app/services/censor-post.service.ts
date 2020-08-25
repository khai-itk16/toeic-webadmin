import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configure } from '../configure';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class CensorPostService {

  private config = new Configure();

  constructor(private http: HttpClient) { }

  public getAllCensorPosts(): any {
    return this.http.get<any>(this.config.urlSalePost, { params: { postStatusId: "1"} })
  }

  public censorPost(salePostId) {
    return this.http.put<any>(this.config.urlSalePost + "/" + salePostId, {}, { params: { postStatusId: "2" }})
  }

  public deletePost(salePostId) {
    return this.http.delete<any>(this.config.urlSalePost + "/" + salePostId)
  }
}
