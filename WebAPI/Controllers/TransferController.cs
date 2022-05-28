using Chat_Server.Services;
using Chat_Server.Models;
using Microsoft.AspNetCore.Mvc;
using Chat_Server.Hubs;
using Chat_Server.Hubs.ClientHub;
using Microsoft.AspNetCore.SignalR;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class transferController : Controller
    {
        private UserService _userService;
        private ChatService _chatService;
        private readonly IHubContext<ChatHub, IChatClient> _chatHub;

        public transferController(UserService service, ChatService service2, IHubContext<ChatHub, IChatClient> hubContext)
        {
            _userService = service;
            _chatService = service2;
            _chatHub = hubContext;
        }

        [HttpPost]  // api/transfer POST
        // Function insert message to the chat between user&partner
        public IActionResult Index(string username, string partner, string data)
        {
            //  If user does not exist or the user does not have the contact - bad request
            if (!_userService.UserExists(username) || !_userService.ContactExists(username, partner))
                return NotFound();

            // If the user has this contact then they have a chat - add the message
            _userService.AddMessage(username, partner,partner, data);

            string serverAddress = "https://localhost:7000";
            _chatHub.Clients.All.ReceiveMessage(username, serverAddress);

            return Ok();
        }
    }
}
