using BookAPI.Domain.Models;
using BookAPI.Domain.ViewModels;
using BookAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BookAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<User>> GetUserById([FromRoute] int id)
        {
            try
            {
                User user = await _userRepository.GetUserByIdAsync(id);
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

        //[AllowAnonymous]
        //[HttpPost("Authonicate")]
        //public ActionResult<Tokens> Authonticate([FromBody] Login login)
        //{
        //    try
        //    {

        //        if (ModelState.IsValid)
        //        {
        //            var tocken = _userRepository.Authonticate(login);
        //            if (tocken == null)
        //            {
        //                return BadRequest("Invalid email or password");
        //            }
        //            return Ok(tocken);
        //        }
        //        else
        //        {
        //            return BadRequest(ModelState);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        [HttpPost("ValidateUser")]
        public async Task<ActionResult<User>> ValidateUser([FromBody] Login login)
        {
            try
            {

                if (ModelState.IsValid)
                {
                    User user = await _userRepository.ValidateUserAsync(login);
                    if (user == null)
                    {
                        return BadRequest("Invalid email or password");
                    }
                    return Ok(JsonConvert.SerializeObject(user));
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
                    return Ok("user updates successfully");
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
    }
}
