import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "https://localhost:44359/api/account/register";
  private _loginUrl = "https://localhost:44359/api/account/login";
  private _courseurl="https://localhost:44359/api/admin";
  private _updateCourseUrl=("https://localhost:44359/api/admin/");
  private _deleteCourseUrl="http://localhost:3000/api/deleteCourse";
  private _updatMentoreUrl="http://localhost:3000/api/editmentor";
  private _mentoreDataUrl="https://localhost:44359/api/admin/mentorname";
  private _getcount= "https://localhost:44359/api/account/";
  private _specialEventsUrl = "https://localhost:44372/api/enrolledcourse/ListOfCourse/";
  private _updateEnrolledCourseUrl = "https://localhost:44372/api/enrolledcourse/ChangeEnrolledCourseStatus/";
  private _specialEventsUrlAddCourse = "https://localhost:44372/api/enrolledcourse";

   course2;
   mentor1;

  constructor(private http: HttpClient,
    private _router: Router) { }

  studentsignup(user){
    return this.http.post<any>(this._registerUrl,user);
  }
  mentorsignup(mentor){
    return this.http.post<any>(this._registerUrl,mentor);
  }
 studentlogin(user){
    return this.http.post<any>(this._loginUrl,user);
 }
 mentorlogin(mentor){
  return this.http.post<any>(this._loginUrl,mentor);
}
loggedIn(){
  return !!localStorage.getItem('token');
}

logoutUser(){
  localStorage.removeItem('token');
  this._router.navigate(['/home']);
  
}
getToken(){
  return localStorage.getItem('token');
}

getUserName() {
  return localStorage.getItem('username');
}
adminlogin(admin){
  return this.http.post<any>(this._loginUrl,admin,);
}
course(data){
  console.log(data);
  return this.http.post<any>(this._courseurl,data);
}

getmentorData(){
  return this.http.get<any>(this._mentoreDataUrl);
}
editCourses(course) {
  console.log(course);
  return this.http.put<any>(this._updateCourseUrl+ course.id, course)
}
editMentors(mentor){
console.log(mentor);
return this.http.put<any>(this._updatMentoreUrl, mentor);
}
deleteCourse(course){
  return this.http.post<any>(this._deleteCourseUrl, course);
}
public blockById(id) {
  return this.http
    .get("https://localhost:44359/api/admin/blockunblock/" + id);
    // .pipe(map(data1 => (data1 = JSON.parse(JSON.stringify(data1)))));
}

public unBlockById(id) {
  return this.http
  .get("https://localhost:44359/api/admin/blockunblock/" + id);
  // .pipe(map(data1 => (data1 = JSON.parse(JSON.stringify(data1)))));
}
getcountlist(){
  return this.http.get<any>(this._getcount);
}
getSpecialEvents(StudentEmail) {
  return this.http.get<any>(this._specialEventsUrl+StudentEmail)
}
updateEnrolledCourse(updateCourseId,updateCourseUserName,course) {
  return this.http.put<any>(this._updateEnrolledCourseUrl+updateCourseId+'/'+updateCourseUserName,course)
}
loggedInUserName() {
  return localStorage.getItem('userEmail')   
}
enrollCourse(user) {
  return this.http.post<any>(this._specialEventsUrlAddCourse, user)

}
}

