import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-editmentor',
  templateUrl: './editmentor.component.html',
  styleUrls: ['./editmentor.component.scss']
})
export class EditmentorComponent implements OnInit {
  mentorUpdateData:any={}
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
    this.mentorUpdateData = this._auth.mentor1;

  }
  editMentors(){
    console.log(this.mentorUpdateData)
    this._auth.editMentors(this.mentorUpdateData)
    .subscribe(
      res=>{
        this._router.navigate(['/mentorlist'])
      },
      err=>{
        console.log(err)
      }
    )
     }

  }

