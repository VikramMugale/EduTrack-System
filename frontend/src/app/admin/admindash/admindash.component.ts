import { Component, OnInit } from '@angular/core';
import { GetinfoService } from '../getinfo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})
export class AdmindashComponent implements OnInit {
  data:any;
  showEdit = false;
  constructor(public obj:GetinfoService,public router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.obj.students().subscribe((res)=>{
      this.data=res;
      console.log(this.data);
    })
  }

onEdit(id:any) {
    this.showEdit = true;
    this.router.navigate(['adashboard/edit']);
    localStorage.setItem('stuid',id);
    
}

closeEdit() {
    this.showEdit = false;
    localStorage.removeItem('stuid');
    window.location.reload();
    this.router.navigate(['adashboard']);
}
  
  
  onDelete(id:any){
     return this.obj.delete(id).subscribe((res)=>{
      window.location.reload();
     })
  }

}
