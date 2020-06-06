import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupGroupComponent } from '../popup-group/popup-group.component';
import { GroupQuestionService } from 'src/app/services/group-question.service';
import { GroupQuestion } from 'src/app/models/group-question';

declare var $: any;

@Component({
  selector: 'app-group-question',
  templateUrl: './group-question.component.html',
  styleUrls: ['./group-question.component.css']
})
export class GroupQuestionComponent implements OnInit, AfterViewInit {

  groupQuestion: GroupQuestion

  constructor(public dialog: MatDialog, private groupQuestionService: GroupQuestionService) { }

  ngOnInit(): void {
    
  }
  ngAfterViewInit() {
    $(function () {
      $('audio').audioPlayer();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupGroupComponent, {
      width: '100vw', height: '100vh',
    });

    dialogRef.afterClosed().subscribe(groupQuestion => {
      this.groupQuestion = groupQuestion
      console.log(groupQuestion);
    });
  }

  createGroupQuestion() {
    this.openDialog()
    // this.groupQuestionService.createGroupQuestion(this.groupQuestion).subscribe(
    //   res => {
    //     console.log(res)
    //   },
    //   error => {
    //     console.log(error)
    //   }
    // )
  }

  updateGroupQuestion() {
    this.openDialog()
    // this.groupQuestionService.updateGroupQuestion(this.groupQuestion).subscribe(
    //   res => {
    //     console.log(res)
    //   },
    //   error => {
    //     console.log(error)
    //   }
    // )
  }
}
