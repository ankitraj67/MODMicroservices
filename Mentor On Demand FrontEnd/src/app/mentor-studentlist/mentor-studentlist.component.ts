import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-mentor-studentlist',
  templateUrl: './mentor-studentlist.component.html',
  styleUrls: ['./mentor-studentlist.component.scss']
})
export class MentorStudentlistComponent implements OnInit {

  constructor(private http:HttpClient,private route: Router,public auth:AuthService) { }
  get_studentlist=function() {
    this.http
      .get("https://localhost:44359/api/admin/student")
      .subscribe((res:any[])=>{
        this.studentlist=res;
        console.log(this.studentlist)
        console.log(res);
      })    
  }

  ngOnInit() {
    this.get_studentlist();
  }

}
