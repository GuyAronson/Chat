using Chat_Server.Models;
using Chat_Server.Data;
using Microsoft.EntityFrameworkCore;

namespace Chat_Server.Services
{
    public class UserService
    {
        private readonly Chat_ServerContext _context;

        public UserService(Chat_ServerContext context)
        {
            _context = context;
        }
        //Returns all users list
        public List<User> GetAll()
        {
            return _context.User.ToList();
        }

        // Get user by username - returns null if does not exist
        public User Get(string username)
        {
            return _context.User.FirstOrDefault(m => m.Username == username);
        }

        // Create new user
        public void Create(User user)
        {
            _context.User.Add(user);
            _context.SaveChanges();
        }

        // Edit current user
        public void Edit(User user)
        {
            _context.Update(user);
            _context.SaveChanges();
        }

        // Delete the current user
        public void Delete(User user)
        { //userID is username
            _context.User.Remove(user);
            _context.SaveChanges();
        }

        // Function to query the database if the username exists
        public bool QueryUserName(string username)
        {
            User user = _context.User.Where(user => user.Username == username).FirstOrDefault();
            return (user != null) ? true : false;
        }

        // Function to query if the email exisits
        public bool QueryEmail(string email)
        {
            User user = _context.User.Where(user => user.Email == email).FirstOrDefault();
            return (user != null) ? true : false;
        }

        //With a given username it returns if the password matches
        public bool QueryPassword(string password, string username)
        {
            User user = Get(username);
            return user != null ? user.Password == password : false;
        }

        /********************* Contacts *************************/

        // Get all contacts of the user given by username
        public List<Partner> GetAllContacts(string username)
        {
            /*var chats = from chat in _context.Chat
                        where chat.UserID == username
                        select chat;*/

            List<Partner> contacts = new List<Partner>();

            var chats = _context.Chat.Where(chat => chat.UserID == username)
                                    .Include(chat => chat.Partner).ToList();

            foreach (var chat in chats)
                contacts.Add(chat.Partner);

            return contacts;
        }

        // Add a contact to a user given by username
        public void AddContact(string username, Partner partner)
        {
            var isContactExists = _context.Partner.Any(contact => contact.Username == partner.Username);
            if(isContactExists == false)
                _context.Partner.Add(partner);

            CreateChat(username, partner.Username);
            _context.SaveChanges();
        }

        // Get user's contact by given contact username = ID
        public Partner GetContact(string username, string contactID)
        {
            var chat = _context.Chat
                .Where(_chat => _chat.UserID == username && _chat.PartnerID == contactID)
                .Include(_chat => _chat.Partner).FirstOrDefault();
            if(chat == null)
                return null;

            return chat.Partner;
        }

        // Edit the contact cerdentials in the user
        public void EditContact(string username, Partner partner)
        {

            var contact = _context.Partner.Find(partner.Username);
            if (contact != null)
            {
                contact.ServerAddress = partner.ServerAddress;
                contact.Nickname = partner.Nickname;
                _context.SaveChanges();
            }
        }
        // Delete a contact from the user by contact-username
        public void DeleteContact(string username, string contactID)
        {
            var chat = GetChat(username, contactID);
            _context.Chat.Remove(chat);
            var contact = _context.Partner.Where(partner => partner.Username == contactID).FirstOrDefault();
            if(contact != null)
                _context.Partner.Remove(contact);
            _context.SaveChanges();
        }
        // Checks if user exists in the DB
        public bool UserExists(string username)
        {
            return (_context.User?.Any(e => e.Username == username)).GetValueOrDefault();
        }
        // Checks if a user has a specific contact
        public bool ContactExists(string username, string contactID)
        {
            return GetContact(username, contactID) == null ? false : true;
        }
        // function checks if the partner exists - returns false if the partner does not exist
        public bool PartnerExists(string partnerUsername)
        {
            return _context.Partner.Find(partnerUsername) != null;
        }
        //Function to check login credentials
        public bool loginTest(string username, string password)
        {
            return (_context.User?.Any(e => (e.Username == username && e.Password == password))).GetValueOrDefault();
        }

        /********************* Chats *************************/

        // get a chat by username and partnername
        public Chat GetChat(string username, string partner)
        {
            return _context.Chat.Where(chat => chat.UserID == username && chat.PartnerID == partner)
                                .FirstOrDefault();
        }

        // Create chat between existing user & partner
        public void CreateChat(string username, string partner)
        {
            _context.Chat.Add(new Chat(username, partner));
            _context.SaveChanges();
        }

        /********************* Messages *************************/

        //Get all message between user and a contact
        public List<Message> GetAllMessages(string username, string partner)
        {
            var chat = GetChat(username, partner);
            var messages = _context.Message.Where(msg => msg.ChatID == chat.ID).ToList();
            messages.Sort((msg1, msg2) => DateTime.Compare(msg2.Time ,msg1.Time));
            return messages;
        }

        //Send message from user to contact
        public void AddMessage(string username, string partner, string author, string data)
        {
            var chat = GetChat(username, partner);
            Message msg = new(author, data, "text", chat.ID);
            _context.Message.Add(msg);
            _context.SaveChanges();
        }

        // Function returns a msg that its id is msgID from chat with partner
        public Message GetMessageByContact(string username, string partner, string msgID)
        {
            var chat = GetChat(username, partner);
            return _context.Message.Where(msg=> msg.ChatID == chat.ID && msg.ID == msgID).FirstOrDefault();
        }

        /* Function edit a single message from an exisitng chat between username and partner,
             whose id is msgID, data is the new text for the msg*/
        public void EditMessageByContact(string username, string partner, string msgID, string data)
        {
            var message = GetMessageByContact(username, partner, msgID);
            message.Data = data;
            _context.SaveChanges();
        }
        
        /* Function delete the message with id = msgID from the chat between partner and user*/
        public void DeleteMessageByContact(string username, string partner, string msgID)
        {
            var message = GetMessageByContact(username, partner, msgID);
            if (message != null){
                _context.Message.Remove(message);
                _context.SaveChanges();
            }
        }

    }
}


