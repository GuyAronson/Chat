using Chat_Server.Models;
using Chat_Server.Data;
using Microsoft.EntityFrameworkCore;

namespace Chat_Server.Services
{
    public class ChatService
    {
        private readonly Chat_ServerContext _context;

        public ChatService(Chat_ServerContext context)
        {
            _context = context;
        }
        //Returns all users list
        public List<Chat> GetAll()
        {
            //List<Chat> a = _context.Chat.Include(chat=>chat.User)
            //                            .Include(chat=>chat.Partner).ToList();
            return _context.Chat.Include(chat=> chat.Messages).ToList();
        }

        // Get user by username - returns null if does not exist
        public Chat Get(string id)
        {
            return _context.Chat.FirstOrDefault(c => c.ID == id);
        }

        public void Create(Chat chat)
        {
            // Check if works
            _context.Chat.Add(chat);
            _context.SaveChangesAsync();
        }

        public void Edit(Chat chat)
        {
            // Check if works
            _context.Chat.Update(chat);
            _context.SaveChangesAsync();
        }

        public void Delete(Chat chat)
        { //userID is username
            _context.Chat.Remove(chat);
            _context.SaveChangesAsync();
        }

        // Checks if chat exists by id
        public bool ChatExists(string id)
        {
            return (_context.Chat?.Any(e => e.ID == id)).GetValueOrDefault();
        }

        // Checks if chat exists by username & partner
        public bool ChatExists(string username, string partner)
        {
            return (_context.Chat?.Any(e => e.UserID == username && e.PartnerID == partner))
                                                                        .GetValueOrDefault();
        }

        // Get specific chat between 2 users
        public Chat GetByUsers(string username1, string username2)
        {
            return _context.Chat.FirstOrDefault(chat => (chat.User.Username == username1 && chat.Partner.Username == username2)
                                     || (chat.User.Username == username2 && chat.Partner.Username == username1));
        }
        // Get all user chats
        public List<Chat> GetUserChats(string username)
        {
            var userChats = _context.Chat.Include(chat => chat.Messages).Include(chat => chat.Partner).ToList().FindAll(chat => chat.UserID == username);
            foreach (var chat in userChats)
            {
                chat.Messages.Sort((msg1, msg2) => DateTime.Compare(msg1.Time, msg2.Time));
            }

            return userChats;

        }

        // Function gets chatID and msg and adds the msg to the chat
        public void AddMessage(string chatID, Message msg)
        {
            Chat chat = Get(chatID);
            if (chat != null) chat.Messages.Add(msg);
        }
    }
}