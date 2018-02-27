import { TestBed, inject } from '@angular/core/testing';

import { PowerManagementService } from './power-management.service';

describe('PowerManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PowerManagementService]
    });
  });

  it('should be created', inject([PowerManagementService], (service: PowerManagementService) => {
    expect(service).toBeTruthy();
  }));
});
