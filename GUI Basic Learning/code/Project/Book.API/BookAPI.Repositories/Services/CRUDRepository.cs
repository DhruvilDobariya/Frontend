using Dapper;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System.Data;

namespace BookAPI.Repositories.Services
{
    public class CRUDRepository<T> : ICRUDRepository<T> where T : class
    {
        private readonly IConfiguration _configuration;
        private MySqlConnection _connection;
        private readonly string _tableName;

        public CRUDRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            InitializeConnection();

            _tableName = typeof(T).ToString().Split(".")[3];
            // typeof(T).ToString() gives us: BookAPI.Domain.Models.Book
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

        #region GetEnities
        /// <summary>
        /// retrive all T type entities details
        /// </summary>
        /// <returns>list of object of all T type entities</returns>
        public async Task<IEnumerable<T>> GetAllAsync()
        {
            try
            {
                if (_connection.State != ConnectionState.Open)
                    _connection.Open();

                IEnumerable<T> entities = await _connection.QueryAsync<T>("Select * From " + _tableName);

                if (_connection.State == ConnectionState.Open)
                    _connection.Close();

                return entities;
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

        #region GetById
        /// <summary>
        /// give entity details based on id
        /// </summary>
        /// <param name="id">id of entity</param>
        /// <returns>object of entity</returns>
        public async Task<T> GetByIdAsync(int id)
        {
            try
            {
                if (_connection.State != ConnectionState.Open)
                    _connection.Open();

                T entity = await _connection.QuerySingleOrDefaultAsync<T>("Select * from " + _tableName + " where Id = " + id);

                if (_connection.State == ConnectionState.Open)
                    _connection.Close();

                return entity;
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

        #region DeleteEntity
        /// <summary>
        /// Delete entity from entity table on id
        /// </summary>
        /// <param name="id">id of entity</param>
        /// <returns>number of affected rows</returns>
        public async Task<int> DeleteAsync(int id)
        {
            try
            {
                if (_connection.State != ConnectionState.Open)
                    _connection.Open();

                int result = await _connection.ExecuteAsync("Delete From " + _tableName + " Where Id = " + id);

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
