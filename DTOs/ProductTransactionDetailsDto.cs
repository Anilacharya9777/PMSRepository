using Microsoft.EntityFrameworkCore;

namespace PMS.DTOs
{
    [Keyless]
    public class ProductTransactionDetailsDto
    {
        public string BarcodeNo { get; set; }
        public string Quantity { get; set; }
        public string PurchasePrice { get; set; }
        public string SellingPrice { get; set; }
        public string RackNo { get; set; }
        public string ShelfNo { get; set; }
        public string PurchaseDate { get; set; }
    }
}
