using System;
using System.Collections.Generic;

namespace PMS.Models
{
    public partial class ProductTransactionDetail
    {
        public int TransactionId { get; set; }
        public int? ProductId { get; set; }
        public string? BarcodeNo { get; set; }
        public int? PerchaseQuantity { get; set; }
        public string? ShelfNo { get; set; }
        public string? RackNo { get; set; }
        public DateTime? PurchaseSellDate { get; set; }
        public DateTime? TransactionDate { get; set; }
        public string? TransactionType { get; set; }
        public decimal? PurchasePrice { get; set; }
        public decimal? SellingPrice { get; set; }

        public virtual ProductMaster? Product { get; set; }
    }
}
