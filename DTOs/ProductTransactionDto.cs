using Microsoft.EntityFrameworkCore;

namespace PMS.DTOs
{
    [Keyless]
    public class ProductTransactionDto
    {
        public int ProductId { get; set; }
        public int ProductTypeId { get; set; }
        public int BrandId { get; set; }
        public int CategoryId { get; set; }
        public List<ProductTransactionDetailsDto> Rows { get; set; }
    }
}
