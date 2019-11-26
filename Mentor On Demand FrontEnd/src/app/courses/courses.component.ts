import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  constructor(private http:HttpClient,private _auth:AuthService,private route:Router) { }


  courselist=[];
  get_courselist=function() {
    this.http
      .get("https://localhost:44359/api/admin/course")
      .subscribe((res:any[])=>{
        this.courselist=res;
        console.log(this.courselist);
      })    
  }
  payment(){
    this.route.navigate(['/payment'])
  }  
  ngOnInit() {
    this.get_courselist()
  }

  
}
