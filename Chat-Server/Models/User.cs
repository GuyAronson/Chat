using System.ComponentModel.DataAnnotations;

namespace Chat_Server.Models
{
    public class User
    {
        [Key]
        public string Username { get; set; }

        public string Email { get; set; }
        
        public string Password{ get; set; }

        public string Nickname { get; set; }

        //public string? Picture { get; set; }
        public List<Chat> Chats{ get; set; }

        public User(string username, string email, string password, string nickname)
        {
            Username = username;
            Email = email;
            Nickname = nickname;
            Password = password;
            Chats = new List<Chat>();
        }
    }
}
