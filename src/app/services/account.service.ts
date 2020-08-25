import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configure } from '../configure';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private config = new Configure()
  
  constructor(private http: HttpClient) { }

  createAccount(account) {
    return this.http.post<any>(this.config.urlRegister, account);
  }

  getAccounts() {
    return this.http.get<any>(this.config.urlAcount);
  }

  getAccountById(id) {
    return this.http.get<any>(this.config.urlAcount + "/" + id);
  }

  updateAccount(account) {
    return this.http.put<any>(this.config.urlAcount, account);
  }

  deleteAccount(id) {
    return this.http.delete<any>(this.config.urlAcount  + "/" + id)
  }

  changeLockAccount(id) {
    return this.http.put<any>(this.config.urlAcount  + "/" + id + "/status", {})
  }
}
