import { TestBed, inject } from '@angular/core/testing';

import { TaskMonitorService } from './task-monitor.service';

describe('TaskMonitorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskMonitorService]
    });
  });

  it('should be created', inject([TaskMonitorService], (service: TaskMonitorService) => {
    expect(service).toBeTruthy();
  }));
});
