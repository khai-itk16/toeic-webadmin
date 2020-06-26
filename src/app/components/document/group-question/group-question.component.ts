import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupGroupComponent } from '../popup-group/popup-group.component';
import { GroupQuestionService } from 'src/app/services/group-question.service';
import { ActivatedRoute } from '@angular/router';
import { Configure } from 'src/app/configure';
import Swal from 'sweetalert2'

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
        if(error.error.name == "GroupQuestionNotFound") {
          this.groupQuestionsAPI = null
        }
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
    Swal.fire({
      title: 'Are you sure delete group question',
      // text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.groupQuestionService.deleteGroupQuestion(groupQuestionId).subscribe(
          res => {
            this.ngOnInit()
            Swal.fire(
              'Deleted!',
              'Group question has been deleted.',
              'success'
            )
        }, error => {
          console.log(error)
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Group question is safe',
          'error'
        )
      }
    })
  }
}