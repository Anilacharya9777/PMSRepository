using Microsoft.AspNetCore.Mvc;
using PMS.DTOs;
using PMS.Models;
using PMS.Services;

namespace PMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductTypeMasterController : Controller
    {
        private readonly ProductTypeMasterService _productTypeMasterService;
        public ProductTypeMasterController(ProductTypeMasterService productTypeMasterService)
        {
            _productTypeMasterService = productTypeMasterService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllProductType()
        {
            var productTypes = await _productTypeMasterService.GetAllProductTypeAsync();
            return Ok(productTypes);
        }
        [HttpGet("GetProductTypeDetails")]
        public async Task<IActionResult> GetProductTypeDetails()
        {
            var products = await _productTypeMasterService.Sp_GetProductTypeDetailsAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductTypeById(int id)
        {
            var productType = await _productTypeMasterService.GetProductTypeByIdAsync(id);
            if (productType == null)
                return NotFound();
            return Ok(productType);
        }

        [HttpPost]
        public async Task<IActionResult> AddProductType(ProductTypeMaster productType)
        {
            await _productTypeMasterService.AddProductTypeAsync(productType);
            return CreatedAtAction(nameof(GetProductTypeById), new { id = productType.ProductTypeId }, productType);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProductType(int id, ProductTypeMaster productType)
        {
            if (id != productType.ProductTypeId)
                return BadRequest();

            _productTypeMasterService.UpdateProductType(productType);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProductType(int id)
        {
            var productType = _productTypeMasterService.GetProductTypeByIdAsync(id).Result;
            if (productType == null)
                return NotFound();

            _productTypeMasterService.DeleteProductType(productType);
            return NoContent();
        }

        [HttpGet("ProductTypeDetailsByBrandId/{id}")]
        public async Task<IActionResult> ProductTypeDetailsByBrandId(int id)
        {
            var brands = await _productTypeMasterService.GetProductTypeByBrandIdAsync(id);
            // Map categories to dropdown options
            var dropdownOptions = brands.Select(option => new DropdownOption
            {
                Id = option.ProductTypeId,    // Assuming CategoryId is the identifier property
                Name = option.ProductType // Assuming CategoryName is the display name property
            }).ToList();
            return Ok(dropdownOptions);
        }
    }
}
