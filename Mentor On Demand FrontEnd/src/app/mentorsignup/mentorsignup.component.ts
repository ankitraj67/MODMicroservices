import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
@Component({
  selector: 'app-mentorsignup',
  templateUrl: './mentorsignup.component.html',
  styleUrls: ['./mentorsignup.component.scss']
})
export class MentorsignupComponent implements OnInit {
  mentorsignupData = {"Role":2}
  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }
  mentorsignup(){
    this._auth.mentorsignup(this.mentorsignupData)
    .subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token',res.token)
     },
      err => console.log(err)
    )
   }
 }