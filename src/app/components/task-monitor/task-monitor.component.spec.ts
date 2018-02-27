import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskMonitorComponent } from './task-monitor.component';

describe('TaskMonitorComponent', () => {
  let component: TaskMonitorComponent;
  let fixture: ComponentFixture<TaskMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
