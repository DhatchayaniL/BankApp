import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

acno:any;
transaction:any;
balance:any;
currentTime:any;

  constructor(private ds:DataService) {}



  ngOnInit(): void {

//get transaction
     this.acno=JSON.parse(localStorage.getItem('currentAcno') || '');
     this.ds.getTransaction(this.acno)
     .subscribe((result:any)=>{
      
       this.transaction=result.transaction.transaction
       this.balance=result.transaction.balance       ;
       console.log(result,'result#');
       console.log(this.balance);
       console.log(this.transaction);
       
     },
     result=>{
       alert(result.error.message)
     })


//to get balance
  // this.ds.getBalance(this.acno).subscribe(
  //   (result:any)=>{
  //   this.balance=result
  //   console.log(this.balance);
    
  // },
  // result=>{
  //   alert(result.error.message)
  // })
  
   


  }





}
