import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {

  transferForm: FormGroup;
  acno:any;
  reciacno: any;
  amount: any;
  pswd: any;
  balance:any;
  transferResult: any;
  transferError: any;

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.transferForm = this.fb.group({
      acno: ['', Validators.required],
      reciacno: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      pswd: ['', Validators.required]
    });
  }

  transfer() {
    this.acno = this.transferForm.value.curacno;
    this.reciacno = this.transferForm.value.reciacno;
    this.amount = this.transferForm.value.amount;
    this.pswd = this.transferForm.value.pswd;
    this.balance=this.transferForm.value.balance;

    this.dataService.transferMoney(this.acno, this.reciacno, this.amount, this.pswd).subscribe(
      result => {
        this.transferForm=result.transferForm.transferForm
       this.balance=result.transferForm.balance;
       console.log(result,'result#');
       console.log(this.balance);
       console.log(this.transferForm);
      },
      result=>{
        alert(result.error.message)
      }
    );
  }

}
