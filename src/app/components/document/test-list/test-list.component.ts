import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupTestComponent } from '../popup-test/popup-test.component';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  // filter
  filter
  key: string = 'testName'; //set default
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: number = 1;
  // end filter

  openDialog(test): void {
    const dialogRef = this.dialog.open(PopupTestComponent, {
      width: '650px', height: '200px',
      data: test
    });

    dialogRef.afterClosed().subscribe(testQuestion => {
      
      console.log(testQuestion);
    });
  }

  createTestQuestion() {
    this.openDialog({title: "Thêm test", testName: ''})
  }

  updateTestQuestion(id) {
    let test
    this.openDialog({title: "Update test", testName: 'asdfadf'})
  }
}
