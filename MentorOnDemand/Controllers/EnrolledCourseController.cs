using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MentorOnDemand.Data;
using MentorOnDemand.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MentorOnDemand.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnrolledCourseController : ControllerBase
    {
        IRepository repository;
        public EnrolledCourseController(IRepository repository)
        {
            this.repository = repository;
        }
        // GET: api/EnrolledCourse
        [HttpGet]
        public IActionResult GetEnrolledCourses()
        {
            return Ok(repository.GetEnrolledCourses());
        }

        [HttpGet("ListOfCourse/{modelEmail}")]
        public IActionResult GetEnrolledCoursesByStudent(string modelEmail)
        {
            var result = repository.GetEnrolledCoursesByStudent(modelEmail);
            return Ok(result);
        }

        [HttpGet("ListOfCourseMentor/{modelEmail}")]
        public IActionResult GetEnrolledCoursesByMentor(string modelEmail)
        {
            var result = repository.GetEnrolledCoursesByMentor(modelEmail);
            return Ok(result);
        }
        [HttpGet("usersList")]
        public IActionResult GetUsersList()
        {
            return Ok(repository.GetStudents());
        }

        [HttpGet("mentorsList")]
        public IActionResult GetMentorsList()
        {
            return Ok(repository.GetMentors());
        }

        // GET: api/EnrolledCourse/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/EnrolledCourse
        [HttpPost]
        public IActionResult Post([FromBody] EnrollCourse enrolledCourse)
        {
            if (ModelState.IsValid)
            {

                bool result = repository.AddEnrolledCourses(enrolledCourse);
                if (result)
                {
                    return Created("AddCoursesEnrolled", enrolledCourse);
                }
                return BadRequest(new { Message = "You have already Enrolled for This Course." });

                //return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return BadRequest(ModelState);
        }

        // PUT: api/EnrolledCourse/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {

        }

        [HttpPut("ChangeEnrolledCourseStatus/{id}/{UserEmail}")]
        public IActionResult ChangeCourseStatus(int id, string UserEmail, [FromBody] EnrollCourse enrolledCourse)
        {
            if (ModelState.IsValid && id == enrolledCourse.Id)
            {
                bool result = repository.ChangeCourseStatus(enrolledCourse, UserEmail);
                if (result)
                {
                    return Created("UpdatedCourse", enrolledCourse.Id);
                }
            }
            return BadRequest(ModelState);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
