import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupGroupComponent } from '../popup-group/popup-group.component';

declare var $: any;

@Component({
  selector: 'app-group-question',
  templateUrl: './group-question.component.html',
  styleUrls: ['./group-question.component.css']
})
export class GroupQuestionComponent implements OnInit, AfterViewInit {

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    
  }
  ngAfterViewInit() {
    $(function () {
      $('audio').audioPlayer();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupGroupComponent, {
      width: '80vw', height: '80vh',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
      console.log(result);
    });
  }
}
