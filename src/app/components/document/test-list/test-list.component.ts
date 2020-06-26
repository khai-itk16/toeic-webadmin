import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupTestComponent } from '../popup-test/popup-test.component';
import { TestQuestionService } from 'src/app/services/test-question.service';
import { TestQuestion } from 'src/app/models/test-question';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {

  testsAPI: Array<TestQuestion>
  partId: number

  constructor(public dialog: MatDialog,
    private testQuestionService: TestQuestionService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.partId = Number(this.activatedRoute.snapshot.paramMap.get('partId'))
    this.testQuestionService.getAllTest(this.partId).subscribe(
      res => {
        console.log(res)
        this.testsAPI = res.list
      }
    )
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
      width: '650px', height: '250px',
      data: test
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data != null) {
        this.ngOnInit()
      }
    });
  }

  createTestQuestion(partId) {
    this.openDialog({action:"add", title:"Thêm test", test: { name: '', partId: this.partId }})
  }

  updateTestQuestion(testId) {
    let test = this.testsAPI.find(i => i.testId == testId);
    this.openDialog({action:"edit", title:"Chỉnh sửa test" , test })
  }

  delteTestQuestion(testId) {
    Swal.fire({
      title: 'Are you sure delete test',
      // text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.testQuestionService.deleteTestById(testId).subscribe(
          res => {
            this.ngOnInit()
            Swal.fire(
              'Deleted!',
              'Test has been deleted.',
              'success'
            )
        }, error => {
          console.log(error)
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Test is safe',
          'error'
        )
      }
    })
  }
}
