using Microsoft.EntityFrameworkCore;

namespace PMS.DTOs
{
    [Keyless]
    public class SellingDetailsDtos
    {
        public string? BarcodeNo { get; set; }
        public int Quantity { get; set; }
        public decimal SellingPrice { get; set; }
        public string? RackNo { get; set; }
        public string? ShelfNo { get; set; }
        public string? SellingDate { get; set; }
    }
}
