using Lab23_TruongBaoQuan.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Lab23_TruongBaoQuan.Controllers
{
    public class BookController : Controller
    {
        // GET: Book
        public string HelloTeacher(string university)
        {
            return "Hello Truong Bao Quan - University" + university;
        }
        public ActionResult ListBook()
        {
            var books = new List<string>();
            books.Add("HTML5 & CSS3 The complete Manual - Author Name Book 1");
            books.Add("HTML5 & CSS Responsive web Design  cookbook - Author Name Book 2");
            books.Add("Professional ASP.NET MVC5 - Author Name Book 2 ");
            ViewBag.Books = books;
            return View();
        }
        public ActionResult ListBookModel()
        {
            var books = new List<Book>();
            books.Add(new Book(1, "The King of Drugs", "Noa Barrett","/Content/Images/book1cover.jpg"));
            books.Add(new Book(2, "The Imperfections of Memory", "Author Name Book 2","/Content/Images/book2cover.jpg"));
            books.Add(new Book(3, "The Crying Book", "Author Name Book 2","/Content/Images/book3cover.jpg"));
            return View(books);
        }
    }
}