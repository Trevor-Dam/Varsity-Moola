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
        public IActionResult Register([FromBody] ModelRegister register)
        {
            //first check if user exists
            var existingUser = (from u in _context.User 
                                where u.Email.Equals(register.email)  
                                select u).FirstOrDefault();
            if (existingUser != null)
            {
                return new JsonResult("User already exists")
                {
                    ContentType = "application/json",
                    StatusCode = 400
                };
            }
            else if ((string.IsNullOrEmpty(register.email)) 
                || (string.IsNullOrEmpty(register.password)) 
                || (string.IsNullOrEmpty(register.confirmPassword)) 
                || (string.IsNullOrEmpty(register.surname)) 
                || (string.IsNullOrEmpty(register.institution)) 
                || (string.IsNullOrEmpty(register.role)))
            {
                return new JsonResult("One or more values not entered")
                {
                    ContentType = "application/json",
                    StatusCode = 404
                };
            }
            else if (!register.password.Equals(register.confirmPassword))
            {
                return new JsonResult("Two Passwords do not match")
                {
                    ContentType = "application/json",
                    StatusCode = 400
                };
            }
            else
            {
                var users = new Users
                {
                    Email = register.email,
                    Password = Secrecy.hashString(register.password),
                    Name = register.name,
                    Surname = register.surname,
                    Institution = register.institution,
                    Role = register.role,
                };
                _context.Add(users);
                try
                { 
                    _context.SaveChanges();
                    return new JsonResult("Data saved, go to Login page")
                    {
                        ContentType = "application/json",
                        StatusCode = 201
                    };
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.GetBaseException().StackTrace);
                    return new JsonResult("Server malfunctioned")
                    {
                        ContentType = "application/json",
                        StatusCode = 500
                    };
                }
            }
        }
        [AllowAnonymous]
        [HttpPost]
        [Route("Login")]
        [Consumes("application/json")]
        public IActionResult Login([FromBody] ModelLogin login)
        {
            var user = (from u in _context.User where u.Email == login.email select u).FirstOrDefault();
            if (user == null)
            {
                return new JsonResult("User not registered")
                {
                    ContentType = "application/json",
                    StatusCode = 404
                };
            }
            else if (!Secrecy.verifyPassword(login.password, user.Password))
            {
                return new JsonResult("Passwords do not match")
                {
                    ContentType = "application/json",
                    StatusCode = 400
                };

            }
            else
            {
                return new JsonResult(GenerateJsonWebToken(user))
                {
                    ContentType = "application/json",
                    StatusCode = 201
                };
            }
        }

        private string GenerateJsonWebToken(Users users)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.Aes128CbcHmacSha256);

            var claimsList = new[]
            {
                new Claim("Id", users.Id.ToString()),
                new Claim("Instituition", users.Institution),
                new Claim("Email", users.Email),
                new Claim("Role", users.Role)
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
//class that receives registration data from client
public class ModelRegister
{
    public string email { get; set; }
    public string password { get; set; }
    public string confirmPassword { get; set; }
    public string name { get; set; }
    public string surname { get; set; }
    public string institution { get; set; }
    public string role { get; set; }
}
//records login data from client
public class ModelLogin
{
    public string email { get; set; }
    public string password { get; set; }
}
