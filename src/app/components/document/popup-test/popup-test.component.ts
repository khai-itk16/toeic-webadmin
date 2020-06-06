import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TestQuestion } from 'src/app/models/test-question';

@Component({
  selector: 'app-popup-test',
  templateUrl: './popup-test.component.html',
  styleUrls: ['./popup-test.component.css']
})
export class PopupTestComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PopupTestComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}
    
  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitTestQuestion() {
    let testQuestion: TestQuestion;
    
    // this.dialogRef.close(testQuestion);
  }
}
