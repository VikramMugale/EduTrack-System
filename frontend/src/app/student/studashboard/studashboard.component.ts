import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InfoService } from '../info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studashboard',
  templateUrl: './studashboard.component.html',
  styleUrls: ['./studashboard.component.css']
})
export class StudashboardComponent implements OnInit {  

  student:any={};
  showMarks = false;
  editprofile=false;
  constructor(public obj: InfoService, public formBuilder: FormBuilder, public router: Router) { }

  ngOnInit(): void {
    let id=localStorage.getItem('id');
    this.obj.getStu(id).subscribe((res:any)=>{
        this.student=res[0];
        console.log(this.student);
    });

  }

  edit(): void {
    if (localStorage.length !== 0) {
      this.editprofile=true
      this.router.navigate(['dashboard/edit']);
    } else {
      this.router.navigate(['']);
    }
  }
  closeedit() {
    this.editprofile = false;
    window.location.reload();
    this.router.navigate(['dashboard']);
  }

  marks(): void {
    if (localStorage.length !== 0) {
      this.showMarks = true;
      this.router.navigate(['dashboard/marks']);
    } else {
      this.router.navigate(['']);
    }
  }
  closeMarks() {
    this.showMarks = false;
    this.router.navigate(['dashboard']);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }
}