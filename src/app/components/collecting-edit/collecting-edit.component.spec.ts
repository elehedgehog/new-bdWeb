import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectingEditComponent } from './collecting-edit.component';

describe('CollectingEditComponent', () => {
  let component: CollectingEditComponent;
  let fixture: ComponentFixture<CollectingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectingEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
