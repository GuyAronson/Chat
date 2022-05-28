using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Design;
using Newtonsoft.Json;
using Chat_Server.Services;
using Chat_Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class contactsController : Controller
    {
        private UserService _userService;
        private ChatService _chatService;

        public contactsController(UserService userserv, ChatService chatserv)
        {
            _userService = userserv;
            _chatService = chatserv;
        }

        [HttpGet]
        [Route("users")]
        public IActionResult GetAll()
        {
            return Ok(JsonConvert.SerializeObject(_userService.GetAll()));
        }

        [HttpGet]
        // api/contacts GET
        public IActionResult Index(string currentUser)
        {
            // get the username of the logged user
            //string currentUser = HttpContext.Session.GetString("username");
            if (currentUser == null)
                return NotFound();
            var contacts = _userService.GetAllContacts(currentUser);
            if(contacts == null)
                return NotFound();
            return Ok(JsonConvert.SerializeObject(contacts));
        }

        [HttpPost]
        // api/contacts POST - create new contact
        public IActionResult Index(string currentUser, [Bind("username, nickname, ServerAddress")] Partner partner)
        {
            if (currentUser == null)
                return NotFound();

            _userService.AddContact(currentUser, partner);
            return Ok();
        }

        // Get the user credentials api/contacts/{id}
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetContact(string currentUser, string id)
        {
            // id is contactID
            if (currentUser == null)
                return NotFound();
            var contact = _userService.GetContact(currentUser, id);
            if (contact == null)
                return NotFound();
            return Ok(JsonConvert.SerializeObject(contact));
        }

        // Edit the user credentials api/contacts/:id
        [HttpPut]
        [Route("{id}")]
        public IActionResult EditContact(string currentUser, string id, [Bind("username, nickname, ServerAddress")] Partner partner)
        {
            if (currentUser == null || id == null)
                return NotFound();

            partner.Username = id;
            // Checks if the contact exist  
            if (!_userService.UserExists(currentUser) || !_userService.ContactExists(currentUser, id))
                return NotFound();

            _userService.EditContact(currentUser, partner);
            return Ok();
        }

        [HttpDelete]
        [Route("{id}")]     // api/contacts/{id} DELETE
        public IActionResult DeleteContact(string currentUser, string id)
        {
            if (!_userService.UserExists(currentUser) || !_userService.ContactExists(currentUser, id))
                return NotFound();
            _userService.DeleteContact(currentUser, id);
            return Ok();
        }

        [HttpGet]
        [Route("{id}/messages")]    // api/contacts/{id}/messages GET
        // Getting all messages between user and contact
        public IActionResult GetMessages(string currentUser, string id)
        {
            if (!_userService.UserExists(currentUser) || !_userService.ContactExists(currentUser, id))
                return NotFound();

            return Ok(JsonConvert.SerializeObject(_userService.GetAllMessages(currentUser, id)));
        }

        [HttpPost]
        [Route("{id}/messages")] // api/contacts/{id}/messages POST
        // Adding a new message to the chat
        public IActionResult AddMessage(string currentUser, string id, string data)
        {
            if (!_userService.UserExists(currentUser) || !_userService.ContactExists(currentUser, id))
                return NotFound();

            _userService.AddMessage(currentUser, id, currentUser, data);

            return Ok();
        }

        [HttpGet]
        [Route("{id}/messages/{id2}")]  // api/contacts/{id}/messages/{id2} GET
        // Get the message with id equal to id2 from chat with user equal to id
        public IActionResult GetMessageByContact(string currentUser, string id, string id2)
        {
            if (!_userService.UserExists(currentUser) || !_userService.ContactExists(currentUser, id))
                return NotFound();

            return Ok(JsonConvert.SerializeObject(_userService.GetMessageByContact(currentUser, id, id2)));
        }

        [HttpPut]
        [Route("{id}/messages/{id2}")]  // api/contacts/{id}/messages/{id2} PUT
        // Edit the message with id equal to id2 from chat with user equal to id
        public IActionResult EditMessageByContact(string currentUser, string id, string id2, string data)
        {
            if (!_userService.UserExists(currentUser) || !_userService.ContactExists(currentUser, id))
                return NotFound();

            _userService.EditMessageByContact(currentUser, id, id2, data);
            return Ok();
        }
        
        [HttpDelete]
        [Route("{id}/messages/{id2}")]  // api/contacts/{id}/messages/{id2} DELETE
        // Edit the message with id equal to id2 from chat with user equal to id
        public IActionResult DeleteMessageByContact(string currentUser, string id, string id2)
        {
            if (!_userService.UserExists(currentUser) || !_userService.ContactExists(currentUser, id))
                return NotFound();

            _userService.DeleteMessageByContact(currentUser, id, id2);
            return Ok();
        }

        [HttpGet]
        [Route("chats")]
        public IActionResult GetUserChats(string currentUser)
        {
            if (!_userService.UserExists(currentUser))
                return NotFound();

            return Ok(JsonConvert.SerializeObject(_chatService.GetUserChats(currentUser)));
        }
    }
}
