using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace PMS.DTOs
{
    [Keyless]
    public class ProductTransactionListDtos
    {
        [Column("Product_Id")]
        public int? ProductId { get; set; }
        [Column("Product_Type")]
        public string? ProductType { get; set; }
        [Column("Product_Name")]
        public string? ProductName { get; set; }
        [Column("Onhand_Quantity")]
        public int? OnhandQuantity { get; set; }
        [Column("LastUpdated_Date")]
        public DateTime? LastUpdatedDate { get; set; }
        

    }
}
