using System.ComponentModel.DataAnnotations;

namespace BudgetAPI.Models
{
    public class Income
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public double MoneyIn {  get; set; }
        [Required]
        public string Source { get; set; } = string.Empty;
        [Required]
        public string AllowanceType { get; set; } = string.Empty;
    }
}
