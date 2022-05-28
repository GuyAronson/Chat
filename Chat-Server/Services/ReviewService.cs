using Chat_Server.Models;
using Chat_Server.Data;

namespace Chat_Server.Services
{
    public class ReviewService
    {
        private readonly Chat_ServerContext _context;

        //Constructor
        public ReviewService(Chat_ServerContext con)
        {
            _context = con;
        }
         
        // get all reviews
         public List<Review> GetAll()
         {
            return _context.Review.ToList();
         }

        // Get a single review by ID
        public Review Get(string id)
        {
            return GetAll().FirstOrDefault(x => x.ID == id);  
        }

        // Add a review
        public void Add(Review review)
        {
            review.ID = Utils.GenerateRandomnID();
            _context.Review.Add(review);
            _context.SaveChanges();
        }

        // edit a single review - get a new review with the *same* ID as argument and changing the objects
        public void Edit(Review review)
        {
            Review r = Get(review.ID);
            if(r!= null)
            {
                r.Author = review.Author;
                r.Feedback = review.Feedback;
                r.Rate = review.Rate;
                _context.SaveChanges();
            }
        }
        // Delete a review by ID
        public void Delete(Review review)
        {
            _context.Review.Remove(review);
            _context.SaveChanges();
        }
    }
}