import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { GetinfoService } from '../getinfo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  formData:FormGroup;
  data:any;

  constructor(public formbuilder:FormBuilder,public obj:GetinfoService,public router:Router) {
    this.formData = this.formbuilder.group({
      passkey: ['', Validators.required] // Add required validation
    });
   }

  ngOnInit(): void {
    
  }
  onSubmit(): void {
    if (this.formData.valid) {
      const passkeyValue = this.formData.value.passkey;

      if (passkeyValue === "passkey") {
        localStorage.setItem('id', passkeyValue);
        this.router.navigate(['/adashboard']);
      } else {
        alert("Incorrect passkey");
      }
    } else {
      alert("Please enter a valid passkey.");
    }
  }
}
