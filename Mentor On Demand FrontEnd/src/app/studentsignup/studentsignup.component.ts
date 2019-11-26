import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-studentsignup',
  templateUrl: './studentsignup.component.html',
  styleUrls: ['./studentsignup.component.scss']
})
export class StudentsignupComponent implements OnInit {
  studentsignupData={"Role":3}
  
  constructor(private _auth: AuthService, private route: Router) { }

  ngOnInit() {
  }
  studentsignup(){
    console.log(this.studentsignupData);
    
   this._auth.studentsignup(this.studentsignupData)
   .subscribe(
     res => {
        console.log(res)
        localStorage.setItem('token',res.token)
        alert("Registered Succesfully")
       
     },
     err => console.log(err)
   )
  
  }
  studentlogin(){
    this.route.navigate(['/studentlogin'])
  }
}
