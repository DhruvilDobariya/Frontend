using BookAPI.Domain;
using BookAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using StudentAPI.Domain.ViewModels;

namespace StudentAPI.Presentation.Controllers
{
    [Route("api/[controller]s")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentRepository _studentRepository;
        public StudentController(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        [HttpGet]
        public async Task<ActionResult<StudentListModel>> GetStudents(int startIndex = 0, int pageSize = 0, string sorting = null)
        {
            try
            {
                StudentListModel students = await _studentRepository.GetStudentsAsync(startIndex, pageSize, sorting);
                return Ok(JsonConvert.SerializeObject(students));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Student>> GetStudentById([FromRoute] int id)
        {
            try
            {
                Student student = await _studentRepository.GetStudentByIdAsync(id);
                if (student == null)
                {
                    return NotFound("student not found");
                }
                return Ok(JsonConvert.SerializeObject(student));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<string>> AddStudent([FromBody] Student student)
        {
            try
            {

                if (ModelState.IsValid)
                {
                    int result = await _studentRepository.AddStudentAsync(student);
                    if (result == 0)
                    {
                        return BadRequest("student dosen't added successfully");
                    }
                    return Ok("student added successfully");
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<string>> UpdateStudent([FromBody] Student student)
        {
            try
            {

                if (ModelState.IsValid)
                {
                    int result = await _studentRepository.UpdateStudentAsync(student);
                    if (result == 0)
                    {
                        return BadRequest("student dosen't updated successfully");
                    }
                    return Ok("student updated successfully");
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<string>> DeleteStudent([FromRoute] int id)
        {
            try
            {
                int result = await _studentRepository.DeleteStudentAsync(id);
                if (result == 0)
                {
                    return BadRequest("student dosen't deleted successfully");
                }
                return Ok("student deleted successfully");
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
