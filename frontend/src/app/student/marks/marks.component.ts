import { Component, OnInit } from '@angular/core';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.css']
})
export class MarksComponent implements OnInit {

  marks:any={};
  total:any;
  percentage:any;
  constructor(public obj:InfoService) { }

  ngOnInit(): void {
     let id=localStorage.getItem('id');
     this.obj.getMarks(id).subscribe((res:any)=>{
       this.marks=res[0];
       this.total=this.marks.math+this.marks.english+this.marks.history+this.marks.geography+this.marks.science;
       this.percentage=(this.total/500)*100;
       console.log(this.marks);
     })
  }
  


}
