import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAudictComponent } from './user-audict.component';

describe('UserAudictComponent', () => {
  let component: UserAudictComponent;
  let fixture: ComponentFixture<UserAudictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAudictComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAudictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
