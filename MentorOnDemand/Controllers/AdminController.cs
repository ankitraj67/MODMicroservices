using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MentorOnDemand.Data;
using MentorOnDemand.Dto;
using MentorOnDemand.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MentorOnDemand.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   // [Authorize]
    public class AdminController : ControllerBase
    {
        IRepository adminRepository;
        AccountController accountController;

        public AdminController(IRepository adminRepository)
        {
            this.adminRepository = adminRepository;
        }
        // GET: api/Admin
        [HttpGet("course")]
        public IActionResult GetCourses()
        {
            return Ok(adminRepository.GetCourses());
        }

        [HttpGet("student")]
        public IActionResult GetStudents()
        {
            return Ok(adminRepository.GetStudents());
        }
        [HttpGet("mentor")]
        public IActionResult GetMentors()
        {
            return Ok(adminRepository.GetMentors());
        }
        [HttpGet("mentorname")]
        public IActionResult GetMentorsName()
        {
            return Ok(adminRepository.GetMentorsName());
        }

        // GET: api/Admin/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Admin
        [HttpPost]
        public IActionResult Post([FromBody] CourseDto course)
        {
            if (ModelState.IsValid)
            {
                bool result = adminRepository.AddCourse(course);
                if (result)
                {
                    return Created("AddCourse", course);
                }
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return BadRequest(ModelState);
        }

        // PUT: api/Admin/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] CourseDto course)
        {
            if (ModelState.IsValid && id == course.Id)
            {
                bool result = adminRepository.UpdateCourses(course);
                if (result)
                {
                    return Ok();
                }
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return BadRequest(ModelState);

        }

        // DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public IActionResult Delete(int id)
        //{
        //    var course = adminRepository.GetCourses();
        //    if (course == null)
        //    {
        //        return NotFound();
        //    }
        //    bool result = adminRepository.DeleteCourses();
        //    if (result)
        //    {
        //        return Ok();
        //    }
        //    return StatusCode(StatusCodes.Status500InternalServerError);
        //}
        [HttpGet("blockunblock/{id}")]
        public IActionResult GetBlockUnblock(string id)
        {
            var result = adminRepository.BlockUser(id);
            if (result)
            {
                return Ok();
            }
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
        // GET: api/Admin/GetCount
        [HttpGet("getCount")]
        public async Task<IActionResult> GetCount()
        {
            try
            {

                var users = await accountController.GetCount();
                return Ok(new { users = users });
            }
            catch (Exception e)
            {
                throw;
            }
        }

    }
}
