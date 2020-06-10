import { Injectable } from '@angular/core';
import { Configure } from '../configure';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartQuestionService {
  private configure = new Configure()
  private urlListPart = this.configure.urlListPart;
  constructor(private http: HttpClient) { }

  getAllPart() {
    return this.http.get<any>(this.urlListPart)
  }
}
