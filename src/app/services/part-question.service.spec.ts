import { TestBed } from '@angular/core/testing';

import { PartQuestionService } from './part-question.service';

describe('PartQuestionService', () => {
  let service: PartQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
