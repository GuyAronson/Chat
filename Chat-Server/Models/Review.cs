using System.ComponentModel.DataAnnotations;

namespace Chat_Server.Models
{
    public class Review
    {
        [Key]
        public string? ID { get; set; }

        public string Author { get; set; }

        public string Feedback { get; set; }

        [Range(1, 5)]
        public int Rate { get; set; }

        public DateTime Date { get; set; }

        public Review(string author, string feedback, int rate)
        {
            ID = Utils.GenerateRandomnID();
            Date = DateTime.Now;
            Author = author;
            Feedback = feedback;
            Rate = rate;
        }
        public Review()
        {
            ID = Utils.GenerateRandomnID();
            Date = DateTime.Now;
            Author = "";
            Feedback = "";
            Rate = 0;
        }
    }
}
