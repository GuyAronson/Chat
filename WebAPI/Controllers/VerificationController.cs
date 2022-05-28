using Microsoft.AspNetCore.Mvc;
using Chat_Server.Services;
using Chat_Server.Models;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api")]
    public class verificationController : Controller
    {
        UserService _userService;

        public verificationController(UserService service1)
        {
            _userService = service1;
        }

        [HttpGet]
        [Route("login")]
        public IActionResult CheckLogin(string username, string password)
        {
            if (!_userService.QueryUserName(username) || _userService.QueryPassword(username, password))
                return NotFound();

            return Ok(true);
        }

        [HttpPost]
        [Route("register")]
        public IActionResult Register(string username, string nickname, string password, string email)
        {
            _userService.Create(new User(username, nickname, password, email));
            return Ok();
        }
    }
}
