using Microsoft.AspNetCore.Http;
using Chat_Server.Services;
using Chat_Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Chat_Server.Hubs;
using Chat_Server.Hubs.ClientHub;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class invitationsController : Controller
    {
        private UserService _userService;
        private ChatService _chatService;
        private readonly IHubContext<ChatHub, IChatClient> _chatHub;


        public invitationsController(UserService service, ChatService service2, IHubContext<ChatHub, IChatClient> hubContext)
        {
            _userService = service;
            _chatService = service2;
            _chatHub = hubContext;
        }

        [HttpPost]  // api/invitations POST
        // Function gets a post request to create a new chat between user and remote
        // partner - contact's username, serverAdd - the contact's server address
        public ActionResult Index(string username, string partner, string serverAdd, string? nickname)
        {
            //  If user does not exist
            if (!_userService.UserExists(username))
                return NotFound();

            // If the Partner does not exist in this server - we create new Partner and a Chat
            if (!_chatService.ChatExists(username, partner))
            {
                if(nickname == null)
                    _userService.AddContact(username, new Partner(partner, partner, serverAdd));
                else
                    _userService.AddContact(username, new Partner(partner, nickname, serverAdd));
            }

            string serverAddress = "https://localhost:7000";
            _chatHub.Clients.All.ReceiveMessage(username, serverAddress);
            return Ok();
        }
    }
}
