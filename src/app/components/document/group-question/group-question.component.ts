import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-group-question',
  templateUrl: './group-question.component.html',
  styleUrls: ['./group-question.component.css']
})
export class GroupQuestionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(function () {
      $('audio').audioPlayer();
    });
  }
}
