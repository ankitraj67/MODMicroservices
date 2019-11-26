import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mentorlogin',
  templateUrl: './mentorlogin.component.html',
  styleUrls: ['./mentorlogin.component.scss']
})
export class MentorloginComponent implements OnInit {


  mentorloginData={}
  constructor(private _auth: AuthService,private route:Router) { }

  ngOnInit() {
  }
  mentorlogin(){
    this._auth.mentorlogin(this.mentorloginData)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token',res.token);
        this.route.navigate(['/mentordashboard']);
     },
     err => {
      console.log(err);
       alert(err.error.message);
    });
      
      
    
    

    
  }
}
