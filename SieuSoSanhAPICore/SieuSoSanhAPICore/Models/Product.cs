using System;
using System.Collections.Generic;

#nullable disable

namespace SieuSoSanhAPICore.Models
{
    public partial class Product
    {
        public Product()
        {
            ProductProperties = new HashSet<ProductProperty>();
        }

        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int? Price { get; set; }
        public string HyperLink { get; set; }
        public string LinkOfProductImage { get; set; }
        public int? CategoryId { get; set; }
        public int? CompanyId { get; set; }
        public int? SupplierId { get; set; }

        public virtual Category Category { get; set; }
        public virtual Company Company { get; set; }
        public virtual Supplier Supplier { get; set; }
        public virtual ICollection<ProductProperty> ProductProperties { get; set; }
    }
}
