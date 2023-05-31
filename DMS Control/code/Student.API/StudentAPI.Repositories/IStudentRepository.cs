using BookAPI.Domain;
using StudentAPI.Domain.ViewModels;

namespace BookAPI.Repositories
{
    public interface IStudentRepository
    {
        Task<StudentListModel> GetStudentsAsync(int startIndex, int pageSize, string sorting);
        Task<Student> GetStudentByIdAsync(int id);
        Task<int> AddStudentAsync(Student student);
        Task<int> UpdateStudentAsync(Student student);
        Task<int> DeleteStudentAsync(int id);
    }
}