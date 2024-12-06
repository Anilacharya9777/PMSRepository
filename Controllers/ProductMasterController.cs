using Microsoft.AspNetCore.Mvc;
using PMS.DTOs;
using PMS.Models;
using PMS.Services;

namespace PMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductMasterController : Controller
    {
        private readonly ProductMasterService _productMasterService;
        public ProductMasterController(ProductMasterService productMasterService)
        {
            _productMasterService = productMasterService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productMasterService.GetAllProductsAsync();
            return Ok(products);
        }
        [HttpGet("GetProductDetails")]
        public async Task<IActionResult> GetProductDetails()
        {
            var products = await _productMasterService.Sp_GetProductsDetailsAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _productMasterService.GetProductByIdAsync(id);
            if (product == null)
                return NotFound();
            return Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct(ProductMaster product)
        {
            await _productMasterService.AddProductAsync(product);
            return CreatedAtAction(nameof(GetProductById), new { id = product.ProductId }, product);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, ProductMaster product)
        {
            if (id != product.ProductId)
                return BadRequest();

            _productMasterService.UpdateProduct(product);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var product = _productMasterService.GetProductByIdAsync(id).Result;
            if (product == null)
                return NotFound();

            _productMasterService.DeleteProduct(product);
            return NoContent();
        }

        [HttpGet("productDetailsByTypeId/{id}")]
        public async Task<IActionResult> GetProductDetailsByTypeId(int id)
        {
            var brands = await _productMasterService.GetProductsByTypeIdAsync(id);
            // Map categories to dropdown options
            var dropdownOptions = brands.Select(option => new DropdownOption
            {
                Id = option.ProductId,    // Assuming CategoryId is the identifier property
                Name = option.ProductName // Assuming CategoryName is the display name property
            }).ToList();
            return Ok(dropdownOptions);
        }
    }
}
