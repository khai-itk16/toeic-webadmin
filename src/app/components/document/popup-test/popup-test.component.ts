import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TestQuestion } from 'src/app/models/test-question';
import { TestQuestionService } from 'src/app/services/test-question.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { containAllBlankCharacter } from 'src/app/common/custom-validator-account';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-popup-test',
  templateUrl: './popup-test.component.html',
  styleUrls: ['./popup-test.component.css']
})
export class PopupTestComponent implements OnInit {

  testForm: FormGroup

  constructor(private testQuestionService: TestQuestionService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PopupTestComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}
    
  ngOnInit(): void {
    console.log(this.data)
    this.testForm = this.formBuilder.group({
      name: [this.data.test.name, [Validators.required,  Validators.maxLength(100), containAllBlankCharacter]],
    });
  }

  get testFormControl() { return this.testForm.controls; }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitTestQuestion() {
    let testQuestion = new TestQuestion()
    testQuestion.name = this.testForm.get("name").value
    console.log(this.data)
    testQuestion.partId = this.data.test.partId

    console.log(testQuestion)

    // Create test
    if(this.data.action == 'add') {
      this.testQuestionService.createTest(testQuestion).subscribe(
        res => {
          console.log(res)
          Swal.fire({
            icon: 'success',
            title: 'Test has been created',
            showConfirmButton: false,
            timer: 1500
          })
          this.dialogRef.close(1);
        },
        error => {
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Error create test',
            text: 'Something wrong!'
          })
      })
    }
    

    // Update test
    if(this.data.action == 'edit') {
      testQuestion.testId = this.data.test.testId
      console.log(testQuestion)
      this.testQuestionService.updateTest(testQuestion).subscribe(
        res => {
          console.log(res)
          Swal.fire({
            icon: 'success',
            title: 'Test has been updated',
            showConfirmButton: false,
            timer: 1500
          })
          this.dialogRef.close(1);
        },
        error => {
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Error update test',
            text: 'Something wrong!'
        })
      })
    }
    
  }
}
