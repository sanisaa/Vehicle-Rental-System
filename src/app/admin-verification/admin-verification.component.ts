import { ChangeDetectorRef, Component } from '@angular/core';
import { Order, User } from '../models/models';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-admin-verification',
  templateUrl: './admin-verification.component.html',
  styleUrls: ['./admin-verification.component.scss']
})
export class AdminVerificationComponent {
  
   //You need two arrays if you are filtering. Here we are filtering pending, all and returned so two arrays
   listOfOrders: Order[]= [];
   ordersToDisplay: Order[] = [];
   responseMsg: string = '';
   columns: string[] = ['id','orderId','userId', 'name', 'vehicleId', 'vehicleName', 'orderedOn', 'returned', 'status', 'action']
   constructor(private api: ApiService){}
  
   ngOnInit(): void {
    this.api.verifyOrder().subscribe(
      (res : Order[])=>{
          console.log(res);
          this.listOfOrders = res;
          this.ordersToDisplay = this.listOfOrders;
      }
    );
  }
  filter(value: string){
    if(value === 'pen'){
      this.ordersToDisplay = this.listOfOrders.filter((order)=> order.status == 0);
    }else if(value == 'acc'){
      this.ordersToDisplay = this.listOfOrders.filter(
        (order)=> order.status == 1
      );
    }else{
      this.ordersToDisplay = this.listOfOrders.filter(
        (order)=> order.status === 2
      );
    }
  }
  acceptOrder(order: Order) {
    console.log('Order accepted:', order);
    
    this.api.acceptOrder(order).subscribe(
      (res: any)=>{
        res = JSON.parse(res);
        console.log(res.success)
        if(res.success){
          order.status = 1;
          this.responseMsg= 'Order Accepted';
          console.log('OrderAccepted');
     
          
        }else{
          console.error("Order Acceptance Failed");
        }
        setInterval(() => (this.responseMsg = ''), 5000);
        
      }
     );
    }
  rejectOrder(order: Order){
    console.log('Order rejected:', order);
    this.api.rejectOrder(order).subscribe(
      (res: any)=>{
        res = JSON.parse(res);
        if(res.success){
          order.status = 2;
          this.responseMsg = "Order Rejected";
         // window.location.reload();
        }else{
          console.error("Order Rejection Failed");
        }
        setInterval(()=> this.responseMsg = '', 5000);
      }
    )
  }


}
