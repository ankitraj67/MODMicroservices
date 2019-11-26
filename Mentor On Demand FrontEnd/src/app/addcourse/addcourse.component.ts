import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
 
@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.scss']
})
export class AddcourseComponent implements OnInit {
  courseData={};
  mentorData={};
  message='';

  constructor(private _auth:AuthService) { }

  ngOnInit() {
    this._auth.getmentorData().subscribe(
      res=>{
        console.log(res)
        this.mentorData=res;
      });    
  }

  course(){
    this._auth.course(this.courseData)
      .subscribe(
        res=>
        {
          console.log(res)
          
          this.courseData={}
          alert("Course added successfully")
        },
        err=>console.log(err)
      )
      console.log(this.courseData);
  }
}

