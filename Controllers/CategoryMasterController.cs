using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PMS.DTOs;
using PMS.Models;
using PMS.Services;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace PMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryMasterController : Controller
    {
        private readonly CategoryMasterService _categoryMasterService;
        public CategoryMasterController(CategoryMasterService categoryMasterService)
        {
            _categoryMasterService = categoryMasterService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllCategory()
        {
            var categories = await _categoryMasterService.GetAllCategoryAsync();
            return Ok(categories);
        }


        [HttpGet("GetCategoryById/{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            var category = await _categoryMasterService.GetCategoryByIdAsync(id);
            if (category == null)
                return NotFound();
            return Ok(category);
        }

        [HttpPost]
        public async Task<IActionResult> AddCategory(CategoryMaster category)
        {
            await _categoryMasterService.AddCategoryAsync(category);
            return CreatedAtAction(nameof(GetCategoryById), new { id = category.CategoryId }, category);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateCategory(int id, [FromBody] CategoryMaster category)
        {
            if (id != category.CategoryId)
                return BadRequest();

            _categoryMasterService.UpdateCategory(category);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCategory(int id)
        {
            var category = _categoryMasterService.GetCategoryByIdAsync(id).Result;
            if (category == null)
                return NotFound();

            _categoryMasterService.DeleteCategory(category);
            return NoContent();
        }

        [HttpGet("GetDropdownOptions")]
        public async Task<IActionResult> GetDropdownOptions()
        {
            // Retrieve all categories
            var options = await _categoryMasterService.GetAllCategoryAsync(); 

            // Check if options are null or empty
            if (options == null || !options.Any())
            {
                return Ok(new List<DropdownOption>()); // Return an empty list if no options
            }

            // Map categories to dropdown options
            var dropdownOptions = options.Select(option => new DropdownOption
            {
                Id = option.CategoryId,    // Assuming CategoryId is the identifier property
                Name = option.CategoryName // Assuming CategoryName is the display name property
            }).ToList();

            // Return the dropdown options
            return Ok(dropdownOptions);
        }

    }
}
