import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingCollectionComponent } from './processing-collection.component';

describe('TaskMonitorComponent', () => {
  let component:  ProcessingCollectionComponent;
  let fixture: ComponentFixture< ProcessingCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  ProcessingCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent( ProcessingCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});