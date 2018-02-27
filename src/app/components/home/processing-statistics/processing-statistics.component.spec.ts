import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingStatisticsComponent } from './processing-statistics.component';

describe(' ProcessingStatisticsComponent', () => {
  let component:  ProcessingStatisticsComponent;
  let fixture: ComponentFixture< ProcessingStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  ProcessingStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent( ProcessingStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});