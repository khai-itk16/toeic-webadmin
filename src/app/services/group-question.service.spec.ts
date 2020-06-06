import { TestBed } from '@angular/core/testing';

import { GroupQuestionService } from './group-question.service';

describe('GroupQuestionService', () => {
  let service: GroupQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
