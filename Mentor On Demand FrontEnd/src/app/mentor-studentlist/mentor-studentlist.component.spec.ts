import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorStudentlistComponent } from './mentor-studentlist.component';

describe('MentorStudentlistComponent', () => {
  let component: MentorStudentlistComponent;
  let fixture: ComponentFixture<MentorStudentlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorStudentlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorStudentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
