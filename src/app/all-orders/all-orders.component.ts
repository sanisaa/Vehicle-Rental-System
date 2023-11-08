import { Component, OnInit } from '@angular/core';
import { Order } from '../models/models';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit{
  //You need two arrays if you are filtering. Here we are filtering pending, all and returned so two arrays
  listOfOrders: Order[]= [];
  ordersToDisplay: Order[] = [];
  columns: string[] = ['id','userId', 'name', 'vehicleId', 'vehicleName', 'orderedOn', 'returned']
  constructor(private api: ApiService){}
  
  ngOnInit(): void {
    this.api.getAllOrder().subscribe(
      (res : Order[])=>{
          console.log(res);
          this.listOfOrders = res;
          this.ordersToDisplay = this.listOfOrders;
      }
    );
  }
  filter(value: string){
    if(value === 'all'){
      this.ordersToDisplay = this.listOfOrders.filter((value)=> value);
    }else if(value == 'pen'){
      this.ordersToDisplay = this.listOfOrders.filter(
        (value)=> value.returned == false
      );
    }else{
      this.ordersToDisplay = this.listOfOrders.filter(
        (value)=> value.returned
      );
    }
  }



}
