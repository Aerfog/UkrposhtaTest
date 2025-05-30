using Server.Core.Interfaces.Repositories;
using Server.Core.Interfaces.Services;
using Server.Core.Models;

namespace Server.Application.Services;

public class EmployeeService : BaseService<Employee>, IEmployeeService
{
    private readonly IEmployeeRepository _repository;

    public EmployeeService(IEmployeeRepository repository) : base(repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Employee>> GetFilteredAsync(EmployeeFilter filter)
    {
        return await _repository.GetFilteredAsync(filter);
    }
}