using BookAPI.Domain.Models;
using BookAPI.Domain.ViewModels;
using Dapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MySql.Data.MySqlClient;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BookAPI.Repositories.Services
{
    public class UserRepository : IUserRepository
    {
        private readonly IConfiguration _configuration;
        private MySqlConnection _connection;

        public UserRepository(IConfiguration configuration)
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

        #region Authenticate
        /// <summary>
        /// Get Jwt token
        /// </summary>
        /// <param name = "login" > login object of Login class which contains email and password of user</param>
        /// <returns>It gives JWT token</returns>
        public Tokens Authenticate(Login login)
        {
            try
            {
                if (_connection.State != ConnectionState.Open)
                    _connection.Open();

                User user = _connection.QuerySingleOrDefault<User>("Select * from User where Email = @Email And Password = @Password", login);

                if (_connection.State == ConnectionState.Open)
                    _connection.Close();

                if (user != null)
                {
                    var tockenHandler = new JwtSecurityTokenHandler();
                    var tockenKey = Encoding.UTF8.GetBytes(_configuration["JWT:Key"]);

                    var tockenDescriptior = new SecurityTokenDescriptor()
                    {
                        Subject = new ClaimsIdentity(
                            new Claim[]
                            {
                                new Claim(ClaimTypes.Name, user.Name)
                            }
                        ),
                        //Expires = DateTime.UtcNow.AddMinutes(5),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tockenKey), SecurityAlgorithms.HmacSha256Signature)
                    };

                    var tocken = tockenHandler.CreateToken(tockenDescriptior);
                    return new Tokens { Token = tockenHandler.WriteToken(tocken), Id = user.Id, Name = user.Name, Email = user.Email };
                }
                return null;
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

        #region RegisterUser
        /// <summary>
        /// This method is used for register new user.
        /// </summary>
        /// <param name="user">user is a object of User class which contains user datails</param>
        /// <returns>Number of affected row in User table</returns>
        public async Task<int> RegisterUserAsync(User user)
        {
            try
            {
                if (_connection.State != ConnectionState.Open)
                    _connection.Open();

                int result = await _connection.ExecuteAsync("Insert into User (Name, Email, Password) values (@Name, @Email, @Password)", user);

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

        #region UpdateUser
        /// <summary>
        /// This method is used for update existing user.
        /// </summary>
        /// <param name="user">user is a object of User class which contains user datails</param>
        /// <returns>Number of affected row in User table</returns>
        public async Task<int> UpdateUserAsync(User user)
        {
            try
            {
                if (_connection.State != ConnectionState.Open)
                    _connection.Open();

                int result = await _connection.ExecuteAsync("Update User set Name = @Name, Email = @Email, Password = @Password Where Id = @Id", user);

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
