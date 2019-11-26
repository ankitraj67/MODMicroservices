import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {
  adminloginData={}
  constructor(private _auth: AuthService, private route: Router) { }
  ngOnInit() {
  }
  adminlogin(){
      this._auth.adminlogin(this.adminloginData)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token',res.token);
        this.route.navigate(['/admin-dashboard'])
     },
      err => {}
      
    );

    
  }
}
