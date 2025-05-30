using Server.Core.Models;

namespace Server.Core.Interfaces.Repositories;

public interface IEmployeeRepository : IRepository<Employee>
{
    public Task<IEnumerable<Employee>> GetFilteredAsync(EmployeeFilter filter);
}