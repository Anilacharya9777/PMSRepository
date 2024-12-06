using System;
using System.Collections.Generic;

namespace PMS.Models
{
    public partial class QuantityMaster
    {
        public int QuantityId { get; set; }
        public int? ProductId { get; set; }
        public int? OnhandQuantity { get; set; }
        public DateTime? LastUpdatedDate { get; set; }

        public virtual ProductMaster? Product { get; set; }
    }
}
