using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MentorOnDemand.Dto
{
    public class CourseListDto
    {
        public int Id { get; set; }
        public string CourseName { get; set; }
        public string CourseFee { get; set; }
        public string MentorName { get; set; }
        public string CourseTiming { get; set; }
        public string CourseDetails { get; set; }
    }
}
