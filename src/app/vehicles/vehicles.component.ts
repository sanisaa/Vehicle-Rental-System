import { Component, OnInit } from '@angular/core';
import { CategoryVehicles, Vehicle } from '../models/models';
import { ApiService } from '../services/api.service';
import { NgZone } from '@angular/core';

@Component({
  selector: 'vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  availableVehicles: Vehicle[] = [];    //access bacend data
  vehiclesToDisplay: CategoryVehicles[] = []; //to display frontend
  displayedColumns: string[] = [
    'id',
    'name',
    'brand',
    'price',
    'available',
    'order',
  ];

  constructor(private api: ApiService, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.api.getAllVehicles().subscribe({
     next:  (res: Vehicle[]) => {
        this.availableVehicles = [];
        console.log(res);
        for (var vehicle of res) this.availableVehicles.push(vehicle);
        this.updateList();
      },
      error: (err: any) => console.log(err),
    });
  }

  updateList() {
    this.vehiclesToDisplay = [];
    for (let vehicle of this.availableVehicles) {
      let exist = false;
      //checking if category and subcategory is inside vehiclesToDisplay(Frontend). 
      //If present then true otherwise false;
      //Because if the category is already present then we don't neet to create new category. We can simply add the vehicles to the available catgory.
      for (let categoryVehicles of this.vehiclesToDisplay) {
        if (
          vehicle.category === categoryVehicles.category &&
          vehicle.subCategory === categoryVehicles.subCategory
        )
          exist = true;
      }


      //if the category is already present then loop the fronend element and find the category
      //push the vehicles in that category
      if (exist) {
        for (let categoryVehicles of this.vehiclesToDisplay) {
          if (
            vehicle.category === categoryVehicles.category &&
            vehicle.subCategory === categoryVehicles.subCategory
          )
            categoryVehicles.vehicles.push(vehicle);
        }
      } 
      //if not exist then create a new object for the category and sub-category and add books to them
      else {
        this.vehiclesToDisplay.push({
          category: vehicle.category,
          subCategory: vehicle.subCategory,
          vehicles: [vehicle],
        });
      }
    }
  }
  

  //reduce method accumulates the data in pv add it's length to it in loop. 
  getVehicleCount() {
    return this.vehiclesToDisplay.reduce((pv, cv) => cv.vehicles.length + pv, 0);
  }

  search(value: string) {
    value = value.toLowerCase();
    this.updateList();
    if (value.length > 0) {
      this.vehiclesToDisplay = this.vehiclesToDisplay.filter((categoryVehicles) => {
        categoryVehicles.vehicles = categoryVehicles.vehicles.filter(
          (vehicle) =>
            vehicle.name.toLowerCase().includes(value) ||
            vehicle.brand.toLowerCase().includes(value)
        );
        return categoryVehicles.vehicles.length > 0;
      });
    }
  }

 orderVehicle(vehicle: Vehicle) {
  let userid = this.api.getTokenUserInfo()?.id ?? 0;
  this.api.orderVehicle(userid, vehicle.id).subscribe({
    next: (res: any) => {
      if (res.success) {
        // Find the index of the ordered vehicle in availableVehicles
        const index = this.availableVehicles.findIndex(v => v.id === vehicle.id);
        if (index !== -1) {
          this.availableVehicles[index].available = false;     // Update the available property
          this.updateList();       // Update the vehiclesToDisplay
          this.ngZone.run(() => {});  // Run change detection explicitly
        }
      }
    },
    error: (err: any) => console.log(err),
  });
}


  isBlocked() {
    let blocked = this.api.getTokenUserInfo()?.blocked ?? true;
    return blocked;
  }
}
