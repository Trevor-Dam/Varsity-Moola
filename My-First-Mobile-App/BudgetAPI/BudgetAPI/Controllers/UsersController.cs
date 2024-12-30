using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BudgetAPI.Data;
using BudgetAPI.Models;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;

namespace BudgetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(BudgetDataContext context, IConfiguration config) : ControllerBase
    {
        private readonly BudgetDataContext _context = context;
        private readonly IConfiguration _config = config;

        [AllowAnonymous]
        [HttpPost]
        [Route("Register")]
        [Consumes("application/json")]
        public IActionResult Register([FromBody] string email, [FromBody] string password, 
            [FromBody] string confirmPassword, [FromBody] string name, [FromBody] string surname, [FromBody] string institution)
        {
            if (!password.Equals(confirmPassword))
            {
                return BadRequest(new JsonResult("Two Passwords do not match"));
            }
            else if ((name == null) || (email == null) || (password == null) || (confirmPassword == null) || (surname == null) || (institution == null))
            {
                return NotFound(new JsonResult("One or more inputs have no value"));
            }
            else if ((name == "") || (email == "") || (password == "") || (confirmPassword == null) || (surname == null) || (institution == null))
            {
                return BadRequest(new JsonResult("Empty values found"));
            }
            else
            {
                var users = new Users
                {
                    Email = email,
                    Password = password,
                    Name = name,
                    Surname = surname,
                    Institution = institution
                };
                try
                {
                    _context.Add(users);
                    _context.SaveChanges();
                    return Ok(new JsonResult("Data saved, go to Login page"));
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.GetBaseException().StackTrace);
                    return BadRequest(new JsonResult("Server malfunctioned"));
                }
            }
        }
        [AllowAnonymous]
        [HttpPost]
        [Route("Login")]
        [Consumes("application/json")]
        public IActionResult Login([FromBody] string email, [FromBody] string password)
        {
            var user = (from u in _context.User where u.Email == email select u).FirstOrDefault();
            if (user == null)
            {
                return BadRequest(new JsonResult("User not registered"));
            }
            else if (!Secrecy.verifyPassword(password, user.Password))
            {
                return BadRequest(new JsonResult("Passwords do not match"));

            }
            else
            {
                return Ok(new JsonResult(GenerateJsonWebToken(user)));
            }
        }

        private string GenerateJsonWebToken(Users users)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claimsList = new[]
            {
                new Claim("Id", users.Id.ToString()),
                new Claim("Instituition", users.Institution),
                new Claim("Email", users.Email),
            };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claimsList,
                expires: DateTime.UtcNow.AddDays(30),
                signingCredentials: credentials
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
