using BudgetAPI;
using BudgetAPI.Data;
using BudgetAPI.Models;
using BudgetAPI.Migrations;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Configuration;
using System.Text;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);



// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

IConfiguration config = builder.Configuration.GetRequiredSection("Jwt");
Secrecy.Connection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidateLifetime = true,
        ValidIssuer = config["Jwt:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]))
    });
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("Role", policy =>
    {
        policy.RequireClaim("Role");
    })
    .AddPolicy("Institution", policy =>
    {
        policy.RequireClaim("Institution");
    })
    .AddPolicy("Email", policy =>
    {
        policy.RequireClaim("Email");
    })
    .AddPolicy("Id", policy =>
    {
        policy.RequireClaim("Id");
    });
builder.Services.AddNpgsql<BudgetDataContext> ("User Id=postgres.xyciunzllttvkwdfyazf;Password=$t1n3Tr3v0r1023vor;Server=aws-0-eu-central-1.pooler.supabase.com;Port=5432;Database=postgres");

builder.Services.AddControllers().ConfigureApiBehaviorOptions(options =>
{
    options.SuppressConsumesConstraintForFormFileParameters = true;
    options.SuppressInferBindingSourcesForParameters = true;
    options.SuppressModelStateInvalidFilter = true;
    options.SuppressMapClientErrors = true;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();


app.Run();


