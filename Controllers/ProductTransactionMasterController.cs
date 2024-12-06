using Microsoft.AspNetCore.Mvc;
using PMS.DTOs;
using PMS.Models;
using PMS.Services;

namespace PMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductTransactionMasterController : Controller
    {
        private readonly ProductTransactionDetailsService _productTransactionDetailsService;
        public ProductTransactionMasterController(ProductTransactionDetailsService productTransactionDetailsService)
        {
            _productTransactionDetailsService = productTransactionDetailsService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllProductTransactionDetails()
        {
            var ProductTransactionDetails = await _productTransactionDetailsService.GetAllProductTransactionAsync();
            return Ok(ProductTransactionDetails);
        }
       

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductTransactionDetailsById(int id)
        {
            var brand = await _productTransactionDetailsService.GetProductTransactionByIdAsync(id);
            if (brand == null)
                return NotFound();
            return Ok(brand);
        }

        [HttpPost]
        public async Task<IActionResult> AddProductTransactionDetails(ProductTransactionDetail productTransaction)
        {
            await _productTransactionDetailsService.AddProductTransactionAsync(productTransaction);
            return CreatedAtAction(nameof(GetProductTransactionDetailsById), new { id = productTransaction.TransactionId }, productTransaction);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProductTransactionDetails(int id, ProductTransactionDetail productTransaction)
        {
            if (id != productTransaction.TransactionId)
                return BadRequest();

            _productTransactionDetailsService.UpdateProductTransaction(productTransaction);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProductTransactionDetails(int id)
        {
            var productTransaction = _productTransactionDetailsService.GetProductTransactionByIdAsync(id).Result;
            if (productTransaction == null)
                return NotFound();

            _productTransactionDetailsService.DeleteProductTransaction(productTransaction);
            return NoContent();
        }

        [HttpPost("AddProductTransactionDetailsByProductId")]
        public async Task<IActionResult> AddProductTransactionDetailsByProductId(ProductTransactionDto productTransaction)
        {
            try
            {
                ProductTransactionDetail model = new ProductTransactionDetail();
                if (productTransaction.Rows.Count > 0)
                {
                    for (int i = 0; i < productTransaction.Rows.Count; i++)
                    {
                        if (productTransaction.Rows[i].BarcodeNo != "")
                        {
                            model.ProductId = productTransaction.ProductId;
                            model.BarcodeNo = productTransaction.Rows[i].BarcodeNo;
                            model.PerchaseQuantity = Convert.ToInt32(productTransaction.Rows[i].Quantity);
                            model.ShelfNo = productTransaction.Rows[i].ShelfNo;
                            model.RackNo = productTransaction.Rows[i].RackNo;
                            model.PurchaseSellDate = Convert.ToDateTime(productTransaction.Rows[i].PurchaseDate);
                            model.TransactionDate = System.DateTime.Now;
                            model.TransactionType = "Received";
                            model.PurchasePrice = Convert.ToDecimal(productTransaction.Rows[i].PurchasePrice);
                            model.SellingPrice = Convert.ToDecimal(productTransaction.Rows[i].SellingPrice);
                            await _productTransactionDetailsService.InsertTransactionDetailsAsync(model);
                        }
                    }
                }
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
           
           
        }

        [HttpGet("GetReceivedProductTransaction")]
        public async Task<IActionResult> GetReceivedProductTransaction(string ActionType = "Received_Grid",string barcodeNo="")
        {
            var PartsDetails = await _productTransactionDetailsService.Sp_GetReceivedTransactionDetailsAsync(ActionType, barcodeNo);
            return Ok(PartsDetails);
        }

        [HttpGet("GetReceivedProductTransactionByBarcodeNo")]
        public async Task<IActionResult> GetReceivedProductTransactionByBarcodeNo(string ActionType = "GetBy_BarcodeNo", string barcodeNo = "123")
        {
            var PartsDetails = await _productTransactionDetailsService.Sp_GetTransactionDetailsByBarcodeNoAsync(ActionType, barcodeNo);
            return Ok(PartsDetails);
        }

        [HttpPost("SellingDetails")]
        public async Task<IActionResult> SellingDetails(List<SellingDetailsDtos> productTransaction)
        {
            try
            {
                List<SellingDetailsDtos> obj = new List<SellingDetailsDtos>();
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }


        }
    }
}
