import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupGroupComponent } from '../popup-group/popup-group.component';
import { GroupQuestionService } from 'src/app/services/group-question.service';
import { ActivatedRoute } from '@angular/router';
import { Configure } from 'src/app/configure';

declare var $: any;

@Component({
  selector: 'app-group-question',
  templateUrl: './group-question.component.html',
  styleUrls: ['./group-question.component.css']
})
export class GroupQuestionComponent implements OnInit {

  host: string
  groupQuestionsAPI: Array<any>
  testId: number
  representAns = ['A) ', 'B) ', 'C) ', 'D) ']

  constructor(public dialog: MatDialog,
    private groupQuestionService: GroupQuestionService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    const configure = new Configure()
    this.host = configure.host

    this.testId = Number(this.activatedRoute.snapshot.paramMap.get('testId'));
    this.groupQuestionService.getAllGroupQuestion(this.testId).subscribe(
      res => {
        console.log(res)
        this.groupQuestionsAPI = res.data
        $(document).ready(function () {
          $('audio').audioPlayer();
        })
      },
      error => {
        console.log(error)
      }
    )
  }

  opendDialog(data) {
    const dialogRef = this.dialog.open(PopupGroupComponent, {
      width: '100vw', height: '100vh',
      data: data
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data != null) {
        this.ngOnInit()
      }
    });
  }

  createGroupQuestion() {
    this.opendDialog({action:'add', tile: 'Thêm nhóm câu hỏi', testId: this.testId})
  }

  updateGroupQuestion(indexItem) {
    let questionUpdate = this.groupQuestionsAPI[indexItem]
    this.opendDialog({action:'edit', tile: 'Chỉnh sửa nhóm câu hỏi', questionUpdate})
  }

  deleteGroupQuestion(groupQuestionId) {
    this.groupQuestionService.deleteGroupQuestion(groupQuestionId).subscribe(
      res => {
        console.log(res)
        this.ngOnInit()
      },
      error => {
        console.log(error)
      }
    )
  }
}