using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using PMS.DTOs;
using PMS.Models;
using PMS.Repository;
using System.Data;

namespace PMS.Services
{
    public class ProductTransactionDetailsService
    {
        private readonly IRepository<ProductTransactionDetail> _repository;
        private readonly ProductManagementContext _dbContext;
        public ProductTransactionDetailsService(IRepository<ProductTransactionDetail> repository, ProductManagementContext context)
        {
            _repository = repository;
            _dbContext = context;
        }
        //public async Task<IEnumerable<BrandMaster>> GetProductsWithCategoriesAsync()
        //{
        //    var storedProcedure = "EXEC SP_GetProductDetails";
        //    return await _repository.ExecuteStoredProcedureAsync<BrandMaster>(storedProcedure);
        //}

        public async Task<IEnumerable<ProductTransactionDetail>> GetAllProductTransactionAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<ProductTransactionDetail> GetProductTransactionByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddProductTransactionAsync(ProductTransactionDetail model)
        {
            await _repository.AddAsync(model);
        }

        public void UpdateProductTransaction(ProductTransactionDetail model)
        {
            _repository.Update(model);
        }

        public void DeleteProductTransaction(ProductTransactionDetail model)
        {
            _repository.Delete(model);
        }

        public async Task InsertTransactionDetailsAsync(ProductTransactionDetail model)
        {
            var storedProcedure = "EXEC Sp_Create_TransactionDetails";

            //string storedProcedureName = "GetMyData";
            var parameters = new[]
            {
            new SqlParameter("@ProductId", SqlDbType.Int) { Value = model.ProductId },
            new SqlParameter("@BarcodeNo", SqlDbType.NVarChar) { Value = model.BarcodeNo },
            new SqlParameter("@PerchaseQuantity", SqlDbType.Int) { Value = model.PerchaseQuantity },
            new SqlParameter("@ShelfNo", SqlDbType.NVarChar) { Value = model.ShelfNo },
            new SqlParameter("@RackNo", SqlDbType.NVarChar) { Value = model.RackNo },
            new SqlParameter("@PurchaseSellDate", SqlDbType.DateTime) { Value = model.PurchaseSellDate },
            new SqlParameter("@PurchasePrice", SqlDbType.Decimal) { Value = model.PurchasePrice },
            new SqlParameter("@SellingPrice", SqlDbType.Decimal) { Value = model.SellingPrice }

             };
            //await _repository.ExecuteStoredProcedureAsync<ProductTransactionDetail>(storedProcedure, parameters);
            await _repository.ExecuteStoredProcedure<ProductTransactionDetail>(storedProcedure, parameters);
        }

        public async Task<IEnumerable<ProductTransactionListDtos>> Sp_GetReceivedTransactionDetailsAsync(string ActionType,string barcodeNo)
        {
         
            string storedProcedure = "EXEC Sp_Get_TransactionDetails @Action_type, @BarcodeNo";
            var parameters = new[]
           {
            new SqlParameter("@Action_type", SqlDbType.NVarChar) { Value = ActionType },
            new SqlParameter("@BarcodeNo", SqlDbType.NVarChar) { Value = barcodeNo }
             };

            var ReceivedProductDetails = await _repository.ExecuteStoredProcedureAsync<ProductTransactionListDtos>(storedProcedure, parameters);
            return ReceivedProductDetails.ToList();
        }

        public async Task<IEnumerable<ProductDetailsByBarcodeDtos>> Sp_GetTransactionDetailsByBarcodeNoAsync(string ActionType, string barcodeNo)
        {

            string storedProcedure = "EXEC Sp_Get_TransactionDetails @Action_type, @BarcodeNo";
            var parameters = new[]
           {
            new SqlParameter("@Action_type", SqlDbType.NVarChar) { Value = ActionType },
            new SqlParameter("@BarcodeNo", SqlDbType.NVarChar) { Value = barcodeNo }
             };

            var ReceivedProductDetails = await _repository.ExecuteStoredProcedureAsync<ProductDetailsByBarcodeDtos>(storedProcedure, parameters);
            return ReceivedProductDetails.ToList();
        }


    }
}
