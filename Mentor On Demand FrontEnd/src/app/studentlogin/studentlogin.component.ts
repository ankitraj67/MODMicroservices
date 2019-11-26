import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-studentlogin',
  templateUrl: './studentlogin.component.html',
  styleUrls: ['./studentlogin.component.scss']
})
export class StudentloginComponent implements OnInit {

  studentloginData={};

  constructor(private _auth: AuthService, private route: Router) { }

  ngOnInit() {
  }
  studentlogin(){
    console.log(this.studentloginData);
    this._auth.studentlogin(this.studentloginData)
    .subscribe(
      res => {
        console.log('**** ' + JSON.stringify(res))
        //  localStorage.setItem('token',res.token);
        // localStorage.setItem('username', res.user.firstname);
         this.route.navigate(['/student-dashboard'])
     },
     err => {
      console.log(err);
       alert(err.error.message);

    
     });
    }
  
  studentsignup(){
    this.route.navigate(['/studentsignup'])
  }
}


