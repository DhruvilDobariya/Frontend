using BookAPI.Domain;

namespace StudentAPI.Domain.ViewModels
{
    public class StudentListModel
    {
        public List<Student> Students { get; set; }
        public int Count { get; set; }
        //public int PageIndex { get; set; }
        //public int PageSize { get; set; }
        //public int TotalPage { get; set; }
    }
}
