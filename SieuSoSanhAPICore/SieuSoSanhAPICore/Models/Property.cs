using System;
using System.Collections.Generic;

#nullable disable

namespace SieuSoSanhAPICore.Models
{
    public partial class Property
    {
        public Property()
        {
            CategoryProperties = new HashSet<CategoryProperty>();
            ProductProperties = new HashSet<ProductProperty>();
        }

        public int PropertyId { get; set; }
        public string PropertyName { get; set; }

        public virtual ICollection<CategoryProperty> CategoryProperties { get; set; }
        public virtual ICollection<ProductProperty> ProductProperties { get; set; }
    }
}
