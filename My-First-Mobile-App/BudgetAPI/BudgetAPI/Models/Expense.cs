using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;

namespace BudgetAPI.Models
{
    public class Expense
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public double MoneyOut { get; set; }
        [Required]
        public string Store {  get; set; } = string.Empty;
        [Required]
        [StringLength(50)]
        public string ExpenseCategory { get; set; } = string.Empty ;
    }
}
