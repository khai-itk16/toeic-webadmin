import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configure } from '../configure';
import * as jwt_decode from "jwt-decode";



@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private config = new Configure()
  private tokenDecode: any;

  constructor(private http: HttpClient) { 
    this.tokenDecode = jwt_decode(localStorage.getItem("token"))
  }

  getProfile() {
    return this.http.get<any>(this.config.urlAcount + "/" + this.tokenDecode.id)
  }

  updateProfile(profileUpdate) {
    return this.http.put<any>(this.config.urlAcount, profileUpdate)
  }

  changeProfilePass (newPassword) {
    return this.http.put<any>("", newPassword)
  }
}
