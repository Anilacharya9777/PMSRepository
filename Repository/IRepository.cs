using Microsoft.Data.SqlClient;
using MySql.Data.MySqlClient;
using PMS.DTOs;
using System.Linq.Expressions;

namespace PMS.Repository
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id);
        Task AddAsync(T entity);
        void Update(T entity);
        void Delete(T entity);
        //Task SaveAsync();
        Task<IEnumerable<TResult>> ExecuteStoredProcedureAsync<TResult>(string storedProcedure, params object[] parameters) where TResult : class;
        Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);
        Task<IEnumerable<T>> GetWithIncludeAsync(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes);
        Task ExecuteStoredProcedure<T>(string storedProcedure, params MySqlParameter[] parameters);
        Task<int> ExecuteStoredProcedureNonQueryAsync(string storedProcedure, params MySqlParameter[] parameters);

    }
}
