using System.Data;
using Dapper;
using Server.Core.Interfaces.Repositories;
using Server.Core.Models;
using Server.Infrastructure.Utils;

namespace Server.Infrastructure.Repositories;

public abstract class BaseRepository<T> : IRepository<T> where T : BaseEntity
{
    private readonly IDbConnection _dbConnection;
    private readonly string _tableName;

    protected BaseRepository(IDbConnection dbConnection, string tableName)
    {
        _dbConnection = dbConnection;
        _tableName = tableName;
    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
        var query = string.Format(SqlQueries.GetAll, _tableName);
        return await _dbConnection.QueryAsync<T>(query);
    }

    public async Task<T?> GetByIdAsync(int id)
    {
        var query = string.Format(SqlQueries.GetById, _tableName);
        return await _dbConnection.QueryFirstOrDefaultAsync<T>(query, new { Id = id });
    }

    public async Task<bool> AddAsync(T entity)
    {
        var query = SqlQueryBuilder.GenerateInsertQuery<T>(_tableName);
        var affectedRows = await _dbConnection.ExecuteAsync(query, entity);
        return affectedRows > 0;
    }

    public async Task<bool> UpdateAsync(T entity)
    {
        var query = SqlQueryBuilder.GenerateUpdateQuery<T>(_tableName);
        var affectedRows = await _dbConnection.ExecuteAsync(query, entity);
        return affectedRows > 0;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var query = string.Format(SqlQueries.Delete, _tableName);
        var affectedRows = await _dbConnection.ExecuteAsync(query, new { Id = id });
        return affectedRows > 0;
    }
}