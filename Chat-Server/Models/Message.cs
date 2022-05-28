using System.ComponentModel.DataAnnotations;

namespace Chat_Server.Models
{
    public class Message
    {
        [Key]
        public string ID { get; set; }

        public string Author{ get; set; }       // The username of the user who sent the message

        public DateTime Time{ get; set; }
        public string Data{ get; set; }

        public string Type{ get; set; }

        public string ChatID { get; set; }
        //public Chat Chat{ get; set; }

        public Message(string author, string data, string type, string chatid)
        {
            ID = Utils.GenerateRandomnID();
            Author = author;
            Data = data;
            Type = type;
            ChatID = chatid;
            Time = DateTime.Now;
        }
        public Message()
        {
            ID = Author = Data = Type = ChatID = "";
        }
    }
}
