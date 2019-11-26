import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private http:HttpClient,private route: Router,public _auth:AuthService) { }
counts={};
  getcount(){
    this._auth.getcountlist().subscribe(
      res=>{
        console.log(res);
        this.counts=res;
        console.log(this.counts);
      },
      err=>{
        console.log(err);
      }
    )
  }
  ngOnInit() {
    this.getcount();
  }

}
