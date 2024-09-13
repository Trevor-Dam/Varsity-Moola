using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BudgetAPI.Models
{
    [PrimaryKey(nameof(UserId), nameof(BalanceId))]
    public class Account
    {
        [Required]
        [ForeignKey(nameof(User))]
        public int UserId { get; set; }
        public Users User { get; set; }
        [Required]
        [ForeignKey(nameof(Balance))]
        public int BalanceId { get; set; }
        public Balance Balance { get; set; }
        [Required]
        public double Liabilities { get; set; }
        [Required]
        public double Target {  get; set; }
        [Required]
        public double Amount { get; set; } = 0;
        [Required]
        public double Savings { get; set; }
    }
}
