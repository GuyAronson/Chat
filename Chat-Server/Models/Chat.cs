using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chat_Server.Models
{
    public class Chat
    {
        [Key]
        public string ID{ get; set; }

        public string UserID { get; set; }  // username
        public User User { get; set; }

        public string PartnerID { get; set; }   // partner username
        public Partner Partner{ get; set; }

        public List<Message> Messages { get; set; }

        public Chat(string userID, string partnerID)
        {
            ID = Utils.GenerateRandomnID();
            UserID = userID;
            PartnerID = partnerID;
            Messages = new List<Message>();
        }
        public Chat()
        {
            ID = "";
            UserID = "";
            PartnerID = "";
            Messages = new List<Message>();
        }
    }
}
