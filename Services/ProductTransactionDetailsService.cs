using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
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

        public async Task InsertTransactionDetailsAsync1(ProductTransactionDetail model)
        {
            var storedProcedure = "Call Sp_Create_TransactionDetails(@ProductId, @BarcodeNo, @PerchaseQuantity, @ShelfNo, @RackNo, @PurchaseSellDate, @PurchasePrice, @SellingPrice)";

            //string storedProcedureName = "GetMyData";
            var parameters = new[]
            {
            new MySqlParameter("@ProductId", MySqlDbType.Int32) { Value = model.ProductId },
            new MySqlParameter("@BarcodeNo", MySqlDbType.VarChar) { Value = model.BarcodeNo },
            new MySqlParameter("@PerchaseQuantity", MySqlDbType.Int32) { Value = model.PerchaseQuantity },
            new MySqlParameter("@ShelfNo", MySqlDbType.VarChar) { Value = model.ShelfNo },
            new MySqlParameter("@RackNo", MySqlDbType.VarChar) { Value = model.RackNo },
            new MySqlParameter("@PurchaseSellDate", MySqlDbType.VarChar) { Value = model.PurchaseSellDate },
            new MySqlParameter("@PurchasePrice", MySqlDbType.Decimal) { Value = model.PurchasePrice },
            new MySqlParameter("@SellingPrice", MySqlDbType.Decimal) { Value = model.SellingPrice }

             };
            //await _repository.ExecuteStoredProcedureAsync<ProductTransactionDetail>(storedProcedure, parameters);
            await _repository.ExecuteStoredProcedure<ProductTransactionDetail>(storedProcedure, parameters);
        }

        public async Task<int> InsertTransactionDetailsAsync(ProductTransactionDetail model)
        {
            var parameters = new MySqlParameter[]
            {
            new MySqlParameter("@ProductId", model.ProductId),
            new MySqlParameter("@BarcodeNo", model.BarcodeNo),
            new MySqlParameter("@PerchaseQuantity", model.PerchaseQuantity),
            new MySqlParameter("@ShelfNo", model.ShelfNo),
            new MySqlParameter("@RackNo", model.RackNo),
            new MySqlParameter("@PurchaseSellDate", model.PurchaseSellDate),
            new MySqlParameter("@PurchasePrice", model.PurchasePrice),
            new MySqlParameter("@SellingPrice", model.SellingPrice)
            };

            var result = await _repository.ExecuteStoredProcedureNonQueryAsync("Sp_Create_TransactionDetails", parameters);
            return result; // This returns the number of rows affected
        }

        public async Task<IEnumerable<ProductTransactionListDtos>> Sp_GetReceivedTransactionDetailsAsync(string ActionType,string barcodeNo)
        {
         
            string storedProcedure = "call Sp_Get_TransactionDetails (@Action_type, @BarcodeNo)";
            var parameters = new[]
           {
            new MySqlParameter("@Action_type", MySqlDbType.VarChar) { Value = ActionType },
            new MySqlParameter("@BarcodeNo", MySqlDbType.VarChar) { Value = barcodeNo }
             };

            var ReceivedProductDetails = await _repository.ExecuteStoredProcedureAsync<ProductTransactionListDtos>(storedProcedure, parameters);
            return ReceivedProductDetails.ToList();
        }

        public async Task<IEnumerable<ProductDetailsByBarcodeDtos>> Sp_GetTransactionDetailsByBarcodeNoAsync(string ActionType, string barcodeNo)
        {

            string storedProcedure = "call Sp_Get_TransactionDetails (@Action_type, @BarcodeNo)";
            var parameters = new[]
           {
            new MySqlParameter("@Action_type", MySqlDbType.VarChar) { Value = ActionType },
            new MySqlParameter("@BarcodeNo", MySqlDbType.VarChar) { Value = barcodeNo }
             };

            var ReceivedProductDetails = await _repository.ExecuteStoredProcedureAsync<ProductDetailsByBarcodeDtos>(storedProcedure, parameters);
            return ReceivedProductDetails.ToList();
        }


    }
}
