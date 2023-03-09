using BookAPI.Domain.Models;

namespace BookAPI.Domain.ViewModels
{
    public class Tokens : User
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }
}
