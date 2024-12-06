using Microsoft.EntityFrameworkCore;
using PMS.Models;
using System.Linq.Expressions;
using System.Linq;
using PMS.DTOs;
using Microsoft.Data.SqlClient;

namespace PMS.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly ProductManagementContext _context;
        private readonly DbSet<T> _dbSet;

     
        public Repository(ProductManagementContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        // Implementation for stored procedure execution
        public async Task<IEnumerable<TResult>> ExecuteStoredProcedureAsync<TResult>(string storedProcedure, params object[] parameters)
            where TResult : class
        {
            // Use Entity Framework Core to execute the stored procedure
            return await _context.Set<TResult>().FromSqlRaw(storedProcedure, parameters).ToListAsync();
        }

        // Example implementation of other generic repository methods
        public async Task<T> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public void Update(T entity)
        {
            _dbSet.Update(entity);
            _context.SaveChanges();
        }

        public void Delete(T entity)
        {
            _dbSet.Remove(entity);
            _context.SaveChanges();
        }
        public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
        {
            return await _dbSet.Where(predicate).ToListAsync();
        }

        public async Task<IEnumerable<T>> GetWithIncludeAsync(
    Expression<Func<T, bool>> predicate,
    params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _dbSet;

            if (includes != null)
            {
                foreach (var include in includes)
                {
                    query = query.Include(include);
                }
            }

            if (predicate != null)
            {
                query = query.Where(predicate);
            }

            return await query.ToListAsync();
        }

        public async Task ExecuteStoredProcedure<T>(string storedProcedure, params SqlParameter[] parameters)
        {
            var sql = storedProcedure + " " + string.Join(", ", parameters.Select(p => p.ParameterName));

            await _context.Database.ExecuteSqlRawAsync(sql, parameters);
        }

    }
}
