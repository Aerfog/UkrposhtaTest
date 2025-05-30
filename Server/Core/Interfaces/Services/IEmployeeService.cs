using Server.Core.Models;

namespace Server.Core.Interfaces.Services;

public interface IEmployeeService : IBaseService<Employee>
{
    public Task<IEnumerable<Employee>> GetFilteredAsync(EmployeeFilter filter);
}