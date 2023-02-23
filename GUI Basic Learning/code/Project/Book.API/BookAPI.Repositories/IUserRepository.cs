using BookAPI.Domain.Models;
using BookAPI.Domain.ViewModels;

namespace BookAPI.Repositories
{
    public interface IUserRepository
    {
        Task<User> ValidateUserAsync(Login login);
        Task<User> GetUserByIdAsync(int id);
        Task<int> RegisterUserAsync(User user);
        Task<int> UpdateUserAsync(User user);
        //Tokens Authonticate(Login login);
    }
}
