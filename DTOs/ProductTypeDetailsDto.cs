using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace PMS.DTOs
{
    [Keyless]
    public class ProductTypeDetailsDto
    {
        [Column("Product_Type_Id")]
        public int ProductTypeId { get; set; }
        [Column("Brand_Id")]
        public int BrandId { get; set; }
        [Column("Category_Id")]
        public int CategoryId { get; set; }
        [Column("Brand_Name")]
        public string? BrandName { get; set; }
        [Column("Product_Type")]
        public string? ProductType { get; set; }
        [Column("IsActive")]
        public bool? IsActive { get; set; }
       
        [Column("Category_Name")]
        public string? CategoryName { get; set; }
    }
}
