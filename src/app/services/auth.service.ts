import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Configure } from '../configure';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private configure = new Configure()
  private UrlLogin = this.configure.urlLogin;

  constructor(private http: HttpClient,
    private router: Router) { }

  public loginUser(user) { 
    return this.http.post<any>(this.UrlLogin, user)
  }

  public loggedIn() {
    return !!localStorage.getItem("token")
  }

  public getToken() {
    return localStorage.getItem('token')
  }

  logoutUser() {
    localStorage.removeItem('token')
    this.router.navigate(["/"])
  }
}
