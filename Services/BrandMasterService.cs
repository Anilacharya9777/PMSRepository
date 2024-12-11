using Microsoft.Data.SqlClient;
using PMS.DTOs;
using PMS.Models;
using PMS.Repository;

namespace PMS.Services
{
    public class BrandMasterService
    {
        private readonly IRepository<BrandMaster> _repository;
        public BrandMasterService(IRepository<BrandMaster> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<BrandDetailsDto>> Sp_GetBrandDetailsAsync()
        {
            //var storedProcedure = "EXEC SP_GetBrandDetailsWithCategory";
            //return await _repository.ExecuteStoredProcedureAsync<BrandDetailsDto>(storedProcedure);
            string storedProcedure = "call SP_GetBrandDetailsWithCategory()";
            var parameters = new object[] { };

            var brandDetails = await _repository.ExecuteStoredProcedureAsync<BrandDetailsDto>(storedProcedure, parameters);
            return brandDetails.ToList();
        }

        public async Task<IEnumerable<BrandMaster>> GetAllBrandAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<BrandMaster> GetBrandByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddBrandAsync(BrandMaster model)
        {
            await _repository.AddAsync(model);
        }

        public void UpdateBrand(BrandMaster model)
        {
            _repository.Update(model);
        }

        public void DeleteBrand(BrandMaster model)
        {
            _repository.Delete(model);
        }

        public async Task<IEnumerable<BrandDetailsDto>> Sp_GetBrandDetailsWithParameterAsync(string ActionType, int Category_Id)
        {
            //var storedProcedure = "EXEC SP_GetBrandDetailsWithCategory";
            //return await _repository.ExecuteStoredProcedureAsync<BrandDetailsDto>(storedProcedure);
            string storedProcedure = "Call SP_GetBrandDetailsWithCategoryByAction(@ActionType={0}, @Category_Id={1})";
            var parameters = new object[] { ActionType, Category_Id };
            //        var parameters = new[]
            // {
            //    new SqlParameter("@ActionType", ActionType),
            //    new SqlParameter("@CategoryId", Category_Id)
            //};

            var brandDetails = await _repository.ExecuteStoredProcedureAsync<BrandDetailsDto>(storedProcedure, parameters);
            return brandDetails.ToList();
        }

        public async Task<IEnumerable<BrandMaster>> GetBrandsByCategoryIdAsync(int categoryId)
        {
            return await _repository.GetWithIncludeAsync(
                o => o.CategoryId == categoryId//,
                //o => o.Category
            );
        }
    }
}
