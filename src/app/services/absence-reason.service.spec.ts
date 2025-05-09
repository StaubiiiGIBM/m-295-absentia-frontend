import { TestBed } from '@angular/core/testing';

import { AbsenceReasonService } from './absence-reason.service';

describe('AbsenceReasonService', () => {
  let service: AbsenceReasonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbsenceReasonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
