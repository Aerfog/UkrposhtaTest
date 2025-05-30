using System.Data;
using Server.Core.Models;

namespace Server.Infrastructure.Repositories;

public class CompanyRepository : BaseRepository<Company>
{
    private const string TableName = "Companies";

    public CompanyRepository(IDbConnection dbConnection) : base(dbConnection, TableName)
    {
    }
}