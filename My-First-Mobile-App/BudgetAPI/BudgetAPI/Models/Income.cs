using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace BudgetAPI.Models
{
    public class Income
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [Precision(10, 2)]
        public double MoneyIn {  get; set; }
        [Required]
        public string Source { get; set; } = string.Empty;
        public string AllowanceType { get; set; } = string.Empty;
    }
}
