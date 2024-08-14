using BudgetAPI;
using BudgetAPI.Data;
using BudgetAPI.Models;
using BudgetAPI.Migrations;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddNpgsql<BudgetDataContext>(builder.Configuration.GetConnectionString(Secrecy.getConnection()));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapPost("/api/login", (HttpContext httpContext) =>
{
    var db = httpContext.RequestServices.GetRequiredService<BudgetDataContext>();
    var (request, response) = (httpContext.Request, httpContext.Response); 
    var data = request.ReadFormAsync().Result;
    var username = data["username"];
    var passwords = Secrecy.hashString(data["password"]);
    var query = db.User.Where(u => u.Email == username && u.Password == passwords).FirstOrDefault();
    if (query != null)
    {
        httpContext.Response.StatusCode = 200;
        httpContext.Response.WriteAsync("Login successful");
    }
    else
    {
        httpContext.Response.StatusCode = 401;
        httpContext.Response.WriteAsync("Invalid username or password");
    }
});



app.Run();


