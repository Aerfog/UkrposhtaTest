using System.Data;
using Server.Core.Models;

namespace Server.Infrastructure.Repositories;

public class PositionRepository : BaseRepository<Position>
{
    private const string TableName = "Positions";

    public PositionRepository(IDbConnection dbConnection) : base(dbConnection, TableName)
    {
    }
}