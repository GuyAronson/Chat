using System.ComponentModel.DataAnnotations;

namespace Chat_Server.Models
{
    public class Partner
    {
        [Key]
        public string Username { get; set; }

        public string Nickname { get; set; }

        // This is the server address that this user belongs to
        public string ServerAddress { get; set; }
            
        public Partner(string username, string nickname, string serverAddress)
        {
            Username = username;
            Nickname = nickname;
            ServerAddress = serverAddress;
        }
        public Partner(string nickname, string serverAddress)
        {
            Nickname = nickname;
            ServerAddress = serverAddress;
        }
        public Partner()
        {
            Username = Nickname = ServerAddress = null;
        }
        public override string ToString()
        {
            return this.Username+ " : " + this.Nickname + " : " + this.ServerAddress;
        }
    }
}
