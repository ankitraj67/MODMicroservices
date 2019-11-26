using MentorOnDemand.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MentorOnDemand.Dto
{
    public class CourseDto
    {
        public int Id { get; set; }
        [Required]
        public string CourseName { get; set; }
        [Required]
        public string CourseFee { get; set; }
        [Required]
        public string CourseDetails { get; set; } 
        [Required]
        public string CourseTiming { get; set; }
        public string UserId { get; set; }

    }
}
