import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupQuestionComponent } from './group-question.component';

describe('GroupQuestionComponent', () => {
  let component: GroupQuestionComponent;
  let fixture: ComponentFixture<GroupQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
