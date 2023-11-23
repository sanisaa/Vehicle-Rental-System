// invoice.component.ts
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Invoice } from '../models/models';
import * as pdfMake from 'pdfmake/build/pdfmake';
import html2canvas from 'html2canvas';
import { style } from '@angular/animations';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  listOfOrders: Invoice[] = []; // for backend
  columns: string[] = ['id', 'name', 'orderedOn', 'vehicleId', 'vehicleName', 'status', 'price','orderId', 'userId'];
  orderId: any;
  orderDetails: Invoice | null = null; // Initialize as null
  @ViewChild('invoiceContent') invoiceContent!: ElementRef;
  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Retrieve orderId from the route parameters
    this.route.params.subscribe((params) => {
      this.orderId = +params['orderId'];
      // Fetch order details using the orderId
      this.api.getOrderById(this.orderId).subscribe(
        (res: Invoice[]) => {
          // Assuming the response is an array, and you want the first order
          this.orderDetails = res.length > 0 ? res[0] : null;
          if (this.orderDetails && this.orderDetails.orderedOn) {
            this.orderDetails.orderedOn = new Date(this.orderDetails.orderedOn).toLocaleDateString();
          }
          
         
          console.log(res);
        },
        (error) => {
          console.error('Error fetching order details', error);
        }
      );
    });
  }
  

  generatePDF() {
    const content = this.invoiceContent.nativeElement;
    const useWidth = content.offsetWidth;
    const useHeight = content.offsetHeight;
  
    html2canvas(content, {
      width: useWidth,
      height: useHeight,
      scale: 5,
    }).then((canvas: HTMLCanvasElement) => {
      const data = canvas.toDataURL();
  
      const imgWidth = 500; // A4 page width in mm
      const imgHeight = (useHeight / useWidth) * imgWidth;
      const invoiceNumber = Math.floor(Math.random() * 1000000) + 1;
      const currentDate = new Date().toLocaleDateString();

      const docDefinition: any = {
        header: { text: 'Vehicle Rental', 
        style: 'header', 
        fontSize: 18,  
        alignment: 'center',  
        color: '#047886',
        margin: [0, 15, 0, 20],
        padding: [0, 10, 0, 10],
      },
        footer: {
          columns: [
            { text: 'Copyright © 2023 SM. All Rights Reserved.', alignment: 'center', fontSize: 11 }
          ]
        },
        pageOrientation: 'portrait',
        content: [{ text: `Invoice Number: ${invoiceNumber}`, fontSize: 12, margin: [10, 10, 0, 0], alignment: 'right' },
          { text: `Date: ${currentDate}`, fontSize: 12, margin: [10, 5, 0, 10], alignment: 'right' },
          {
            image: data,
            width: imgWidth,
            height: imgHeight,
            margin: [10, 10, 10, 0], 
          },     { 
            ul: [
              'Please ensure to bring this invoice.',
              'Proceed to the respected department for payment.',
              'Your vehicle is one step away.',
            
            ],
            fontSize: 12,
            alignment: 'left',
            margin: [10, 25, 10, 0], 
            
          },
        ],
        styles: {
          header: {
            fontSize: 14,
            bold: true,
            alignment: 'center',
            margin: [0, 20, 0, 10],
          },
        },
      };
  
      pdfMake.createPdf(docDefinition).download('invoice.pdf');
    });
  }
  
  
  
  

}



