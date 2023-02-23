using System.ComponentModel.DataAnnotations;

namespace BookAPI.Domain
{
    public class Student
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Please eneter name")]
        [MinLength(2, ErrorMessage = "Name must contains at least two character")]
        public string Name { get; set; } = null!;

        [Required(ErrorMessage = "Please eneter roll no")]
        public int RollNo { get; set; }

        [Required(ErrorMessage = "Please eneter email")]
        [DataType(DataType.EmailAddress, ErrorMessage = "Please enter valid email")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Please eneter contact no")]
        [DataType(DataType.PhoneNumber, ErrorMessage = "Please enter valid conatact no")]
        public string ContactNo { get; set; } = null!;
    }
}