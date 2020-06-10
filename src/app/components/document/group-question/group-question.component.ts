import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupGroupComponent } from '../popup-group/popup-group.component';
import { GroupQuestionService } from 'src/app/services/group-question.service';
import { GroupQuestion } from 'src/app/models/group-question';
import { ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-group-question',
  templateUrl: './group-question.component.html',
  styleUrls: ['./group-question.component.css']
})
export class GroupQuestionComponent implements OnInit, AfterViewInit {

  groupQuestion: GroupQuestion
  testId: number

  constructor(public dialog: MatDialog,
    private groupQuestionService: GroupQuestionService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.testId = Number(this.activatedRoute.snapshot.paramMap.get('testId'));
  }
  ngAfterViewInit() {
    $(function () {
      $('audio').audioPlayer();
    });
  }

  createGroupQuestion() {
    const dialogRef = this.dialog.open(PopupGroupComponent, {
      width: '100vw', height: '100vh',
      data: this.testId
    });

    // dialogRef.afterClosed().subscribe(groupQuestion => {
    //   this.groupQuestion = groupQuestion
    //   console.log(groupQuestion);
    //   this.groupQuestionService.createGroupQuestion(this.groupQuestion).subscribe(
    //     res => {
    //       console.log(res)
    //     },
    //     error => {
    //       console.log(error)
    //     })
    // });
  }

  updateGroupQuestion() {
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
