using PMS.DTOs;
using PMS.Models;
using PMS.Repository;

namespace PMS.Services
{
    public class ProductMasterService
    {
        private readonly IRepository<ProductMaster> _repository;
        public ProductMasterService(IRepository<ProductMaster> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ProductDetails>> Sp_GetProductsDetailsAsync()
        {
            //var storedProcedure = "EXEC SP_GetProductDetails";
            
            //return await _repository.ExecuteStoredProcedureAsync<ProductDetails>(storedProcedure);
            string storedProcedure = "EXEC SP_GetProductDetails";
            var parameters = new object[] { };

            var brandDetails = await _repository.ExecuteStoredProcedureAsync<ProductDetails>(storedProcedure, parameters);
            return brandDetails.ToList();
        }

        public async Task<IEnumerable<ProductMaster>> GetAllProductsAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<ProductMaster> GetProductByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddProductAsync(ProductMaster model)
        {
            await _repository.AddAsync(model);
        }

        public void UpdateProduct(ProductMaster model)
        {
            _repository.Update(model);
        }

        public void DeleteProduct(ProductMaster model)
        {
            _repository.Delete(model);
        }

        public async Task<IEnumerable<ProductMaster>> GetProductsByTypeIdAsync(int typeId)
        {
            return await _repository.GetWithIncludeAsync(
                o => o.ProductTypeId == typeId//,
                //o => o.Category
            );
        }

    }
}
