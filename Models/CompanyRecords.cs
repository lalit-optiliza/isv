using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ISV.Models
{
    public class CompanyRecords
    {
        public int id { get; set; }
        public int user_id { get; set; }
        public string product_name { get; set; }
        public string Keywords { get; set; }
        public string category { get; set; }
        public string description { get; set; }
        public string modules { get; set; }
        public string features { get; set; }
        public string metatags { get; set; }
        public string geographical_focus { get; set; }
        public string target_job_titles { get; set; }
        public string target_industry_type { get; set; }
        public string target_campany_size { get; set; }
        public string desktop_web_both { get; set; }
        public string dept_user_type { get; set; }
        public string semantic { get; set; }
        public string cognitive { get; set; }
        public float pricing { get; set; }
        //[NotMapped]
        //public string pricing { get; set; }
        public bool status { get; set; }
    }
}
