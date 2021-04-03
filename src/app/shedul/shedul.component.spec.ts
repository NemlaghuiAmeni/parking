import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShedulComponent } from './shedul.component';

describe('ShedulComponent', () => {
  let component: ShedulComponent;
  let fixture: ComponentFixture<ShedulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShedulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShedulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
