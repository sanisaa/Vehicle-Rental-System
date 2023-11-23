import { Component, OnInit } from '@angular/core';
import { Order } from '../models/models';
import { ApiService } from '../services/api.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
import { Router } from '@angular/router';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{

  listOfOrders: Order[] = []; //for backend
  columns: string[] = ['id', 'name', 'orderedOn', 'returned', 'vehicleId', 'vehicleName','status', 'invoice']
  orderId : any;

  constructor(private api: ApiService, private router: Router){}

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



  // generatePDF(orderId: number) {
  //   this.orderId = orderId;
  //   console.log("order Id", this.orderId);
  
  //   this.api.getOrderById(orderId).subscribe(
  //     (res: Order[]) => {
  //       const order = res.length > 0 ? res[0] : null; // Check if the array is not empty
  
  //       if (order) {
  //         console.log("Data For Invoice", order);
  
  //         let docDefinition = {
  //           content: [
  //             { text: 'Invoice Details', style: 'header' },
  //             { text: `Order ID: ${order.orderId}`, style: 'subheader' },
  //             { text: `Customer Name: ${order.name}` },
  //             { text: `Ordered On: ${order.orderedOn}` },
  //             { text: `Price: ${order.price}` },
  //             // Add more properties as needed
  
  //         ],}
  //         pdfMake.createPdf(docDefinition).open();
  //       } else {
  //         console.error("No data found for the specified order ID");
  //       }
  //     },
  //     (error) => {
  //       console.error("Error fetching order details", error);
  //     }
  //   );
  // }
  
  ViewInvoice(orderId: number) {
    this.orderId = orderId;
    // Navigate to the 'invoice' route and pass the orderId as a parameter
    this.router.navigate(['/invoice', this.orderId]);
  }
  
  
  
  
}


