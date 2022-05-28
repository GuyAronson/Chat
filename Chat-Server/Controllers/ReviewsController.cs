#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Chat_Server.Models;
using Chat_Server.Services;

namespace Chat_Server.Controllers
{
    //[ApiController]
    //[Route("Review")]
    public class ReviewsController : Controller
    {
        private ReviewService _service;
        static double _average;
        public ReviewsController(ReviewService service)
        {
            _service = service;
        }

        [HttpGet]
        // GET: Reviews
        public async Task<IActionResult> Index()
        {
            _average = GetAverageRates();
            ViewBag.avg = _average;
            return View(_service.GetAll());
        }

        [HttpPost]
        public async Task<IActionResult> Index(string query)
        {
            /*var q = from review in _context.Review
                    where review.Author.Contains(query)
                            || review.Feedback.Contains(query)
                    select review;
            var q = _context.Review.Where(review => review.Author.Contains(query)
                                                || review.Feedback.Contains(query));*/

            if (query == null)
                query = "";

            var allReviews = _service.GetAll();
            var reviews = allReviews.FindAll(review =>
                                    review.Author.ToLower().Contains(query.ToLower())
                                    || review.Feedback.ToLower().Contains(query.ToLower()));
            ViewBag.avg = _average;
            return View(reviews);
        }

        // GET: Reviews/Details/5
        [HttpGet]
        [Route("Details/{id}")]
        public async Task<IActionResult> Details(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var review = _service.Get(id);
            if (review == null)
            {
                return NotFound();
            }

            return View(review);
        }

        // GET: Reviews/Create
        [HttpGet]
        [Route("Create")]
        public IActionResult Create()
        {
            return View();
        }

        // POST: Reviews/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        [HttpPost]
        [Route("Create")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Author,Feedback,Rate")] Review review)
        {
            if (ModelState.IsValid)
            {
                _service.Add(review);
                return RedirectToAction(nameof(Index));
            }
            return View(review);
        }

        [HttpGet]
        // GET: Reviews/Edit/5
        [Route("Edit/{id}")]
        public async Task<IActionResult> Edit(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var review = _service.Get(id);
            if (review == null)
            {
                return NotFound();
            }
            return View(review);
        }

        // POST: Reviews/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [Route("Edit/{id}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit([Bind("ID,Author,Feedback,Rate")] Review review)
        {
            if (ModelState.IsValid)
            { 
                if (!ReviewExists(review.ID))
                {
                    return NotFound();
                }
                else
                {
                    _service.Edit(review);
                    return RedirectToAction(nameof(Index));
                }
            }
            return View(review);
        }

        // GET: Reviews/Delete/5
        [HttpGet]
        [Route("Delete/${id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var review = _service.Get(id);
            if (review == null)
            {
                return NotFound();
            }

            return View(review);
        }

        // POST: Reviews/Delete/5
        [HttpPost, ActionName("Delete")]
        [Route("Delete/${id}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(string id)
        {
            var review = _service.Get(id);
            if(review != null)
                _service.Delete(review);

            return RedirectToAction(nameof(Index));
        }

        private bool ReviewExists(string id)
        {
            return _service.GetAll().Any(e => e.ID == id);
        }        

        private double GetAverageRates()
        {
            double average;
            int sum =0 , count = 0;
            _service.GetAll().ForEach(review =>
            {
                sum += review.Rate;
                count++;
            });
            average = (double)sum / (double)count;
            // Returning a decimal number with 1 digit after the decimal point
            return Math.Truncate(average*10)/10;
        }
    }
}
