import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectingEditDetailComponent } from './collecting-edit-detail.component';

describe('CollectingEditComponent', () => {
  let component: CollectingEditDetailComponent;
  let fixture: ComponentFixture<CollectingEditDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectingEditDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectingEditDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
