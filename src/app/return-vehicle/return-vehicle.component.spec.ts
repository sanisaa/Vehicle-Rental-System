import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnVehicleComponent } from './return-vehicle.component';

describe('ReturnVehicleComponent', () => {
  let component: ReturnVehicleComponent;
  let fixture: ComponentFixture<ReturnVehicleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReturnVehicleComponent]
    });
    fixture = TestBed.createComponent(ReturnVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
