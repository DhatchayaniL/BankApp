import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  acno='';
  uname='';
  pswd='';

  //register model
  registerForm=this.fb.group({
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]], //array
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]]
  })


  constructor(private ds:DataService, private router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  aim="Your perfect banking partner";

  register(){
    // alert('Clicked register')
    console.log(this.registerForm); //value:
    
    var username=this.registerForm.value.uname;
    var password=this.registerForm.value.pswd;
    var acno=this.registerForm.value.acno;

  if(this.registerForm.valid){
    // console.log(this.registerForm.get('uname')?.errors);
    // const result= this.ds.register(acno,username,password);
    this.ds.register(acno,username,password)
    .subscribe((result:any)=>{
      alert('Register successful');
      this.router.navigateByUrl('');
    },
    result=>{
      alert(result.error.message)
    })
    // else{
    //   alert('register failed');
    //   this.router.navigateByUrl('')

    // }
  }
  
  else{
    alert('Invalid form');
  }

  }

}
