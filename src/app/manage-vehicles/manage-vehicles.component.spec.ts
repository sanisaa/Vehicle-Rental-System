import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVehiclesComponent } from './manage-vehicles.component';

describe('ManageVehiclesComponent', () => {
  let component: ManageVehiclesComponent;
  let fixture: ComponentFixture<ManageVehiclesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageVehiclesComponent]
    });
    fixture = TestBed.createComponent(ManageVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
