using System.ComponentModel.DataAnnotations;

namespace BookAPI.Domain.Models
{
    public class Book
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Please eneter title")]
        [MinLength(2, ErrorMessage = "Title must contains at least two character")]
        public string Title { get; set; } = null!;

        [Required(ErrorMessage = "Please eneter author")]
        [MinLength(2, ErrorMessage = "Author must contains at least two character")]
        public string Author { get; set; } = null!;

        [Required(ErrorMessage = "Please eneter price")]
        [DataType(DataType.Currency, ErrorMessage = "Please enter valid currency")]
        public decimal Price { get; set; }

        [Range(0, 5, ErrorMessage = "Rate must be between 0 to 5")]
        public int Rating { get; set; }

        [DataType(DataType.Url, ErrorMessage = "Please enter valid URL")]
        public string URL { get; set; } = string.Empty!;

        [DataType(DataType.DateTime, ErrorMessage = "Please enter valid publish date")]
        public DateTime PublishDate { get; set; }

        [StringLength(500, ErrorMessage = "Decription must contains less then 500 characters")]
        public string Description { get; set; } = string.Empty;
    }
}
