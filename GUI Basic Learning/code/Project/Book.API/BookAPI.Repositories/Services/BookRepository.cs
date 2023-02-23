using BookAPI.Domain.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System.Data;

namespace BookAPI.Repositories.Services
{
    public class BookRepository : IBookRepository
    {
        private readonly IConfiguration _configuration;
        private MySqlConnection _connection;

        public BookRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            InitializeConnection();
        }

        #region InitializeConnection
        /// <summary>
        /// Define connection with mysql
        /// </summary>
        private void InitializeConnection()
        {
            _connection = new MySqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        }
        #endregion

        #region GetBooks
        /// <summary>
        /// retrive all book details
        /// </summary>
        /// <returns>list of object of all book</returns>
        public async Task<IEnumerable<Book>> GetBooksAsync()
        {
            try
            {
                if (_connection.State != ConnectionState.Open)
                    _connection.Open();

                IEnumerable<Book> books = await _connection.QueryAsync<Book>("Select * From Book");

                if (_connection.State == ConnectionState.Open)
                    _connection.Close();

                return books;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (_connection.State == ConnectionState.Open)
                    _connection.Close();
            }
        }
        #endregion

        #region GetBookById
        /// <summary>
        /// give book details based on id
        /// </summary>
        /// <param name="id">id of book</param>
        /// <returns>object of book</returns>
        public async Task<Book> GetBookByIdAsync(int id)
        {
            try
            {
                if (_connection.State != ConnectionState.Open)
                    _connection.Open();

                Book book = await _connection.QuerySingleOrDefaultAsync<Book>("Select * From Book Where Id = " + id);
                if (_connection.State == ConnectionState.Open)
                    _connection.Close();

                return book;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (_connection.State == ConnectionState.Open)
                    _connection.Close();
            }
        }
        #endregion

        #region AddBook
        /// <summary>
        /// add book in book table
        /// </summary>
        /// <param name="book">object of book which we want to insert</param>
        /// <returns>number of affected rows</returns>
        public async Task<int> AddBookAsync(Book book)
        {
            try
            {
                if (_connection.State != ConnectionState.Open)
                    _connection.Open();

                int result = await _connection.ExecuteAsync("Insert into Book (Title, Author, Price, Rating, URL, PublishDate, Description) values (@Title, @Author, @Price, @Rating, @URL, @PublishDate, @Description)", book);

                if (_connection.State == ConnectionState.Open)
                    _connection.Close();

                return result;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (_connection.State == ConnectionState.Open)
                    _connection.Close();
            }
        }
        #endregion

        #region UpdateBook
        /// <summary>
        /// update book in book table
        /// </summary>
        /// <param name="book">object of Book</param>
        /// <returns>number of affected rows</returns>
        public async Task<int> UpdateBookAsync(Book book)
        {
            try
            {
                if (_connection.State != ConnectionState.Open)
                    _connection.Open();

                int result = await _connection.ExecuteAsync("Update Book set Title = @Title, Author = @Author, Price = @Price, Rating = @Rating, URL = @URL, PublishDate = @PublishDate, Description = @Description Where Id = @Id", book);

                if (_connection.State == ConnectionState.Open)
                    _connection.Close();

                return result;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (_connection.State == ConnectionState.Open)
                    _connection.Close();
            }
        }
        #endregion

        #region DeleteBook
        /// <summary>
        /// Delete book from book table on id
        /// </summary>
        /// <param name="id">id of book</param>
        /// <returns>number of affected rows</returns>
        public async Task<int> DeleteBookAsync(int id)
        {
            try
            {
                if (_connection.State != ConnectionState.Open)
                    _connection.Open();

                int result = await _connection.ExecuteAsync("Delete From Book Where Id = " + id);

                if (_connection.State == ConnectionState.Open)
                    _connection.Close();

                return result;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (_connection.State == ConnectionState.Open)
                    _connection.Close();
            }

        }
        #endregion
    }
}
