using Server.Core.Interfaces.Repositories;
using Server.Core.Interfaces.Services;

namespace Server.Application.Services;

public class BaseService<T> : IBaseService<T>
{
    private readonly IRepository<T> _repository;

    public BaseService(IRepository<T> repository)
    {
        _repository = repository;
    }

    public Task<IEnumerable<T>> GetAllAsync()
    {
        return _repository.GetAllAsync();
    }

    public Task<T?> GetByIdAsync(int id)
    {
        return _repository.GetByIdAsync(id);
    }

    public Task<bool> AddAsync(T entity)
    {
        return _repository.AddAsync(entity);
    }

    public Task<bool> UpdateAsync(T entity)
    {
        return _repository.UpdateAsync(entity);
    }

    public Task<bool> DeleteAsync(int id)
    {
        return _repository.DeleteAsync(id);
    }
}
