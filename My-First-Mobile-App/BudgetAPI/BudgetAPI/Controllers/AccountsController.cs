using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BudgetAPI.Data;
using BudgetAPI.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.AspNetCore.Authentication.BearerToken;
using System.IdentityModel.Tokens.Jwt;

namespace BudgetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly BudgetDataContext _context;

        public AccountsController(BudgetDataContext context)
        {
            _context = context;
        }
        protected int GetUserId()
        {
            return int.Parse(this.User.Claims.First(i => i.Type == "Id").Value);
        }
        [Route("Add")]
        [HttpPost]
        [Authorize]
        public IActionResult AddAccount([FromBody] ModelAccount account)
        {
            var user = (from u in _context.User 
                        where u.Id == GetUserId()
                        select u).FirstOrDefault();
            if (user == null)
            {
                return new JsonResult("User not authorized")
                {
                    ContentType = "application/json",
                    StatusCode = 401
                };
            }
            else
            {
                Account acc = new Account
                {
                    User = user,
                    Balance = 0,
                    CVV = account.secureCodes,
                    CardNumber = account.cardNo,
                    ExpiryDate = DateOnly.Parse(account.expirationDate),
                    Savings = 0,
                    Target = 0
                };
                _context.Add(acc);
                try
                {
                    _context.SaveChanges();
                    return new JsonResult("Account added")
                    {
                        ContentType = "application/json",
                        StatusCode = 201
                    };
                }
                catch (Exception ex)
                {
                    ex.GetBaseException();
                    Console.WriteLine(ex.Message);
                    return new JsonResult("Some error occured")
                    {
                        ContentType = "application/json",
                        StatusCode = 400
                    };
                }
            }
                
        }
    }  
}

public class ModelAccount
{
    public string accountHolderName { get; set; }
    public string accountHolderSurname { get; set; }
    public string cardNo { get; set; }
    public string expirationDate { get; set; }
    public string secureCodes { get; set; }
}
