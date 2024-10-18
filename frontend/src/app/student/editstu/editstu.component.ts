import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { InfoService } from '../info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editstu',
  templateUrl: './editstu.component.html',
  styleUrls: ['./editstu.component.css']
})
export class EditstuComponent implements OnInit {
  formData:FormGroup;
  data:any;
  constructor(public obj:InfoService,public router:Router,public formbuilder:FormBuilder) {
    this.formData = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(10)]]
    });
   }

  ngOnInit(): void {
  }
  onSubmit(): void {
    if (this.formData.valid) {
      const data = this.formData.value;
      const id = localStorage.getItem('id');
      this.obj.editDetails(data, id).subscribe(res => {
        if (res.message === 'Update success') {
          this.router.navigate(['dashboard']);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

}
