import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArgDistributeComponent } from './arg-distribute.component';

describe('ArgDistributeComponent', () => {
  let component: ArgDistributeComponent;
  let fixture: ComponentFixture<ArgDistributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArgDistributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArgDistributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
