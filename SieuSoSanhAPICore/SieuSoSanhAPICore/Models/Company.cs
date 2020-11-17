using System;
using System.Collections.Generic;

#nullable disable

namespace SieuSoSanhAPICore.Models
{
    public partial class Company
    {
        public Company()
        {
            Products = new HashSet<Product>();
        }

        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string CompanyImage { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}
