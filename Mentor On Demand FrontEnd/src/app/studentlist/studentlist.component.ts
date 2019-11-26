import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.scss']
})
export class StudentlistComponent implements OnInit {

  constructor(private http:HttpClient,private route: Router,public auth:AuthService) { }
  studentlist=[];
  get_studentlist=function() {
    this.http
      .get("https://localhost:44359/api/admin/student")
      .subscribe((res:any[])=>{
        this.studentlist=res;
        console.log(this.studentlist)
        console.log(res);
      })    
  }
  block(id) {
    this.auth.blockById(id).subscribe(data => {
      this.get_studentlist();
    });
  }
  unBlock(id) {
    this.auth.unBlockById(id).subscribe(data => {
      this.get_studentlist();
    });
  }
  ngOnInit() {
    this.get_studentlist()
  }

}
