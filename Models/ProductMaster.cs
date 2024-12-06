using System;
using System.Collections.Generic;

namespace PMS.Models
{
    public partial class ProductMaster
    {
        public ProductMaster()
        {
            ProductQuantityLogs = new HashSet<ProductQuantityLog>();
            ProductTransactionDetails = new HashSet<ProductTransactionDetail>();
            QuantityMasters = new HashSet<QuantityMaster>();
        }

        public int ProductId { get; set; }
        public int? ProductTypeId { get; set; }
        public string? ProductName { get; set; }
        public bool? IsActive { get; set; }

        public virtual ProductTypeMaster? ProductType { get; set; }
        public virtual ICollection<ProductQuantityLog> ProductQuantityLogs { get; set; }
        public virtual ICollection<ProductTransactionDetail> ProductTransactionDetails { get; set; }
        public virtual ICollection<QuantityMaster> QuantityMasters { get; set; }
    }
}
