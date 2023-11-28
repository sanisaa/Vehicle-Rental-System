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


  
  ViewInvoice(orderId: number) {
    this.orderId = orderId;

    this.router.navigate(['/invoice', this.orderId]);
  }
  
  
  
  
}


