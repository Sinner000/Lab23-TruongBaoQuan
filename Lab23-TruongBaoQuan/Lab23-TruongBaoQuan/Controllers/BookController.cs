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
            books.Add("The King of Drugs - Noa Barrett");
            books.Add("The Imperfections of Memory - Angelina Aludo");
            books.Add("The Crying Book - Author Name Book 2 ");
            ViewBag.Books = books;
            return View();
        }
        public ActionResult ListBookModel()
        {
            var books = new List<Book>();
            books.Add(new Book(1, "The King of Drugs", "Noa Barrett", "/Content/Images/book1cover.jpg"));
            books.Add(new Book(2, "The Imperfections of Memory", "Angelina Aludo", "/Content/Images/book2cover.jpg"));
            books.Add(new Book(3, "The Crying Book", "Heather Christel", "/Content/Images/book3cover.jpg"));
            return View(books);
        }

        public ActionResult EditBook(int id)
        {
            var books = new List<Book>();
            books.Add(new Book(1, "The King of Drugs", "Noa Barrett", "/Content/Images/book1cover.jpg"));
            books.Add(new Book(2, "The Imperfections of Memory", "Angelina Aludo", "/Content/Images/book2cover.jpg"));
            books.Add(new Book(3, "The Crying Book", "Angelina Aludo", "/Content/Images/book3cover.jpg"));
            Book book = new Book();
            foreach (Book b in books)
            {
                if (b.Id == id)
                {
                    book = b;
                    break;
                }

            }

            if (book == null)
            {
                return HttpNotFound();
            }
            return View(book);
        }

        [HttpPost, ActionName("Edit Book")]
        [ValidateAntiForgeryToken]
        public ActionResult EditBook(int id, string Title, string Author, string ImageCover)
        {
            var books = new List<Book>();
            books.Add(new Book(1, "The King of Drugs", "Noa Barrett", "/Content/Images/book1cover.jpg"));
            books.Add(new Book(2, "The Imperfections of Memory", "Angelina Aludo", "/Content/Images/book2cover.jpg"));
            books.Add(new Book(3, "The Crying Book", "Heather Christel", "/Content/Images/book3cover.jpg"));
            if (id == null)
            {
                return HttpNotFound();
            }
            foreach (Book b in books)
            {
                if (b.Id == id)
                {
                    b.Title = Title;
                    b.Author = Author;
                    b.ImageCover = ImageCover;
                    break;
                }
            }
            return View("ListBookModel", books);
        }
    }
}
