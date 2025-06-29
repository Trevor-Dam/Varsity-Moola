using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BudgetAPI.Models
{
    public class Account
    {
        [Key]
        public int AccountId { get; set; }
        [Required]
        [ForeignKey(nameof(User))]
        public int UserId { get; set; }
        public Users User { get; set; }
        [Required]
        [StringLength(16)]
        public string CardNumber { get; set; } = string.Empty;
        [Required]
        [StringLength(3)]
        public string CVV { get; set; } = string.Empty.PadLeft(2, '0');
        [Required]
        public DateOnly ExpiryDate { get; set; }
        [Required]
        [Precision(10,2)]
        public double Balance { get; set; } = 0;
        [Required]
        [Precision(10,2)]
        public double Target { get; set; } = 0;
        [Required]
        [Precision(10,2)]
        public double Savings { get; set; } = 0;
    }
}
