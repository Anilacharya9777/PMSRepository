using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PMS.DTOs;
using PMS.Models;
using PMS.Services;

namespace PMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandMasterController : Controller
    {
        private readonly BrandMasterService _brandMasterService;
        public BrandMasterController(BrandMasterService brandMasterService)
        {
            _brandMasterService = brandMasterService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllBrand()
        {
            var brands = await _brandMasterService.GetAllBrandAsync();
            return Ok(brands);
        }
        [HttpGet("GetBrandDetails")]
        public async Task<IActionResult> GetBrandDetails()
        {
            var products = await _brandMasterService.Sp_GetBrandDetailsAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBrandById(int id)
        {
            var brand = await _brandMasterService.GetBrandByIdAsync(id);
            if (brand == null)
                return NotFound();
            return Ok(brand);
        }

        [HttpPost]
        public async Task<IActionResult> AddBrand(BrandMaster brand)
        {
            await _brandMasterService.AddBrandAsync(brand);
            return CreatedAtAction(nameof(GetBrandById), new { id = brand.BrandId }, brand);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateBrand(int id, BrandMaster brand)
        {
            if (id != brand.BrandId)
                return BadRequest();

            _brandMasterService.UpdateBrand(brand);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBrand(int id)
        {
            var brand = _brandMasterService.GetBrandByIdAsync(id).Result;
            if (brand == null)
                return NotFound();

            _brandMasterService.DeleteBrand(brand);
            return NoContent();
        }

        [HttpGet("GetBrandDropdownOptions")]
        public async Task<IActionResult> GetDropdownOptions()
        {
            // Retrieve all categories
            var options = await _brandMasterService.GetAllBrandAsync();

            // Check if options are null or empty
            if (options == null || !options.Any())
            {
                return Ok(new List<DropdownOption>()); // Return an empty list if no options
            }

            // Map categories to dropdown options
            var dropdownOptions = options.Select(option => new DropdownOption
            {
                Id = option.BrandId,    // Assuming CategoryId is the identifier property
                Name = option.BrandName // Assuming CategoryName is the display name property
            }).ToList();

            // Return the dropdown options
            return Ok(dropdownOptions);
        }

        [HttpGet("getBrandByCategory")]
        public async Task<IActionResult> GetBrandDetailsByParameter(string ActionType= "GetBrandByCagegory", int Category_Id=2)
        {
            var products = await _brandMasterService.Sp_GetBrandDetailsWithParameterAsync(ActionType, Category_Id);
            return Ok(products);
        }

        [HttpGet("brandDetailsByCategoryId/{id}")]
        public async Task<IActionResult> GetBrandDetailsByCategoryId(int id)
        {
            var brands = await _brandMasterService.GetBrandsByCategoryIdAsync(id);
            // Map categories to dropdown options
            var dropdownOptions = brands.Select(option => new DropdownOption
            {
                Id = option.BrandId,    // Assuming CategoryId is the identifier property
                Name = option.BrandName // Assuming CategoryName is the display name property
            }).ToList();
            return Ok(dropdownOptions);
        }
    }
}
