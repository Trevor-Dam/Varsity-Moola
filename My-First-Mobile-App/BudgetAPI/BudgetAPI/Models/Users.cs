using System.ComponentModel.DataAnnotations;

namespace BudgetAPI.Models
{
    public class Users
    {
        [Key]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
        [Required]
        public string? CourseName { get; set; }
        [Required]
        public string? Institution { get; set; }
        public double RelaxBudget { get; set; }
        [Required]
        public double Expenses { get; set; }
        [Required]
        public double Income { get; set; }
        
    }
}
