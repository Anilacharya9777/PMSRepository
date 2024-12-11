using PMS.DTOs;
using PMS.Models;
using PMS.Repository;

namespace PMS.Services
{
    public class ProductTypeMasterService
    {
        private readonly IRepository<ProductTypeMaster> _repository;
        public ProductTypeMasterService(IRepository<ProductTypeMaster> repository)
        {
            _repository = repository;
        }
        public async Task<IEnumerable<ProductTypeDetailsDto>> Sp_GetProductTypeDetailsAsync()
        {
            //var storedProcedure = "EXEC SP_GetBrandDetailsWithCategory";
            //return await _repository.ExecuteStoredProcedureAsync<BrandDetailsDto>(storedProcedure);
            string storedProcedure = "Call SP_GetProductTypeDetails()";
            var parameters = new object[] { };

            var productTypeDetails = await _repository.ExecuteStoredProcedureAsync<ProductTypeDetailsDto>(storedProcedure, parameters);
            return productTypeDetails.ToList();
        }

        public async Task<IEnumerable<ProductTypeMaster>> GetAllProductTypeAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<ProductTypeMaster> GetProductTypeByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddProductTypeAsync(ProductTypeMaster model)
        {
            await _repository.AddAsync(model);
        }

        public void UpdateProductType(ProductTypeMaster model)
        {
            _repository.Update(model);
        }

        public void DeleteProductType(ProductTypeMaster model)
        {
            _repository.Delete(model);
        }
        public async Task<IEnumerable<ProductTypeMaster>> GetProductTypeByBrandIdAsync(int brandId)
        {
            return await _repository.GetWithIncludeAsync(
                o => o.BrandId == brandId//,
                //o => o.Category
            );
        }
    }
}
