import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formData:FormGroup;
  data:any;

  constructor(public formbuilder:FormBuilder,public router:Router,public obj:InfoService) { }

  ngOnInit(): void {
    this.formData = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit(){
     this.data=this.formData.value;
     return this.obj.login(this.data).subscribe((res)=>{
      if(res.message=="login success"){
        localStorage.setItem('id',(res.user.id));
        this.router.navigate(['/dashboard']);
      }
      else {
       alert('Login failed. Please check your credentials.');
      }
    }, (error) => {
      console.error('Error occurred during login:', error);
    })
  }

}
