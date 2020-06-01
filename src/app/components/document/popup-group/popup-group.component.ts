import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupQuestion } from 'src/app/models/group-question';
import { Question } from 'src/app/models/question';
declare var $: any;

@Component({
  selector: 'app-popup-group',
  templateUrl: './popup-group.component.html',
  styleUrls: ['./popup-group.component.css']
})
export class PopupGroupComponent implements OnInit {

  imageName: string
  audioName: string
  isCorrectAnswer: boolean

  constructor(
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
    let total_question = $('.popup-question-content').length;

    groupQuestion.image = $('input[name="image"]').prop('files')[0];
    groupQuestion.audio = $('input[name="audio"]').prop('files')[0];
    groupQuestion.transcript = $('#transcript').val();

    for(let i = 1; i <= total_question; i++) {
      let question = new Question();

      question.correctAnswer = $(`#question_` +i+ ` input[name="correctAnswer_` +i+ `"]:checked`).val();
      question.answerA = $(`#question_` +i+ ` input[name="answerA"]`).val();
      question.answerB = $(`#question_` +i+ ` input[name="answerB"]`).val();
      question.answerC = $(`#question_` +i+ ` input[name="answerC"]`).val();
      question.answerD = $(`#question_` +i+ ` input[name="answerD"]`).val();

      groupQuestion.listQuestion.push(question);
    }
    // console.log(groupQuestion);
    this.dialogRef.close(groupQuestion);
  }

  selectNameImg (event) {
    this.imageName = event.target.files[0].name;
  }

  selectNameAudio(event) {
    this.audioName = event.target.files[0].name;
  }

  addQuestion() {
    $(document).ready(function(){
      let total_element = $('.popup-question-content').length;
      let lastid = $('.popup-question-content:last').attr("id");
      let split_id = lastid.split("_");
      let nextindex = Number(split_id[1]) + 1;
      let max = 5;

      if (total_element == max) {
        alert('Tối đa có ' + max + ' câu hỏi');
      }

      if(total_element < max){
        $(".popup-question-content:last").after(`<div id="question_`+ nextindex +`" class="popup-question-content"></div>`);
        $("#question_" + nextindex).append(`
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
                          <input type="radio" name="correctAnswer_`+ nextindex +`" checked value="A" style="transform: scale(1.5);">
                      </div>
                      <span class="input-group-addon" style="width: 40px;">A</span>
                      <input name="answerA" type="text" class="form-control">
                  </div>
                  <div class="input-group">
                      <div class="input-group-btn btn btn-primary">
                          <input type="radio" name="correctAnswer_`+ nextindex +`" value="B" style="transform: scale(1.5);">
                      </div>
                      <span class="input-group-addon" style="width: 40px;">B</span>
                      <input name="answerB" type="text" class="form-control">
                  </div>
                  <div class="input-group">
                      <div class="input-group-btn btn btn-primary">
                          <input type="radio" name="correctAnswer_`+ nextindex +`" value="C" style="transform: scale(1.5);">
                      </div>
                      <span class="input-group-addon" style="width: 40px;">C</span>
                      <input name="answerC" type="text" class="form-control">
                  </div>
                  <div class="input-group">
                      <div class="input-group-btn btn btn-primary">
                          <input type="radio" name="correctAnswer_`+ nextindex +`" value="D" style="transform: scale(1.5);">
                      </div>
                      <span class="input-group-addon" style="width: 40px;">D</span>
                      <input name="answerD" type="text" class="form-control">
                  </div>
                  <br>
              </div>
          </div>
        `)
      }
    });
  }

  removeQuestion() {
    $(document).on('click', '.icon-cancel-question', function() {
      let total_element = $('.popup-question-content').length;
      let id = $(this).parent().attr('id');
      let split_id = id.split("_");
      let deleteindex = split_id[1];

      if (total_element == 1) {
        alert('Tối thiểu có 1 câu hỏi')
      }

      if (total_element > 1) {
        $("#question_" + deleteindex).remove();
      }
    });
  }
}
