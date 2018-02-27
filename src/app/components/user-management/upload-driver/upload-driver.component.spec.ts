import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDriverComponent } from './upload-driver.component';

describe('UploadDriverComponent', () => {
  let component: UploadDriverComponent;
  let fixture: ComponentFixture<UploadDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
