using System;
using System.Collections.Generic;

namespace PMS.Models
{
    public partial class BrandMaster
    {
        public BrandMaster()
        {
            ProductTypeMasters = new HashSet<ProductTypeMaster>();
        }

        public int BrandId { get; set; }
        public int? CategoryId { get; set; }
        public string? BrandName { get; set; }
        public bool? IsActive { get; set; }

        public virtual CategoryMaster? Category { get; set; }
        public virtual ICollection<ProductTypeMaster> ProductTypeMasters { get; set; }
    }
}
