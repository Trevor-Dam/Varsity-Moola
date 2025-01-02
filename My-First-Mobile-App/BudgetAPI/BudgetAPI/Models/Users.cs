using System.ComponentModel.DataAnnotations;

namespace BudgetAPI.Models
{
    public class Users
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        [Required]
        [StringLength(100)]
        public string Surname { get; set; } = string.Empty ;
        [Required]
        [StringLength(100)]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string? Password { get; set; }
        [Required]
        [StringLength(100)]
        public string Institution { get; set; } = string.Empty;
        [Required]
        [StringLength (100)]
        public string Role {  get; set; } = string.Empty;
        
    }
}
