import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { GetinfoService } from '../getinfo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  formData:FormGroup;
  data:any;
  constructor(public formbuilder:FormBuilder,public obj:GetinfoService,public router:Router) {
    this.formData = this.formbuilder.group({
      math: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      english: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      science: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      history: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      geography: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
   }

  ngOnInit(): void {
  }
  onSubmit() {
    if (this.formData.valid) {
      this.data = this.formData.value;
      let id = localStorage.getItem('stuid');
      this.obj.edit(this.data, id).subscribe((res) => {
        if (res.message === 'Marks updated successfully') {
          this.router.navigate(['adashboard']);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

}
