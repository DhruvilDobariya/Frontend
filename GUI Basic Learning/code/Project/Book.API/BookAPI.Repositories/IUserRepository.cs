using BookAPI.Domain.Models;
using BookAPI.Domain.ViewModels;

namespace BookAPI.Repositories
{
    public interface IUserRepository
    {
        Task<int> RegisterUserAsync(User user);
        Task<int> UpdateUserAsync(User user);
        Tokens Authenticate(Login login);
    }
}
