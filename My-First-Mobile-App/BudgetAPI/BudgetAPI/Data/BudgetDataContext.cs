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
        public DbSet<Account> Account { get; set; }
        public DbSet<Income> Income { get; set; }
        public DbSet<Expense> Expense { get; set; }
        public DbSet<Balance> Balance { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Users>()
                .HasIndex("Email")
                .IsUnique();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("User Id=postgres.xyciunzllttvkwdfyazf;Password=$t1n3Tr3v0r1023vor;Server=aws-0-eu-central-1.pooler.supabase.com;Port=5432;Database=postgres");
        }
    }
}
