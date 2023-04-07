import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
//deposit properties
  acno='';
  pswd='';
  amount='';

//withdraw properties
acno1='';
pswd1='';
amount1='';

//
user='';
sdate:any;

//deposit model
depositForm=this.fb.group({
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]],
  amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
})

//withdraw model
withdrawForm=this.fb.group({
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]],
  amount:['',[Validators.required,Validators.pattern('[0-9]*')]]

})
  constructor(private ds:DataService, private fb:FormBuilder, private router: Router) { 
  // this.user=this.ds.currentUser;
  if(localStorage.getItem('currentUser')){
  this.user=JSON.parse(localStorage.getItem('currentUser') || '');
  }
  this.sdate=new Date()

  }
  
  ngOnInit(): void {
    if (!localStorage.getItem('currentAcno')) {
      alert('Please Login First');
      this.router.navigateByUrl('');
    }
      console.log(this.user);
     
  }

  deposit(){
    var acno=this.depositForm.value.acno;  //1000
    var pswd=this.depositForm.value.pswd;
    var amount=this.depositForm.value.amount;
    if (this.depositForm.valid) {
      this.sdate=new Date();
      var transTime=this.sdate
    this.ds.deposit(acno, pswd, amount, transTime)          //to give the transaction time
    .subscribe((result:any)=>{
      alert(result.message);


    },
    result=>{
      alert(result.error.message);

    })

  //   if(result){
  //     alert(`${amount} is credited... Available balance is ${result}`);
  //   }
  //   else{
  //     alert('Transaction error');
  //   }
  // }else{
  //   alert('Invalid Form');
  // }
  }
}

  withdraw(){
    var acno=this.withdrawForm.value.acno;  //1000
    var pswd=this.withdrawForm.value.pswd;
    var amount=this.withdrawForm.value.amount;
    
    if (this.withdrawForm.valid) {
      this.sdate=new Date();
      var transTime=this.sdate
      this.ds.withdraw(acno,pswd,amount,transTime)
      .subscribe((result:any)=>{
        alert(result.message);
      },
      result=>{
        alert(result.error.message);
      })
  }
  }

  logout(){
    //remove username and acno
    localStorage.removeItem('currentAcno');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');

    this.router.navigateByUrl('');

  }
  
  delete(){
    // alert('Clicked')
    this.acno=JSON.parse(localStorage.getItem('currentAcno')|| '');
  }

  onCancel(){
    this.acno="";
  }

  onDelete(event:any){
    // alert (event);
    this.ds.deleteAcc(event)

    .subscribe((result:any)=>{
      alert(result.message)
      this.router.navigateByUrl('')
      this.logout();
    },
    result=>{
      alert(result.error.message)
    })
  }
}
