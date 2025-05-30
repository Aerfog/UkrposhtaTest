using System.Data;
using Server.Core.Models;

namespace Server.Infrastructure.Repositories;

public class DepartmentRepository : BaseRepository<Department>
{
    private const string TableName = "Departments";

    public DepartmentRepository(IDbConnection dbConnection) : base(dbConnection, TableName)
    {
    }
}