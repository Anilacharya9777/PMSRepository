using System.ComponentModel.DataAnnotations.Schema;

namespace PMS.DTOs
{
    //public class ListProductDetailsByBarcodeDtos
    //{
    //   public List<ProductDetailsByBarcodeDtos> productDetailsByBarcodeDtos { get; set; }
    //}
    public class ProductDetailsByBarcodeDtos
    {
        [Column("Product_Id")]
        public int? ProductId { get; set; }
        
        [Column("Barcode_No")]
        public string BarcodeNo { get; set; }
        [Column("Product_Type")]
        public string? ProductType { get; set; }
        [Column("Product_Name")]
        public string? ProductName { get; set; }
        [NotMapped]
        [Column("Perchase_Quantity")]
        public int PerchaseQuantity { get; set; }
        [Column("Rack_No")]
        public string? RackNo { get; set; }
        [Column("Shelf_No")]
        public string? ShelfNo { get; set; }
        [Column("Selling_Quantity")]
        public int? SellingQuantity { get; set; }
        [Column("Selling_Price")]
        public decimal? SellingPrice { get; set; }
    }
}
