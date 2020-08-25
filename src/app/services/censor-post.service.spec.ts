import { TestBed } from '@angular/core/testing';

import { CensorPostService } from './censor-post.service';

describe('CensorPostService', () => {
  let service: CensorPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CensorPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
