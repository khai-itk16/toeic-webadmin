import { Injectable } from '@angular/core';
import { Configure } from '../configure';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestQuestionService {
  private configure = new Configure()
  private urlListTest = this.configure.urlListTest
  private urlCreateTest = this.configure.urlCreateTest
  private urlUpdateTestById = this.configure.urlUpdateTestById
  private urlDeleteTestById = this.configure.urlDeleteTestById

  constructor(private http: HttpClient) { }

  getAllTest(partId) {
    return this.http.get<any>(this.urlListTest, { params: { partId }})
  }

  createTest(test) {
    return this.http.post<any>(this.urlCreateTest, test)
  }

  updateTest(test) {
    console.log(this.urlUpdateTestById + test.testId)
    return this.http.put<any>(this.urlUpdateTestById + test.testId, test)
  }
  
  deleteTestById(testId) {
    console.log(this.urlDeleteTestById + testId)
    return this.http.delete<any>(this.urlDeleteTestById + testId)
  }
 
}
