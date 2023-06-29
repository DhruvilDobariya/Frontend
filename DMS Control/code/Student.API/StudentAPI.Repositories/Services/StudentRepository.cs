using BookAPI.Domain;
using BookAPI.Repositories;
using Dapper;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using StudentAPI.Domain.ViewModels;
using System.Data;

namespace StudentAPI.Repositories.Services
{
    public class StudentRepository : IStudentRepository
    {
        private readonly IConfiguration _configuration;
        private MySqlConnection _connection;

        public StudentRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            InitializeConnection();
        }

        private void InitializeConnection()
        {
            _connection = new MySqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        }

        public async Task<StudentListModel> GetStudentsAsync(int startIndex, int pageSize, string sorting)
        {
            try
            {
                if (_connection.State != ConnectionState.Open)
                    _connection.Open();

                IEnumerable<Student> data;

                if(sorting == null)
                {
                    data = await _connection.QueryAsync<Student>($"Select * From Student");
                }
                else if (sorting.Split(" ")[1] == "ASC")
                {
                    data = await _connection.QueryAsync<Student>($"Select * From Student Order By {sorting.Split(' ')[0]}");
                }
                else
                {
                    data = await _connection.QueryAsync<Student>($"Select * From Student Order By {sorting.Split(' ')[0]} DESC");
                }

                StudentListModel students = new StudentListModel();
                if (pageSize != 0)
                {

                    students.Students = data.Skip((startIndex / pageSize) * pageSize).Take(pageSize).ToList();
                    students.Count = data.Count();
                }
                else
                {
                    students.Students = data.ToList();
                    students.Count = data.Count();
                }

                if (_connection.State == ConnectionState.Open)
                    _connection.Close();

                return students;
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

        public async Task<Student> GetStudentByIdAsync(int id)
        {
            try
            {
                if (_connection.State != ConnectionState.Open)
                    _connection.Open();

                Student student = await _connection.QuerySingleOrDefaultAsync<Student>("Select * From Student Where Id = " + id);
                if (_connection.State == ConnectionState.Open)
                    _connection.Close();

                return student;
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

        public async Task<int> AddStudentAsync(Student student)
        {
            try
            {
                if (_connection.State != ConnectionState.Open)
                    _connection.Open();

                int result = await _connection.ExecuteAsync("Insert into Student (Name, RollNo, Email, ContactNo) values (@Name, @RollNo, @Email, @ContactNo)", student);

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

        public async Task<int> UpdateStudentAsync(Student student)
        {
            try
            {
                if (_connection.State != ConnectionState.Open)
                    _connection.Open();

                int result = await _connection.ExecuteAsync("Update Student set Name = @Name, RollNo = @RollNo, Email = @Email, ContactNo = @ContactNo Where Id = @Id", student);

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

        public async Task<int> DeleteStudentAsync(int id)
        {
            try
            {
                if (_connection.State != ConnectionState.Open)
                    _connection.Open();

                int result = await _connection.ExecuteAsync("Delete From Student Where Id = " + id);

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
    }
}
