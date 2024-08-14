using Microsoft.EntityFrameworkCore;
using BudgetAPI.Models;

namespace BudgetAPI.Data
{
    public class BudgetDataContext : DbContext
    {
        public DbSet<Users> User { get; set; } = null;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(Secrecy.getConnection());
        }
    }
}
