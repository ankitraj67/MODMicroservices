import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-student-course-register',
  templateUrl: './student-course-register.component.html',
  styleUrls: ['./student-course-register.component.scss']
})
export class StudentCourseRegisterComponent implements OnInit {
  events = []
  errorServerMessageEvents: String = null;

  constructor(private http:HttpClient,private route: Router,public auth:AuthService) { }
  courselist=[]
  get_courselist=function() {
    this.http
      .get("https://localhost:44359/api/admin/course")
      .subscribe((res:any[])=>{
        this.courselist=res;
        console.log(this.courselist)
        console.log(res);
      })    
  }


  ngOnInit() {
    this.get_courselist();
  }
  enrollCourse (event, userId) {
    console.log('**********local'+userId);
    event.studentEmail= userId;
    event.status = "Requested"
    delete event.id;
    //console.log('**********'+event.Id);
    this.auth.enrollCourse(event)
    .subscribe(
      res => {
        //localStorage.setItem('EventToken', res.enrollEvents.keyCourse)
        this.route.navigate(['/specialevent'])
      } ,
      
      err => {
        console.log(err);
        this.errorServerMessageEvents = err.error.message;  }
    )

  }


}
