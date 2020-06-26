import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configure } from '../configure';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  configure = new Configure()
  urlGetProfile = this.configure.urlGetProfile;
  urlUpdateProfile = this.configure.urlUpdateProfile;
  urlProfileChangePass = this.configure.urlProfileChangePass;

  constructor(private http: HttpClient) { }

  getProfile() {
    return this.http.get<any>(this.urlGetProfile)
  }

  updateProfile(profileUpdate) {
    return this.http.put<any>(this.urlUpdateProfile, profileUpdate)
  }

  changeProfilePass (newPassword) {
    return this.http.put<any>(this.urlProfileChangePass, newPassword)
  }
}
