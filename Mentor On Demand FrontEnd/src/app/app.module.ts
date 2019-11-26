import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatchValueDirective } from './directives/match-value.directive';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { StudentsignupComponent } from './studentsignup/studentsignup.component';
import { MentorsignupComponent } from './mentorsignup/mentorsignup.component';
import { MentorloginComponent } from './mentorlogin/mentorlogin.component';
import { StudentloginComponent } from './studentlogin/studentlogin.component';
import { ContactusComponent } from './contactus/contactus.component';
import { CoursesComponent } from './courses/courses.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthService } from './auth.service';
import { TokenInterceptorService} from './token-interceptor.service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MentorlistComponent } from './mentorlist/mentorlist.component';
import { StudentlistComponent } from './studentlist/studentlist.component';
import { AddcourseComponent } from './addcourse/addcourse.component';
import { CourselistComponent } from './courselist/courselist.component';
import { EditcourseComponent } from './editcourse/editcourse.component';
import { EditmentorComponent } from './editmentor/editmentor.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { PaymentComponent } from './payment/payment.component';
import { MentordashboardComponent } from './mentordashboard/mentordashboard.component';
import { EditstudentComponent } from './editstudent/editstudent.component';
import { ListComponent } from './list/list.component';
import { StudentCourseRegisterComponent } from './student-course-register/student-course-register.component';
import { MentorStudentlistComponent } from './mentor-studentlist/mentor-studentlist.component';
import { SpecialeventComponent } from './specialevent/specialevent.component';
import { EnrolledcourseComponent } from './enrolledcourse/enrolledcourse.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    StudentsignupComponent,
    MatchValueDirective,
    MentorsignupComponent,
    MentorloginComponent,
    StudentloginComponent,
    ContactusComponent,
    CoursesComponent,
    AdminloginComponent,
    AboutusComponent,
    AdminDashboardComponent,
    MentorlistComponent,
    StudentlistComponent,
    AddcourseComponent,
    CourselistComponent,
    EditcourseComponent,
    EditmentorComponent,
    StudentDashboardComponent,
    PaymentComponent,
    MentordashboardComponent,
    EditstudentComponent,
    ListComponent,
    StudentCourseRegisterComponent,
    MentorStudentlistComponent,
    SpecialeventComponent,
    EnrolledcourseComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        Ng2SearchPipeModule
  ],
  providers: [AuthService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
