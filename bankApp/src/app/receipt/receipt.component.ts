import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receipt',
  template: `
    <a (click)="printReceipt()" class="text-white mt-7 mb-2">Generate Receipt</a>
  `,
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent{
  printReceipt() {
    window.print();
  }

}
