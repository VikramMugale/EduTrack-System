import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { InfoService } from '../info.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public formData:FormGroup;
  data:any;



  constructor(public formbuilder:FormBuilder,public obj:InfoService,public router:Router) { 
    this.formData = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      classs: ['', [Validators.required, Validators.min(1)]], // Assuming class should be a positive number
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
       this.data=this.formData.value;
       return this.obj.register(this.data).subscribe((res)=>{
        if(res.message=="Student registered successfully"){
          alert("registered successfully");
           this.router.navigate(['']);
        }
        else {
          console.log('Registration failed');
        }
      }, (error) => {
        console.error('Error occurred during registration:', error);
       })
  }

}
