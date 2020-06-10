import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupQuestion } from 'src/app/models/group-question';
import { Question } from 'src/app/models/question';
import { Answer } from 'src/app/models/answer';
import { GroupQuestionService } from 'src/app/services/group-question.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-popup-group',
  templateUrl: './popup-group.component.html',
  styleUrls: ['./popup-group.component.css']
})
export class PopupGroupComponent implements OnInit {

  imageName: string
  audioName: string

  constructor(private groupQuestionService: GroupQuestionService,
    public dialogRef: MatDialogRef<PopupGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}
  
  ngOnInit(): void {
    this.removeQuestion()
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  submitGroupQuestion() {
    let groupQuestion = new GroupQuestion();
    let totalQuestion = $('.popup-question-content').length;

    groupQuestion.imagePath = $('input[name="image"]').prop('files')[0];
    groupQuestion.audioPath = $('input[name="audio"]').prop('files')[0];
    groupQuestion.text = $('#text').val();

    for(let i = 1; i <= totalQuestion; i++) {
      let question = new Question();
      let isExistRight = false 

      question.text = $(`#question_` +i+ ` input[name="question"]`).val();

      for(let j = 1; j <= 4; j++) {
        let answer = new Answer();

        answer.text = $(`#question_` +i+ ` input[name="answer_` +j+ `"]`).val();
        answer.isRight = $(`#isRight_` +i+ `_` +j).is(":checked")
        if(answer.isRight) {
          if(answer.text == '') {
            alert('Correct answer is required')
            return
          }
          isExistRight = true;
        }
       
        if(answer.isRight == false && answer.text == '') {
          continue;
        }

        question.answers.push(answer);
      }

      if(!isExistRight) {
        alert('please choose correct answer')
        return
      }

      question.explanation = $(`#explain_`+i).val();

      groupQuestion.questions.push(question)
      console.log('test id: ' + this.data)
      groupQuestion.testId = this.data;
    }

    this.groupQuestionService.createGroupQuestion(groupQuestion).subscribe(
      res => {
        console.log(res)
        Swal.fire({
          icon: 'success',
          title: 'Group question has been created',
          showConfirmButton: false,
          timer: 1500
        })
        this.dialogRef.close();
      },
      error => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Error create group question',
          text: 'Something wrong!'
        })
      })
  }

  selectNameImg (event) {
    this.imageName = event.target.files[0].name;
  }

  selectNameAudio(event) {
    this.audioName = event.target.files[0].name;
  }

  addQuestion() {
    $(document).ready(function(){
      let totalElement = $('.popup-question-content').length;
      let lastId = $('.popup-question-content:last').attr("id");
      let splitId = lastId.split("_");
      let nextIndex = Number(splitId[1]) + 1;
      let max = 5;

      if (totalElement == max) {
        alert('Tối đa có ' + max + ' câu hỏi');
      }

      if(totalElement < max){
        $(".popup-question-content:last").after(`<div id="question_`+ nextIndex +`" class="popup-question-content"></div>`);
        $("#question_" + nextIndex).append(`
          <span class="icon-cancel-question">
              <i class="fa fa-times-circle fa-2x" aria-hidden="true"></i>
          </span>

          <div class="form-group">
              <div class="question">
                  <div class="input-group">
                      <span class="input-group-addon">Question</span>
                      <input name="question" type="text" class="form-control">
                  </div>
              </div>
              <div class="answer">
                  <div class="input-group">
                      <div class="input-group-btn btn btn-primary">
                          <input id="isRight_`+ nextIndex +`_1" type="radio" name="correctAnswer_`+ nextIndex +`" value="A" style="transform: scale(1.5);">
                      </div>
                      <span class="input-group-addon" style="width: 40px;">A</span>
                      <input name="answer_1" type="text" class="form-control">
                  </div>
                  <div class="input-group">
                      <div class="input-group-btn btn btn-primary">
                          <input id="isRight_`+ nextIndex +`_2" type="radio" name="correctAnswer_`+ nextIndex +`" value="B" style="transform: scale(1.5);">
                      </div>
                      <span class="input-group-addon" style="width: 40px;">B</span>
                      <input name="answer_2" type="text" class="form-control">
                  </div>
                  <div class="input-group">
                      <div class="input-group-btn btn btn-primary">
                          <input id="isRight_`+ nextIndex +`_3" type="radio" name="correctAnswer_`+ nextIndex +`" value="C" style="transform: scale(1.5);">
                      </div>
                      <span class="input-group-addon" style="width: 40px;">C</span>
                      <input name="answer_3" type="text" class="form-control">
                  </div>
                  <div class="input-group">
                      <div class="input-group-btn btn btn-primary">
                          <input id="isRight_`+ nextIndex +`_4" type="radio" name="correctAnswer_`+ nextIndex +`" value="D" style="transform: scale(1.5);">
                      </div>
                      <span class="input-group-addon" style="width: 40px;">D</span>
                      <input name="answer_4" type="text" class="form-control">
                  </div>
                  <div class="form-group">
                    <label for="explain">Explain:</label>
                    <textarea id="explain_`+ nextIndex +`" name="explain_`+ nextIndex +`" class="form-control" rows="2"></textarea>
                </div>
              </div>
          </div>
        `)
      }
    });
  }

  removeQuestion() {
    $(document).on('click', '.icon-cancel-question', function() {
      let totalElement = $('.popup-question-content').length;
      let id = $(this).parent().attr('id');
      let splitId = id.split("_");
      let delIndex = splitId[1];

      if (totalElement == 1) {
        alert('Tối thiểu có 1 câu hỏi')
      }

      if (totalElement > 1) {
        $("#question_" + delIndex).remove();
      }
    });
  }
}
