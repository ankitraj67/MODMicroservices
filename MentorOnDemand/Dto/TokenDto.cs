using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MentorOnDemand.Dto
{
    public class TokenDto
    {
        public string Email { get; set; }
        public int Role { get; set; }
        public string Token { get; set; }
    }
}
