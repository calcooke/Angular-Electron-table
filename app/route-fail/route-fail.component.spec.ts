import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteFailComponent } from './route-fail.component';

describe('RouteFailComponent', () => {
  let component: RouteFailComponent;
  let fixture: ComponentFixture<RouteFailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteFailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
