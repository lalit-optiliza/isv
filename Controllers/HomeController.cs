using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ISV.Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Data;

namespace ISV.Controllers
{ 
    //for complex object session
    public static class SessionExtensions
    {
        public static void SetObjectAsJson(this ISession session, string key, object value)
        {
            session.SetString(key, JsonConvert.SerializeObject(value));
        }

        public static T GetObjectFromJson<T>(this ISession session, string key)
        {
            var value = session.GetString(key);
                        
            return value == null ? default(T) : JsonConvert.DeserializeObject<T>(value);
        }
    }
    public class HomeController : Controller
    {           
        public IActionResult Index()
        {
            //TempData["name"] = null;
            classviewmodel cv = new classviewmodel();
            var value = HttpContext.Session.GetObjectFromJson<List<Role_Permission>>("role1");
            cv.rolelist = value;
            return View(cv);
        }        
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
         //Registration of new user
        [HttpGet]
        public IActionResult SignUp() {
            return View();
        }
        [HttpPost]
        public IActionResult SignUp(IFormCollection fr) 
        {
            ISVContext context = HttpContext.RequestServices.GetService(typeof(ISV.Models.ISVContext)) as ISVContext;
            User u = new User();
            u.Username = fr["email"].ToString();
            u.Password = fr["psw"].ToString();
            u.company_name = fr["company_name"].ToString();
            bool result = context.Adduser(u);
            if (result)
            {
                return View("Index");
            }
            else
                return View("Index");
        }
         //Account Activate link
        public ActionResult ActiveAccount(string activeaccount)
        {
            ISVContext context = HttpContext.RequestServices.GetService(typeof(ISV.Models.ISVContext)) as ISVContext;
            bool result = context.ActivateUser(activeaccount);
            if (result)
            { return View("Login"); }
            return View("Index");
        }
        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Login(IFormCollection fr)
        {
            ISVContext context = HttpContext.RequestServices.GetService(typeof(ISV.Models.ISVContext)) as ISVContext;
            classviewmodel cv = new classviewmodel();
            User u = new User();
            CompanyRecords cr = new CompanyRecords();
            u.Username = fr["uname"].ToString();
            u.Password = fr["psw"].ToString();            
            cv.rolelist = context.loguser(u);
            List<Role_Permission> role1 = cv.rolelist;          
            HttpContext.Session.SetObjectAsJson("role1", role1);
            cv.usernm = context.getuserid(u);
            List<User> userid = cv.usernm;
            HttpContext.Session.SetObjectAsJson("userid", userid);
            cv.myproduct = context.myproduct(cv);
            //HttpContext.Session.SetObjectAsJson("mypro",cv.myproduct);
            //Session["mypro"] = cv.myproduct;
            //var count = cv.myproduct.Count();
            var mypro = cv.myproduct.ToString();
            HttpContext.Session.SetString("mypro", mypro);
            //List<CompanyRecords> myproduct = cv.myproduct;
            if (cv.rolelist != null)
            {
                HttpContext.Session.SetString("username", u.Username);                
                return View("index",cv);
            }           
            else {
                ModelState.AddModelError("Error", "Your username or password was incorrect.");
                return View("Login");
            }            
        }
        public ActionResult LogOff()
        {
            classviewmodel cv = new classviewmodel();            
            HttpContext.Session.Remove("username");
            HttpContext.Session.Remove("mypro");            
            return View("Index", cv);
        }
        //Userprofile
        [HttpGet]
        public ActionResult UserProfile()
        {
            classviewmodel cv = new classviewmodel();
            var value = HttpContext.Session.GetObjectFromJson<List<Role_Permission>>("role1");
            cv.rolelist = value;                      
            return View(cv);
        }
        //Add Products
        public ActionResult AddProduct()
        {
            classviewmodel cv = new classviewmodel();
            var value = HttpContext.Session.GetObjectFromJson<List<Role_Permission>>("role1");
            cv.rolelist = value;
            return View(cv);
        }
        [HttpPost]
        public ActionResult AddProduct(IFormCollection fr)
        {
            ISVContext context = HttpContext.RequestServices.GetService(typeof(ISV.Models.ISVContext)) as ISVContext;
            classviewmodel cv = new classviewmodel();
            CompanyRecords cr = new CompanyRecords();
            var value = HttpContext.Session.GetObjectFromJson<List<Role_Permission>>("role1");
            cv.rolelist = value;
            var usernm = HttpContext.Session.GetObjectFromJson<List<User>>("userid");
            cv.usernm = usernm;
            
            cr.product_name = fr["product_name"].ToString();
            cr.Keywords = fr["Keywords"].ToString();
            cr.description = fr["pr_descr"].ToString();
            cr.category = fr["Category"].ToString();
            cr.modules = fr["module"].ToString();
            cr.features = fr["features"].ToString();
            cr.metatags = fr["meta_tag"].ToString();
            cr.geographical_focus = fr["geographical_focus"].ToString();
            cr.target_job_titles = fr["target_job_titles"].ToString();
            cr.target_industry_type = fr["target_company_type"].ToString();
            cr.target_campany_size = fr["target_campany_size"].ToString();
            cr.dept_user_type = fr["dep_user_type"].ToString();
            cr.semantic = fr["semantic"].ToString();
            cr.cognitive = fr["cognitive"].ToString();
            //cr.pricing = Int32.Parse(fr["pricing"]);
            //cr.pricing = fr["pricing"].ToString();
            
            //var usernm = HttpContext.Session.GetString("username");
            var result = context.SaveProduct(cr,cv);
            if (usernm == null)
            {
                //RedirectToAction("SignUp");
                //return this.SignUp();
                return View("SignUp");
            }
            ViewBag.Message = string.Format("Product Added Successfully");
            //return View("Index",cv);
            //return this.MyProduct();
            //cv.myproduct = context.myproduct(cv);
            //var mypro = "True";
            //var mypro = cv.myproduct.ToString();
            //HttpContext.Session.SetString("mypro", mypro);
            //return View("MyProduct", cv);
            return RedirectToAction("MyProduct");
        }
        public ActionResult Products(string search,string id)
        {
            ISVContext context = HttpContext.RequestServices.GetService(typeof(ISV.Models.ISVContext)) as ISVContext;
            classviewmodel cv = new classviewmodel();
            List<CompanyRecords> a = context.GetProducts(search,id);
            ViewBag.category = a;
            ViewBag.count = a.Count();
            //HttpContext.Session.SetObjectAsJson("product", a);
            var value = HttpContext.Session.GetObjectFromJson<List<Role_Permission>>("role1");
            cv.rolelist = value;
            return View(cv);
        }
        public ActionResult MyProduct()
        {
            ISVContext context = HttpContext.RequestServices.GetService(typeof(ISV.Models.ISVContext)) as ISVContext;
            classviewmodel cv = new classviewmodel();
            var value = HttpContext.Session.GetObjectFromJson<List<Role_Permission>>("role1");
            cv.rolelist = value;
            var usernm = HttpContext.Session.GetObjectFromJson<List<User>>("userid");
            cv.usernm = usernm;
            List<CompanyRecords> a = context.GetMyProduct(cv);
            ViewBag.myproduct = a;
            cv.myproduct = context.myproduct(cv);            
            var mypro = cv.myproduct.ToString();
            HttpContext.Session.SetString("mypro", mypro);
            return View(cv);
        }
        [HttpPost]
        public ActionResult MyProduct(IFormCollection fr)
        {
            ISVContext context = HttpContext.RequestServices.GetService(typeof(ISV.Models.ISVContext)) as ISVContext;
            classviewmodel cv = new classviewmodel();
            CompanyRecords cr = new CompanyRecords();
            cr.id = Int32.Parse(fr["id"]);
           // cr.user_id == Int32.Parse(fr["user_id"]);
            cr.product_name = fr["product_name"].ToString();
            cr.description = fr["description"].ToString();
            cr.category = fr["Category"].ToString();
            cr.modules = fr["module"].ToString();
            cr.metatags = fr["meta_tag"].ToString();
            cr.geographical_focus = fr["geographical_focus"].ToString();
            cr.target_job_titles = fr["target_job_titles"].ToString();
            cr.target_industry_type = fr["target_company_type"].ToString();
            cr.target_campany_size = fr["target_campany_size"].ToString();
            cr.dept_user_type = fr["dep_user_type"].ToString();
            cr.semantic = fr["semantic"].ToString();
            cr.cognitive = fr["cognitive"].ToString();

            var value = HttpContext.Session.GetObjectFromJson<List<Role_Permission>>("role1");
            cv.rolelist = value;
            var usernm = HttpContext.Session.GetObjectFromJson<List<User>>("userid");
            cv.usernm = usernm;
            context.updateproduct(cr,cv);           
            List<CompanyRecords> a = context.GetMyProduct(cv);
            ViewBag.myproduct = a;
            cv.myproduct = context.myproduct(cv);
            return View(cv); 
        }
    }
}
