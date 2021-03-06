import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configure } from '../configure';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private configure = new Configure()
  private urlCreateAccount = this.configure.urlCreateAccount
  private urlListAccount = this.configure.urlListAccount
  private urlUpdateAccount = this.configure.urlUpdateAccount
  private urlGetAccountById = this.configure.urlGetAccountById
  private urlDeleteAccountById = this.configure.urlDeleteAccountById
  private urlChangeLockAccountById = this.configure.urlChangeLockAccountById

  constructor(private http: HttpClient) { }

  createAccount(account) {
    return this.http.post<any>(this.urlCreateAccount, account);
  }

  getAccounts() {
    console.log(this.urlListAccount)
    return this.http.get<any>(this.urlListAccount);
  }

  getAccountById(id) {
    let urlGetAcc = this.urlGetAccountById + id
    console.log(urlGetAcc)
    return this.http.get<any>(urlGetAcc);
  }

  updateAccount(account) {
    let urlUpdate = this.urlUpdateAccount + account.id
    console.log(urlUpdate)
    return this.http.put<any>(urlUpdate, account);
  }

  deleteAccount(id) {
    let urlDelete = this.urlDeleteAccountById + id
    console.log(urlDelete)
    return this.http.delete<any>(urlDelete)
  }

  changeLockAccount(id) {
    let urlChangeLock = this.urlChangeLockAccountById + id
    console.log(urlChangeLock)
    return this.http.put<any>(urlChangeLock, {})
  }
}
