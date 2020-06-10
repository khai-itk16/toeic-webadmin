import { Component, OnInit } from '@angular/core';
import { PartQuestionService } from 'src/app/services/part-question.service';

@Component({
  selector: 'app-document-management',
  templateUrl: './document-management.component.html',
  styleUrls: ['./document-management.component.css']
})
export class DocumentManagementComponent implements OnInit {

  parts: any

  constructor(private partQuestionService: PartQuestionService) { }

  ngOnInit(): void {
    this.partQuestionService.getAllPart().subscribe(
      res => {
        this.parts = res.data
        console.log(res)
      },
      error => {
        console.log(error)
      })
  }

}
