using BookAPI.Domain.Models;
using BookAPI.Domain.ViewModels;
using BookAPI.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BookAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ICRUDRepository<User> _crudRepository;

        public UserController(IUserRepository userRepository, ICRUDRepository<User> crudRepository)
        {
            _userRepository = userRepository;
            _crudRepository = crudRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetBooks()
        {
            try
            {
                IEnumerable<User> users = await _crudRepository.GetAllAsync();
                return Ok(JsonConvert.SerializeObject(users));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<User>> GetUserById([FromRoute] int id)
        {
            try
            {
                User user = await _crudRepository.GetByIdAsync(id);
                if (user == null)
                {
                    return NotFound("User not found");
                }
                return Ok(JsonConvert.SerializeObject(user));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost("Authenticate")]
        public ActionResult<Tokens> Authonticate([FromBody] Login login)
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var tocken = _userRepository.Authenticate(login);
                    if (tocken == null)
                    {
                        return BadRequest("Invalid email or password");
                    }
                    return Ok(JsonConvert.SerializeObject(tocken));
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

        [AllowAnonymous]
        [HttpPost("RegisterUser")]
        public async Task<ActionResult<User>> RegisterUser([FromBody] User user)
        {
            try
            {

                if (ModelState.IsValid)
                {
                    int result = await _userRepository.RegisterUserAsync(user);
                    if (result == 0)
                    {
                        return BadRequest("user doesn't registered successfully");
                    }
                    return Ok("user registered successfully");
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Duplicate entry"))
                {
                    return StatusCode(409, "email already exist");
                }
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("UpdateUser")]
        public async Task<ActionResult<User>> UpdateUser([FromBody] User user)
        {
            try
            {

                if (ModelState.IsValid)
                {
                    int result = await _userRepository.UpdateUserAsync(user);
                    if (result == 0)
                    {
                        return BadRequest("user doesn't updated successfully");
                    }
                    return Ok("user updated successfully");
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Duplicate entry"))
                {
                    return StatusCode(409, "email already exist");
                }
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<string>> DeleteUser([FromRoute] int id)
        {
            try
            {
                int result = await _crudRepository.DeleteAsync(id);
                if (result == 0)
                {
                    return BadRequest("user dosen't deleted successfully");
                }
                return Ok("user deleted successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
