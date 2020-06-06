import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupQuestionService {

  urlGetListGroupQuestion = ""
  urlCreateGroupQuestion = ""
  urlUpdateGroupQuestion = ""
  urlDeleteGroupQuestion = ""
  urlGroupQuestion = ""

  constructor(private http: HttpClient) { }

  createGroupQuestion(groupQuestion) {
    return this.http.post<any>(this.urlCreateGroupQuestion, groupQuestion);
  }

  updateGroupQuestion(groupQuestion) {
    return this.http.put<any>(this.urlUpdateGroupQuestion, groupQuestion);
  }
}
