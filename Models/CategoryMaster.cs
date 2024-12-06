using System;
using System.Collections.Generic;

namespace PMS.Models
{
    public partial class CategoryMaster
    {
        public CategoryMaster()
        {
            BrandMasters = new HashSet<BrandMaster>();
        }

        public int CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public bool? IsActive { get; set; }

        public virtual ICollection<BrandMaster> BrandMasters { get; set; }
    }
}
