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
        [Route("Add")]
        [HttpPost]
        [Authorize]
        public IActionResult AddAccount([FromBody] ModelAccount account)
        {
            var user = (from u in _context.User 
                        where u.Id == account.userId 
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
                    Savings = account.savings,
                    Target = account.target
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
    public int userId { get; set; }
    public int balanceId { get; set; }
    public double liabilities { get; set; }
    public double target { get; set; }
    public double amount { get; set; }
    public double savings { get; set; }
}
