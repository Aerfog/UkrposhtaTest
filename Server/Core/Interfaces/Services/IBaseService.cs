namespace Server.Core.Interfaces.Services;

public interface IBaseService<T>
{
    public Task<IEnumerable<T>> GetAllAsync();
    
    public Task<T?> GetByIdAsync(int id);

    public Task<bool> AddAsync(T entity);

    public Task<bool> UpdateAsync(T entity);

    public Task<bool> DeleteAsync(int id);
}