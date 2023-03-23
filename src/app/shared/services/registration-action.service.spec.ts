import { TestBed } from '@angular/core/testing';

import { RegistrationActionService } from './registration-action.service';

describe('RegistrationActionService', () => {
  let service: RegistrationActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});