namespace Server.Core.Interfaces.Repositories;

public interface IRepository<T>
{
    Task<IEnumerable<T>> GetAllAsync();
    Task<T?> GetByIdAsync(int id);
    Task<bool> AddAsync(T employee);
    Task<bool> UpdateAsync(T employee);
    Task<bool> DeleteAsync(int id);
}