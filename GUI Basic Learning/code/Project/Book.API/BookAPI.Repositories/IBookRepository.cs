using BookAPI.Domain.Models;

namespace BookAPI.Repositories
{
    public interface IBookRepository
    {
        Task<int> AddBookAsync(Book book);
        Task<int> UpdateBookAsync(Book book);
    }
}
