using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MentorOnDemand.Dto;
using MentorOnDemand.Models;

namespace MentorOnDemand.Data
{
    public interface IRepository
    {
        bool AddCourse(CourseDto courseDto);
        IEnumerable<CourseListDto> GetCourses();
        IEnumerable<UserDto> GetStudents();
        IEnumerable<UserDto> GetMentors();
        IEnumerable<MentorNameDto> GetMentorsName();
        bool UpdateCourses(CourseDto course);
        bool BlockUser(string id);
        //bool DeleteCourses(Course course);
        IEnumerable<EnrollCourse> GetEnrolledCourses();
        bool AddEnrolledCourses(EnrollCourse enrolledCourse);
        List<EnrollCourse> GetEnrolledCoursesByStudent(string modelEmail);
        List<EnrollCourse> GetEnrolledCoursesByMentor(string modelEmail);
        bool ChangeCourseStatus(EnrollCourse enrolledCourse, string UserEmail);


    }
}
