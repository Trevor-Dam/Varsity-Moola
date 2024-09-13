using Microsoft.EntityFrameworkCore;
using BudgetAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace BudgetAPI.Data
{
    public class BudgetDataContext : DbContext
    {
        public BudgetDataContext(DbContextOptions<BudgetDataContext> options) : base(options)
        {
        }
        public DbSet<Users> User { get; set; }
        public DbSet<Income> Income { get; set; }
        public DbSet<Expense> Expense { get; set; }
        public DbSet<Balance> Balance { get; set; }
        public DbSet<Account> Account { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Users>()
                .HasIndex("Email")
                .IsUnique();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(Secrecy.getConnection());
        }
    }
}
