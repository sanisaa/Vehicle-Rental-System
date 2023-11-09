import { Component, OnInit } from '@angular/core';
import { Order } from '../models/models';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{

  listOfOrders: Order[] = []; //for backend
  columns: string[] = ['id', 'name', 'orderedOn', 'returned', 'vehicleId', 'vehicleName']

  constructor(private api: ApiService){}

  ngOnInit(): void {
    let userid = this.api.getTokenUserInfo()?.id ?? 0;
    this.api.getUsersOrder(userid).subscribe({
      next: (res: Order[]) => {
        console.log("Data Ordered", res);
        this.listOfOrders = res;
      },
      error: (err: any) => console.log(err),
    });
  }
}
