using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;

namespace BudgetAPI.Models
{
    public class Expense
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [Precision(10,2)]
        public double MoneyOut { get; set; }
        [Required]
        [StringLength(50)]
        public string ExpenseCategory { get; set; } = string.Empty ;
    }
}
