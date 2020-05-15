import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = "http://localhost:3000/api/register";
  private loginUrl = "http://localhost:3000/api/login";

  constructor(private http: HttpClient,
    private router: Router) { }

  public loginUser(user) { 
    return this.http.post<any>(this.loginUrl, user)
  }

  public loggedIn() {
    return !!localStorage.getItem("token")
  }

  public getToken() {
    return localStorage.getItem('token')
  }

  logoutUser() {
    localStorage.removeItem('token')
  }

}
