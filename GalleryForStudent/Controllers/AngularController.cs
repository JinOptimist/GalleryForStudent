using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GalleryForStudent.Controllers
{
    public class AngularController : Controller
    {
        // GET: Home
        public ActionResult Index(string url)
        {
            return View("Index");
        }
    }
}