using System;
using System.Collections.Generic;

namespace PMS.Models
{
    public partial class ProductTypeMaster
    {
        public ProductTypeMaster()
        {
            ProductMasters = new HashSet<ProductMaster>();
        }

        public int ProductTypeId { get; set; }
        public int? BrandId { get; set; }
        public string? ProductType { get; set; }
        public bool? IsActive { get; set; }

        public virtual BrandMaster? Brand { get; set; }
        public virtual ICollection<ProductMaster> ProductMasters { get; set; }
    }
}
