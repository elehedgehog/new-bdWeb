import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectingDetailDialogComponent } from './collecting-detail-dialog.component';

describe('CollectingDetailDialogComponent', () => {
  let component: CollectingDetailDialogComponent;
  let fixture: ComponentFixture<CollectingDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectingDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectingDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
