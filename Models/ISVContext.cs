using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace ISV.Models
{
    public class ISVContext
    {
        public string ConnectionString { get; set; }
        public ISVContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }
        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }
        //Add user
        public bool Adduser(User u)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string query = "Insert into user (username,password,status,company_name)values( @username,@password,@status,@company_name)";
                var results = conn.Execute(query, new
                {
                    u.Username,
                    u.Password,    
                    u.status,                   
                    u.company_name,
                });
                if (results > 0)
                {                       
                    User a = conn.Query<User>("SELECT * FROM user where username ='" + u.Username + "' and password ='" + u.Password + "'").FirstOrDefault();
                    SendActivationEmail(a);
                    return true;
                }
                else
                return false;
            }
        }
        //Send activation email
        private void SendActivationEmail(User userId)
        {
            string activationCode = Guid.NewGuid().ToString();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string query = "Insert into user_activation (userid,activation_code )values( @id,@activationCode )";
                var results = conn.Execute(query, new
                {
                    userId.id,
                    activationCode
                });
                MailAddress sendermail = new MailAddress("vivek@optiliza.com");
                MailAddress tomail = new MailAddress(userId.Username);
                using (MailMessage mm = new MailMessage(sendermail, tomail))
                {
                    mm.Subject = "Account Activation";
                    string body = "Hello " + userId.Username + ",";
                    body += "<br /><br />Please click the following link to activate your account";
                    body += "<br /><a href = 'http://localhost:52648/Home/ActiveAccount?activeaccount=" + activationCode + "'>Click here to activate your account.</a>";
                    body += "<br /><br />Thanks";
                    mm.Body = body;
                    mm.IsBodyHtml = true;
                    SmtpClient smtp = new SmtpClient();
                    smtp.Host = "smtpout.secureserver.net";
                    smtp.EnableSsl = false;
                    NetworkCredential NetworkCred = new NetworkCredential("vivek@optiliza.com", "vivek@123");
                    smtp.UseDefaultCredentials = true;
                    smtp.Credentials = NetworkCred;
                    smtp.Port = 80;
                    smtp.Send(mm);
                }
            }
        }
        //Activate user
        public bool ActivateUser(string activeuser)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                user_activation results = conn.Query<user_activation>("SELECT userid FROM user_activation where activation_code ='" + activeuser + "'").FirstOrDefault();
                if (results != null)
                {
                    string uid = results.userid.ToString();
                    var results1 = conn.Execute("update user set  status =true where id='" + uid + "'");
                    var results2 = conn.Execute("update user set role_id=4 where id='"+uid+"'");
                    var results3 = conn.Execute("Delete from user_activation where activation_code='" + activeuser + "' ");

                    if (results3 > 0)
                    { return true; }
                }
            }
            return false;
        }
        //User Login
        public List<Role_Permission> loguser(User u) 
        {
            using (MySqlConnection conn = GetConnection())
            {
                List<Role_Permission> resultmenu = new List<Role_Permission>();
                conn.Open();
                User results = conn.Query<User>("SELECT * FROM user where username ='" + u.Username + "' and password ='" + u.Password + "' and status=true").FirstOrDefault();
                if (results != null)
                {
                    resultmenu = GenerateMenu(results.role_id);      
                    return resultmenu;
                }
            }
            return null;
        }
        public List<Role_Permission> GenerateMenu(int role_id)
        {
            using (MySqlConnection conn = GetConnection())
            {
                //conn.Open();
                //List<Role_Permission> results = conn.Query<Role_Permission>("select tr.roles,tp.permission from roles tr" +
                //                                                                   " inner join role_permission trp on tr.id=trp.role_id inner join " +
                //                                                                   " permission_type tp on tp.id = trp.permission_id where role_id=" + role_id + "").ToList();
                List<Role_Permission> results = conn.Query<Role_Permission>("select tr.roles,tp.permission from roles tr" +
                                                                                                   " inner join role_permission trp on tr.id=trp.role_id inner join " +
                                                                                                   " permission_type tp on tp.id = trp.permission_id where role_id=" + role_id + "").ToList();
                if (results != null)
                {
                    return results;
                }
                return results;
            }
        }
        public List<User> getuserid(User u)
        {
            using (MySqlConnection conn = GetConnection())
            {
                List<User> result = new List<User>();
                conn.Open();
                //User results = conn.Query<User>("SELECT * FROM user where username ='" + u.Username + "'").ToList();
                List<User>results= conn.Query<User>("SELECT * FROM user where username ='" + u.Username + "'").ToList();
                return results;
            }
        }
