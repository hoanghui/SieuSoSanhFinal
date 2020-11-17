using System;
using System.Collections.Generic;

#nullable disable

namespace SieuSoSanhAPICore.Models
{
    public partial class CategoryProperty
    {
        public int CategoryId { get; set; }
        public int PropertyId { get; set; }

        public virtual Category Category { get; set; }
        public virtual Property Property { get; set; }
    }
}
