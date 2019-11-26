using MentorOnDemand.Dto;
using MentorOnDemand.Models;
using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MentorOnDemand.Data
{
    public class CourseRepository : IRepository
    {
        MentorContext context;
        public CourseRepository(MentorContext context)
        {
            this.context = context;
        }
        public bool AddCourse(CourseDto courseDto)
        {
            try
            {
                var course = new Course
                {
                    Name = courseDto.CourseName,
                    Fee = courseDto.CourseFee,
                    Timing = courseDto.CourseTiming,
                    Details = courseDto.CourseDetails,
                    User = context.MODUsers.SingleOrDefault(u => u.Id == courseDto.UserId)
                    

                };
                context.Courses.Add(course);
                int result = context.SaveChanges();
                if (result > 0)
                {
                    return true;
                }
                return false;
            }
            catch (Exception e)
            {

                throw;
            }
        }
        public IEnumerable<CourseListDto> GetCourses()
        {
            return this.context.Courses.Select(c => new CourseListDto
            {
                Id = c.Id,
                CourseName = c.Name,
                CourseFee = c.Fee,
                MentorName = c.User.Firstname,
                CourseDetails = c.Details,
                CourseTiming = c.Timing

            });
        }

        public IEnumerable<UserDto> GetStudents()
        {
            var stud = from a in context.MODUsers
                       join ma in context.UserRoles on a.Id equals ma.UserId
                       where ma.RoleId == "3"
                       select new UserDto
                       {
                           id = a.Id,
                           Active = a.Active,
                        Firstname = a.Firstname,
                        Email = a.Email,
                        };


            return stud;
        }
        public IEnumerable<UserDto> GetMentors()
        {
            var mentor = from a in context.MODUsers
                         join ma in context.UserRoles on a.Id equals ma.UserId
                         where ma.RoleId == "2"
                         select new UserDto
                         {
                             id=a.Id,
                             Active=a.Active,
                             Experience=a.Experience,
                             Firstname=a.Firstname,
                             Skill=a.Skill,
                             Timing=a.Timing,
                             Email=a.Email,
                             PhoneNumber=a.PhoneNumber
                             
                         };
            return mentor;
        }

        public IEnumerable<MentorNameDto> GetMentorsName()
        {
            var mentorname = from a in context.MODUsers
                         join ma in context.UserRoles on a.Id equals ma.UserId
                         where ma.RoleId == "2"
                         select new MentorNameDto
                         {
                             id = a.Id,
                             Firstname = a.Firstname
                             
                            
                         };
            return mentorname;
        }


        public bool UpdateCourses(CourseDto courseDto)
        {
            try
            {
                var course = context.Courses.SingleOrDefault(c => c.Id == courseDto.Id);
                course.Id = courseDto.Id;
                course.Name = courseDto.CourseName;
                course.Timing = courseDto.CourseTiming;
                course.Details = courseDto.CourseDetails;
                course.Fee = courseDto.CourseFee;
                course.User = context.MODUsers.SingleOrDefault(u => u.Id == courseDto.UserId);

                context.Courses.Update(course);
                int result = context.SaveChanges();
                if (result > 0)
                {
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        //public bool DeleteCourses(Course course)
        //{

        //    try
        //    {
        //        context.Courses.Remove(course);
        //        //var movieActors = context.MovieActors
        //        //    .Where(ma => ma.Movie == movie);
        //        //context.MovieActors.RemoveRange(movieActors);
        //        int result = context.SaveChanges();
        //        if (result > 0)
        //        {
        //            return true;
        //        }
        //        return false;
        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }
        //}

        public bool BlockUser(string id)
        {
            {
                var userblock = context.MODUsers.SingleOrDefault(u => u.Id == id);
                userblock.Active = !userblock.Active;
            }
            var result = context.SaveChanges();
            if (result > 0)
            {
                return true;
            }
            return false;
        }
        public bool AddEnrolledCourses(EnrollCourse enrolledCourse)
        {
            try
            {
                var result1 = from c in context.EnrollCourses
                              where c.StudentEmail == enrolledCourse.StudentEmail
                                    && c.Name == enrolledCourse.Name
                              select c;
                if (result1.Count() == 0)
                {
                    context.EnrollCourses.Add(enrolledCourse);
                    int result = context.SaveChanges();
                    if (result > 0)
                    {
                        return true;
                    }
                }

                return false;
            }
            catch (Exception e)
            {

                throw;
            }
        }

        public bool ChangeCourseStatus(EnrollCourse enrolledCourse, string UserEmail)
        {
            try
            {
                if (UserEmail == enrolledCourse.MentorEmail)
                {
                    if (enrolledCourse.Status == "Requested")
                    {
                        enrolledCourse.Status = "Request Accepted";
                    }
                    else if (enrolledCourse.Status == "In Progress")
                    {
                        enrolledCourse.Status = "Completed";
                    }
                    context.EnrollCourses.Update(enrolledCourse);
                    int result = context.SaveChanges();
                    if (result > 0)
                    {
                        return true;
                    }
                }
                else if (UserEmail == enrolledCourse.StudentEmail && enrolledCourse.Status == "Request Accepted")
                {
                    enrolledCourse.Status = "In Progress";
                    context.EnrollCourses.Update(enrolledCourse);
                    int result = context.SaveChanges();
                    if (result > 0)
                    {
                        return true;
                    }
                }

                return false;
            }
            catch (Exception e)
            {

                throw;
            }
        }

        public IEnumerable<EnrollCourse> GetEnrolledCourses()
        {

            return this.context.EnrollCourses.ToList();
        }

        public List<EnrollCourse> GetEnrolledCoursesByMentor(string modelEmail)
        {
            var result = from c in context.EnrollCourses
                         where c.MentorEmail == modelEmail
                         select c;
            return result.ToList();
        }

        public List<EnrollCourse> GetEnrolledCoursesByStudent(string modelEmail)
        {
            var result = from c in context.EnrollCourses
                         where c.StudentEmail == modelEmail
                         select c;
            return result.ToList();
        }



    }
}
