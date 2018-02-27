import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerManageComponent } from './server-manage.component';

describe('ServerManageComponent', () => {
  let component: ServerManageComponent;
  let fixture: ComponentFixture<ServerManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
