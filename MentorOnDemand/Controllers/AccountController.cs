using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using MentorOnDemand.Data;
using MentorOnDemand.Dto;
using MentorOnDemand.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace MentorOnDemand.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<UserMod> signInManager;
        private readonly UserManager<UserMod> userManager;
        private readonly IConfiguration configuration;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly MentorContext mentorContext;


        public AccountController(UserManager<UserMod> userManager, 
            SignInManager<UserMod> signInManager, 
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration,
            MentorContext mentorContext)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
            this.roleManager = roleManager;
            this.mentorContext = mentorContext;
        }

        [Route("login")]
        [HttpPost]

        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await signInManager.PasswordSignInAsync
                (model.Email, model.Password, false, false);

            if (result.Succeeded)
            {
                var appUser = userManager.Users.Single(r => r.Email == model.Email);
                if (appUser.Active)
                {
                    var response = await GenerateJwtToken(model.Email, appUser);
                    return Ok(response);
                }
                return BadRequest(new { Message = "You have been blocked by administrator." });
            }
            return BadRequest(result);
        }

        [Route("logout")]
        [HttpPost]
        [Authorize]

        public async Task<IActionResult> Logout([FromBody] LoginDto model)
        {
            try
            {
                await signInManager.SignOutAsync();
            }
            catch (Exception)
            {
                //InternalServerError
                return StatusCode(StatusCodes.Status500InternalServerError, "LogOut Failed");
            }
            return Ok();
        }

        [Route("register")]
        [HttpPost]

        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new UserMod
            {
                UserName = model.Email,
                Firstname = model.Firstname,
                Email = model.Email,
                Skill = model.Select,
                Timing = model.Time,
                Experience = model.Experience,
                PhoneNumber = model.PhoneNumber,
                Active = true
            };

            var result = await userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                //role
                var roleName = roleManager.Roles.FirstOrDefault(
                    r => r.Id == model.Role.ToString()).NormalizedName;

                var result1 = await userManager.AddToRoleAsync(user, roleName);
                if (result1.Succeeded)
                {
                    //  return Created("Registered", model.Email);
                    var response = await GenerateJwtToken(model.Email, user);

                    return Ok(response);
                }
                return BadRequest(result1.Errors);
            }
            return BadRequest(result.Errors);
        }
        private async Task<TokenDto> GenerateJwtToken(string email, UserMod user)
        {
            var roles = await userManager.GetRolesAsync(user);
            var role = roleManager.Roles.SingleOrDefault(r => r.Name == roles.SingleOrDefault());
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Role,role.Name)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            // recommended is 5 min
            var expires = DateTime.Now.AddDays(Convert.ToDouble(configuration["JwtExpireDays"]));
            var token = new JwtSecurityToken(
                configuration["JwtIssuer"],
                configuration["JwtIssuer"],
                claims,
                expires: expires,
                signingCredentials: creds
            );
            //var roles = await userManager.GetRolesAsync(user);
            //var roleId = roleManager.Roles.SingleOrDefault(r => r.Name == roles.SingleOrDefault()).Id;
            var response = new TokenDto
            {
                Email = email,
                Role = Convert.ToInt32(role.Id),
                Token = (new JwtSecurityTokenHandler()).WriteToken(token)
            };
            return response;
        }


        //get count of users..
        [HttpGet]
        public async Task<CountDto> GetCount()
        {
            try
            {
                var mentor = await userManager.GetUsersInRoleAsync("Mentor");
                var student = await userManager.GetUsersInRoleAsync("Student");

                var countDto = new CountDto
                {
                    MentorCount = mentor.Count(),
                    StudentCount = student.Count(),
                    CourseCount = mentorContext.Courses.Count()
                };

                return countDto;
            }
            catch (Exception e)
            {

                throw;
            }
        }

    }
}