import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configure } from '../configure';

@Injectable({
  providedIn: 'root'
})
export class GroupQuestionService {

  private configure = new Configure()

  urlGetListGroupQuestion = this.configure.urlGetListGroupQuestion
  urlCreateGroupQuestion = this.configure.urlCreateGroupQuestion
  urlUpdateGroupQuestionById =  this.configure.urlUpdateGroupQuestionById
  urlDeleteGroupQuestionById =  this.configure.urlDeleteGroupQuestionById

  constructor(private http: HttpClient) { }

  createGroupQuestion(groupQuestion) {
    const formData = new FormData()
    
    if(groupQuestion.checkDeleteImage){
      groupQuestion.imagePath = 'undefined'
    }

    if(groupQuestion.checkDeleteAudio){
      groupQuestion.audioPath = 'undefined'
    }

    formData.append('imagePath', groupQuestion.imagePath)
    formData.append('audioPath', groupQuestion.audioPath)
    formData.append('text', groupQuestion.text)
    formData.append('testId', groupQuestion.testId)
    formData.append('questions', JSON.stringify(groupQuestion.questions))
    
    return this.http.post<any>(this.urlCreateGroupQuestion, formData, {
      headers: {
        enctype: 'multipart/form-data'
      }
    });
  }

  updateGroupQuestion(groupQuestion) {
    const formData = new FormData()

    formData.append('checkDeleteAudio', groupQuestion.checkDeleteAudio)
    formData.append('checkDeleteImage', groupQuestion.checkDeleteImage)

    formData.append('imagePath', groupQuestion.imagePath)
    formData.append('oldImagePath', groupQuestion.oldImagePath)

    formData.append('audioPath', groupQuestion.audioPath)
    formData.append('oldAudioPath', groupQuestion.oldAudioPath)

    formData.append('text', groupQuestion.text)
    formData.append('testId', groupQuestion.testId)
    formData.append('groupQuestionId', groupQuestion.groupQuestionId)
    formData.append('questions', JSON.stringify(groupQuestion.questions))
    
    return this.http.put<any>(this.urlUpdateGroupQuestionById + groupQuestion.groupQuestionId, formData, {
      headers: {
        enctype: 'multipart/form-data'
      }
    });
  }

  deleteGroupQuestion(groupQuestionId) {
    return this.http.delete<any>(this.urlDeleteGroupQuestionById + groupQuestionId);
  }

  getAllGroupQuestion(testId) {
    return this.http.get<any>(this.urlGetListGroupQuestion, { params: { testId }});
  }
}
