using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ISV.Models
{
    public class classviewmodel
    {
        public User user { get; set; }
        public List<Role_Permission> rolelist { get; set; }
        public List<User> usernm { get; set; }
        public bool myproduct{ get; set; }     
        //public List<CompanyRecords> myproduct { get; set; }
    }
}
