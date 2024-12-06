using System;
using System.Collections.Generic;

namespace PMS.Models
{
    public partial class ProductQuantityLog
    {
        public int LogId { get; set; }
        public int? ProductId { get; set; }
        public int? PreviousQuantity { get; set; }
        public int? TransactionQuantity { get; set; }
        public int? AvailableQuantity { get; set; }
        public string? TransactionType { get; set; }
        public DateTime? TransactionDate { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual ProductMaster? Product { get; set; }
    }
}
