using System.ComponentModel.DataAnnotations;
namespace BookAPI.Domain.ViewModels
{
    public class Login
    {
        [Required(ErrorMessage = "Please enter email")]
        [DataType(DataType.EmailAddress, ErrorMessage = "Please enter valid email")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Please enter password")]
        [DataType(DataType.Password, ErrorMessage = "Please enter valid password")]
        public string Password { get; set; } = null!;
    }
}
