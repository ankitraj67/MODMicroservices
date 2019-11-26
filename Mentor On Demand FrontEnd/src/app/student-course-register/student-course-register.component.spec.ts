import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseRegisterComponent } from './student-course-register.component';

describe('StudentCourseRegisterComponent', () => {
  let component: StudentCourseRegisterComponent;
  let fixture: ComponentFixture<StudentCourseRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCourseRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCourseRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
