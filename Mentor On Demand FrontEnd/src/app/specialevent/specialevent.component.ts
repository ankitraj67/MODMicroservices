import { Component, OnInit } from '@angular/core';
//import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-specialevent',
  templateUrl: './specialevent.component.html',
  styleUrls: ['./specialevent.component.scss']
})
export class SpecialeventComponent implements OnInit {

  specialEvents = []

  constructor(private _authService: AuthService,
              private _router: Router) { }


  ngOnInit() {
    //console.log('********************ht'+this._authService.loggedInUserName()),
      this._authService.getSpecialEvents(this._authService.loggedInUserName())
      .subscribe(
        res => this.specialEvents = res,
        err => {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
    }

    updateEnrolledCourse(updateCourseId,updateCourseUserName,course)
  {

    if(course.status == "Request Accepted")
    {
      var r =confirm("Are you sure want to pay for the Course?");
    if(r == true){
      this._authService.updateEnrolledCourse(updateCourseId,updateCourseUserName,course)
      .subscribe(
        res => {
          this._router.navigate(['/events'])
        } ,
        
        err => {  }
      )
    }
    else{
      alert("You rejected to pay for the course");
    }
    }
    if(course.status == "Completed")
    {
      alert("Mentor has completed the course for you.\nYou have Successfully completed the course")
    }
    if(course.status == "In Progress")
    {
      alert("Mentor didn't complete the course.")
    }
    if(course.status == "Requested")
    {
      alert("Mentor didn't accept your request till now.")
    }
  
  }

}
