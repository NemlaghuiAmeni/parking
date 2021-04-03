import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCComponent } from './reservation-c.component';

describe('ReservationCComponent', () => {
  let component: ReservationCComponent;
  let fixture: ComponentFixture<ReservationCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
