using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace BudgetAPI.Models
{
    public class Balance
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [ForeignKey(nameof(Account))]
        public int AccountId { get; set; }
        public Account Account { get; set; }
        [Required]
        [ForeignKey(nameof(Income))]
        public int IncomeId { get; set; }
        public Income Income { get; set; }
        [Required]
        [ForeignKey(nameof(Expense))]
        public int ExpenseId { get; set; }
        public Expense Expense { get; set; }
        [Required]
        public double PreviousBalance { get; set; }
        [Required]
        public double AvailableBalance { get; set; }
        [Required]
        public bool ValidTransaction { get; set; }
    }
}
