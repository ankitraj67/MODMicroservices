using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MentorOnDemand.Models
{
    public class EnrollCourse
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(50)]
        public string MentorEmail { get; set; }

        [Required]
        [MaxLength(50)]
        public string Details { get; set; }

        [Required]
        [MaxLength(50)]
        public string Timing { get; set; }

        [Required]
        [MaxLength(50)]
        public string Fee { get; set; }

        [Required]
        [MaxLength(50)]
        public string StudentEmail { get; set; }

        [Required]
        [MaxLength(50)]
        public string Status { get; set; }


    }
}
