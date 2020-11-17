using System;
using System.Collections.Generic;

#nullable disable

namespace SieuSoSanhAPICore.Models
{
    public partial class ProductProperty
    {
        public int ProductId { get; set; }
        public int PropertyId { get; set; }
        public string ValueAsString { get; set; }

        public virtual Product Product { get; set; }
        public virtual Property Property { get; set; }
    }
}