//        public List<CompanyRecords> myproduct(classviewmodel cv)
        public bool myproduct(classviewmodel cv)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                var id = cv.usernm[0].id;
                CompanyRecords results = conn.Query<CompanyRecords>("select * from product where user_id='" + id + "'").FirstOrDefault();
                //List<CompanyRecords> result = conn.Query<CompanyRecords>("select count(*) from product where user_id='" + id + "'").ToList();
                if (results != null)
                {
                    return true;
                }
                return false;
                //return results;
            }
        }
        //public List<CompanyRecords> myproduct(classviewmodel cv) 
        ////public bool myproduct(classviewmodel cv)
        //{
        //    using (MySqlConnection conn = GetConnection())
        //    {
        //        conn.Open();
        //        var id = cv.usernm[0].id;
        //        //CompanyRecords results = conn.Query<CompanyRecords>("select * from product where user_id='" + id + "'").FirstOrDefault();
        //        //List<CompanyRecords> result = conn.Query<CompanyRecords>("select count(*) from product where user_id='" + id + "'").ToList();
        //        List<CompanyRecords> result = conn.Query<CompanyRecords>("select * from product where user_id='" + id + "'").ToList();
        //        if (result != null)
        //        {
        //            return result;
        //        }
        //        return result;
        //        //return results;
        //    }
        //}
        //Save products
        public bool SaveProduct(CompanyRecords cr,classviewmodel cv)
        {    
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                var id = cv.usernm[0].id;
                cr.user_id = id;
                List<User> resultmenu = new List<User>();
                CompanyRecords a = conn.Query<CompanyRecords>("SELECT * FROM product where user_id ='" + id + "' ").FirstOrDefault();
                //User a = conn.Query<User>("select * from user");
                //var usernm = HttpContext.Session.GetString("username");
                //User a = conn.Query<User>("select * from User where username='" + u.Username + "' ");
                //var usernm = cv.user;
                if (a != null)
                {
                    cr.status = true;
                    string query = "Insert into product(user_id, product_name, Keywords, category, description, modules, features, metatags, geographical_focus, target_job_titles, target_industry_type, desktop_web_both, dept_user_type, semantic, cognitive, pricing, status) " +
                                             " values( @user_id,@product_name,@Keywords,@category,@description,@modules,@features,@metatags,@geographical_focus,@target_job_titles,@target_industry_type,@desktop_web_both,@dept_user_type,@semantic,@cognitive,@pricing,@status)";
                    var results = conn.Execute(query, new
                    {
                        cr.user_id,
                        cr.product_name,
                        cr.Keywords,
                        cr.category,
                        cr.description,
                        cr.modules,
                        cr.features,
                        cr.metatags,
                        cr.geographical_focus,
                        cr.target_job_titles,
                        cr.target_industry_type,
                        cr.desktop_web_both,
                        cr.dept_user_type,
                        cr.semantic,
                        cr.cognitive,
                        cr.pricing,
                        cr.status
                    });
                    if (results > 0)
                    {
                        return true;
                    }
                }
                else
                {
                    cr.status = false;
                    string query = "Insert into product(user_id, product_name, Keywords, category, description, modules, features, metatags, geographical_focus, target_job_titles, target_industry_type, target_campany_size, desktop_web_both, dept_user_type, semantic, cognitive, pricing, status) " +
                                              " values( @user_id,@product_name,@Keywords,@category,@description,@modules,@features,@metatags,@geographical_focus,@target_job_titles,@target_industry_type, @target_campany_size, @desktop_web_both, @dept_user_type, @semantic, @cognitive, @pricing, @status)";
                    var results = conn.Execute(query, new
                    {     
                        cr.user_id,                  
                        cr.product_name,
                        cr.Keywords,
                        cr.category,
                        cr.description,
                        cr.modules,
                        cr.features,
                        cr.metatags,
                        cr.geographical_focus,
                        cr.target_job_titles,
                        cr.target_industry_type,
                        cr.target_campany_size,
                        cr.desktop_web_both,
                        cr.dept_user_type,
                        cr.semantic,
                        cr.cognitive,
                        cr.pricing,
                        cr.status
                    });
                    var results2 = conn.Execute("update user set role_id=5 where id='" + id + "'");
                    //sendproductdetails(cr);
                    if (results > 0)
                    {
                        return true;
                    }
                }
            }    
            return false;
        }
        public List<CompanyRecords> GetProducts(string data,string idd)
        {

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                List<CompanyRecords> results = conn.Query<CompanyRecords>("SELECT * FROM product WHERE category LIKE '%" + data + "%' OR Keywords LIKE '%" + data + "%' OR product_name LIKE '%" + data + "%' OR description LIKE '%" + data + "%' OR modules LIKE '%" + data + "%'OR metatags LIKE '%" + data + "%'OR geographical_focus LIKE '%" + data + "%'OR target_job_titles LIKE '%" + data + "%'OR target_industry_type LIKE '%" + data + "%'OR desktop_web_both LIKE '%" + data + "%'OR dept_user_type LIKE '%" + data + "%'OR semantic LIKE '%" + data + "%'OR cognitive LIKE '%" + data + "%'OR target_campany_size LIKE '%" + data + "%'").ToList();
                if (idd == "Category")
                {
                    //List<CompanyRecords> result = conn.Query<CompanyRecords>("SELECT * FROM product WHERE category LIKE '%" + data + "%'").ToList();
                    List<CompanyRecords> result = conn.Query<CompanyRecords>("SELECT * FROM product WHERE category LIKE '%" + data + "%'").ToList();
                    return result;
                }
                else if (idd == "Keywords")
                {
                    List<CompanyRecords> result = conn.Query<CompanyRecords>("SELECT * FROM product WHERE Keywords LIKE '%" + data + "%'").ToList();
                    return result;
                }
                else if (idd == "Modules")
                {
                    List<CompanyRecords> result = conn.Query<CompanyRecords>("SELECT * FROM product WHERE modules LIKE '%" + data + "%'").ToList();
                    return result;
                }
                else if (idd == "Features")
                {
                    List<CompanyRecords> result = conn.Query<CompanyRecords>("SELECT * FROM product WHERE features LIKE '%" + data + "%'").ToList();
                    return result;
                }
                //else if (idd == "Price") {
                //    List<CompanyRecords> result = conn.Query<CompanyRecords>("SELECT * FROM product WHERE pricing LIKE '%" + data + "%'").ToList();
                //    return result;
                //}
                return results;         
                //List<CompanyRecords> results = conn.Query<CompanyRecords>("SELECT * FROM product WHERE category LIKE '%" + data + "%'OR description LIKE '%" + data + "%' OR modules LIKE '%" + data + "%'OR metatags LIKE '%" + data + "%'OR geographical_focus LIKE '%" + data + "%'OR target_job_titles LIKE '%" + data + "%'OR target_industry_type LIKE '%" + data + "%'OR desktop_web_both LIKE '%" + data + "%'OR dept_user_type LIKE '%" + data + "%'OR semantic LIKE '%" + data + "%'OR cognitive LIKE '%" + data + "%'OR target_campany_size LIKE '%" + data + "%'").ToList();
                //if (results != null)
                //{ return results; }
                //return results;
            }  
        }
        public List<CompanyRecords> GetMyProduct(classviewmodel cv)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                var id = cv.usernm[0].id;
                List<CompanyRecords> result = conn.Query<CompanyRecords>("SELECT * FROM product where user_id ='" + id + "' ").ToList();
                return result;
            }
        }
        public bool updateproduct(CompanyRecords cr,classviewmodel cv)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                var id = cr.id;
                var userid = cv.usernm[0].id;
                cr.user_id = userid;
                //string query = "update product set(user_id, product_name, Keywords, category, description, modules, metatags, geographical_focus, target_job_titles, target_industry_type, desktop_web_both, dept_user_type, semantic, cognitive, pricing, status) " +
                //                                             " values(@user_id,@product_name,@Keywords,@category,@description,@modules,@metatags,@geographical_focus,@target_job_titles,@target_industry_type,@desktop_web_both,@dept_user_type,@semantic,@cognitive,@pricing,@status)where id='" + id + "'";

                string query = "update product set product_name='"+cr.product_name+ "', Keywords='"+ cr.Keywords + "', category='"+ cr.category + "', description='"+cr.description + "', modules='"+cr.modules + "' where id='" + id + "'";
                                                   
                var results = conn.Execute(query, new
                {
                    cr.user_id,
                    cr.product_name,
                    cr.Keywords,
                    cr.category,
                    cr.description,
                    cr.modules,
                    cr.metatags,
                    cr.geographical_focus,
                    cr.target_job_titles,
                    cr.target_industry_type,
                    cr.desktop_web_both,
                    cr.dept_user_type,
                    cr.semantic,
                    cr.cognitive,
                    cr.pricing,
                    cr.status
                });
                //var results = conn.Execute("update product set product_name=@cr.product_name where id='"+id+"'");
                if (results > 0)
                {
                    return true;
                }
                return false;
            }
        }
    }
}
