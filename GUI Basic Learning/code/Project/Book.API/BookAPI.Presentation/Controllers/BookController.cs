using BookAPI.Domain.Models;
using BookAPI.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BookAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        private readonly ICRUDRepository<Book> _crudRepository;
        public BookController(IBookRepository bookRepository, ICRUDRepository<Book> crudRepository)
        {
            _bookRepository = bookRepository;
            _crudRepository = crudRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            try
            {
                IEnumerable<Book> books = await _crudRepository.GetAllAsync();
                return Ok(JsonConvert.SerializeObject(books));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Book>> GetBookById([FromRoute] int id)
        {
            try
            {
                Book book = await _crudRepository.GetByIdAsync(id);
                if (book == null)
                {
                    return NotFound("book not found");
                }
                return Ok(JsonConvert.SerializeObject(book));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<string>> AddBook([FromBody] Book book)
        {
            //Book book = JsonConvert.DeserializeObject<Book>(rowbook.ToString());
            try
            {

                if (ModelState.IsValid)
                {
                    int result = await _bookRepository.AddBookAsync(book);
                    if (result == 0)
                    {
                        return BadRequest("book dosen't added successfully");
                    }
                    return Ok("book added successfully");
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
        public async Task<ActionResult<string>> GetBookById([FromBody] Book book)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    int result = await _bookRepository.UpdateBookAsync(book);
                    if (result == 0)
                    {
                        return BadRequest("book dosen't updated successfully");
                    }
                    return Ok("book updated successfully");
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
        public async Task<ActionResult<string>> DeleteBook([FromRoute] int id)
        {
            try
            {
                int result = await _crudRepository.DeleteAsync(id);
                if (result == 0)
                {
                    return BadRequest("book dosen't deleted successfully");
                }
                return Ok("book deleted successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
