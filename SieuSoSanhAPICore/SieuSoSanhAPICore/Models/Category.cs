using System;
using System.Collections.Generic;

#nullable disable

namespace SieuSoSanhAPICore.Models
{
    public partial class Category
    {
        public Category()
        {
            CategoryProperties = new HashSet<CategoryProperty>();
            Products = new HashSet<Product>();
        }

        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string CategoryCode { get; set; }

        public virtual ICollection<CategoryProperty> CategoryProperties { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}
