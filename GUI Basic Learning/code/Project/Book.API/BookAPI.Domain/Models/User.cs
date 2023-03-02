using System.ComponentModel.DataAnnotations;

namespace BookAPI.Domain.Models
{
    //[Index(nameof(Email), IsUnique = true)]
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Please eneter name")]
        [MinLength(2, ErrorMessage = "Name must contains at least two character")]
        public string Name { get; set; } = null!;

        [Required(ErrorMessage = "Please eneter email")]
        [DataType(DataType.EmailAddress, ErrorMessage = "Please enter valid email")]
        public string email { get; set; } = null!;

        [Required(ErrorMessage = "Please eneter password")]
        [DataType(DataType.Password, ErrorMessage = "Please enter valid password")]
        public string Password { get; set; } = string.Empty!;
    }
}
