import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


//global http header object
const options={                    // to overload header
  headers:new HttpHeaders(),
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) {
    // this.getDetails();
   }
   
//saveDetails() - To store data into local storage

saveDetails(){
  if(this.userDetails){
    localStorage.setItem('DataBase',JSON.stringify(this.userDetails))
  }
  if(this.currentUser){
    localStorage.setItem('currentUser',JSON.stringify(this.currentUser))
  }
  if(this.currentAcno){
    localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno))
  }
}

// getDetails(){
//   if(this.userDetails){
//     this.userDetails=JSON.parse(localStorage.getItem('DataBase')|| '')
//   }
//   if (this.currentAcno) {
//     this.currentAcno=JSON.parse(localStorage.getItem('currentAcno')|| '')
    
//   }
//   if (this.currentUser) {
//     this.currentUser=JSON.parse(localStorage.getItem('currentUser')|| '')
    
//   }
// }

  //database
  userDetails:any={
    1000:{acno:1000,username:'enjoyal', pswd:'abcd', balance:1000,transaction:[]},
    1001:{acno:1001,username:'enjoyal',pswd:'1234', balance:1000,transaction:[]},
    1002:{acno:1002,username:'enjoyal',pswd:'ABCD', balance:1000,transaction:[]},
    1003:{acno:1003, username:'enjoyal',pswd:'1111', balance:1000,transaction:[]} 
  }

  register(acno:any, username:any, pswd:any){

    const data={
      acno,
      pswd,
      username,
    }

    return this.http.post('http://localhost:3000/register', data)
    // let userDetails=this.userDetails;
    
    // if(acno in userDetails){
    //   return false;
    // }
    // else{
    //   userDetails[acno]={
    //     acno: acno,
    //     uname:username,
    //     pswd:password,
    //     balance:0,
    //     transaction: []
    //   }
    //   console.log(userDetails);
    //   this.saveDetails();
    //   return true;
      
    // }

  }

  currentUser="";
//to hold current acno
  currentAcno='';


  login(acno:any, pswd:any){
    // alert('Login clicked')
    const data={
      acno,
      pswd,
    }
    return this.http.post('http://localhost:3000/login', data)

    
  //   var userDetails=this.userDetails;
  //   if(acno in userDetails){
  //     if(pswd==userDetails[acno]['pswd']){
  //       this.currentUser=userDetails[acno].username;
  //       this.currentAcno=acno;

  //       this.saveDetails();
  //      return true;
  //     }
  //     else{
  //       return false;     
  //      }
  //   }
  //   else{
  //     return false;
  //   }
  }

//  types='';
// amount='';

getToken(){
  // fetch token from localstorage
  const token =JSON.parse(localStorage.getItem('token') || '')
  //append token inside the header
  let headers = new HttpHeaders()

  if(token){
    options.headers=headers.append('x-access-token',token)
  }
  return options  //to get token
}

  deposit(acno:any, pswd:any,amount:any,transTime:any){
    const data={
      acno,
      pswd,
      amount,
      transTime,
    }
    return this.http.post('http://localhost:3000/deposit', data, this.getToken())

    // let userDetails =this.userDetails;
    // amount=parseInt(amount);
    // if(acno in userDetails){
    //   if(pswd== userDetails[acno].pswd){
    //     userDetails[acno].balance+=amount;
    //     //pushing elements to transaction array
    //     userDetails[acno]['transaction'].push({
    //       type:'Credit', Amount:amount
    //     })
    //     console.log(userDetails);
    //     this.saveDetails();
    //     //
    //     // this.types=userDetails[acno]['transaction'].type;
    //     // this.amount=userDetails[acno]['transaction'].Amount;
    //     // console.log(this.types);
    //     // console.log(this.amount);

        
    //     return userDetails[acno].balance;
    //   }
    //   else{
    //     alert('Password Incorrect');
    //     return false;
    //   }
    // }
    // else{
    //   alert('Invalid userDetails')
    //   return false;
    // }
  }

  
  withdraw(acno:any, pswd:any,amount:any,transTime:any){
    const data={
      acno,
      pswd,
      amount,
      transTime
    }
    return this.http.post('http://localhost:3000/withdraw', data, this.getToken())

    // let userDetails =this.userDetails;
    // amount1=parseInt(amount1);
    // if(acno1 in userDetails){
    //   if(pswd1== userDetails[acno1].pswd){
    //     if(amount1<userDetails[acno1].balance){
    //     userDetails[acno1].balance-=amount1;

    //      //pushing elements to transaction array
    //      userDetails[acno1]['transaction'].push({
    //       type:'Debit', Amount:amount1
    //     })
    //     //
    //     // this.types=userDetails[acno1]['transaction'].type;
    //     // this.amount=userDetails[acno1]['transaction'].Amount;
    //     this.saveDetails();
    //     return userDetails[acno1].balance;
    //   }
    //   else{
    //     alert('Insufficient balance');
    //     return false;
    //   }
    // }
    // else{
    //   alert('Invalid password')
    //   return false;
    // }
    // }
    // else{
    //   alert('Invalid userDetails')
    //   return false;
    // }
  }



// 
getTransaction(acno:any){
  const data={
    acno
  }
  return this.http.post('http://localhost:3000/getTransaction', data, this.getToken())
}

//get balance
getBalance(acno:any){
  const data={
    acno
  }
  return this.http.post('http://localhost:3000/Balance', data, this.getToken())
}

deleteAcc(acno:any){
  return this.http.delete('http://localhost:3000/deleteAcc/'+acno)

  }

  // getBalance(acno: any): Observable<any> {
  // return this.http.get(`http://localhost:3000/transaction/${acno}`, this.getToken());
  //  }

  transferMoney(acno: any,reciacno: any, amount: any, pswd: any): Observable<any> {
    amount = parseInt(amount);
    const data = {
      acno,
      reciacno,
      amount,
      pswd
    };
    return this.http.post("http://localhost:3000/transfer", data, this.getToken());
  }
  // getBalance(balance: string): Observable<number> {
  //   return this.http.get<number>(`http://localhost:3000/transaction/${balance}`);
  // }


}
