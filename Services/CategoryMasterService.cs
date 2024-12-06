using PMS.DTOs;
using PMS.Models;
using PMS.Repository;

namespace PMS.Services
{
    public class CategoryMasterService
    {
        private readonly IRepository<CategoryMaster> _repository;
        public CategoryMasterService(IRepository<CategoryMaster> repository)
        {
            _repository = repository;
        }

        //public async Task<IEnumerable<BrandMaster>> GetProductsWithCategoriesAsync()
        //{
        //    var storedProcedure = "EXEC SP_GetProductDetails";
        //    return await _repository.ExecuteStoredProcedureAsync<BrandMaster>(storedProcedure);
        //}

        public async Task<IEnumerable<CategoryMaster>> GetAllCategoryAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<CategoryMaster> GetCategoryByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddCategoryAsync(CategoryMaster model)
        {
            await _repository.AddAsync(model);
        }

        public void UpdateCategory(CategoryMaster model)
        {
            _repository.Update(model);
        }

        public void DeleteCategory(CategoryMaster model)
        {
            _repository.Delete(model);
        }

      
    }
}
