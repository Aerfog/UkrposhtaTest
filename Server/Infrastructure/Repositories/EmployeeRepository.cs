using System.Data;
using System.Text;
using Dapper;
using Server.Core.Interfaces.Repositories;
using Server.Core.Models;

namespace Server.Infrastructure.Repositories;

public class EmployeeRepository : BaseRepository<Employee>, IEmployeeRepository
{
    private readonly IDbConnection _dbConnection;
    private const string TableName = "Employees";

    public EmployeeRepository(IDbConnection dbConnection) : base(dbConnection, TableName)
    {
        _dbConnection = dbConnection;
    }

    public async Task<IEnumerable<Employee>> GetFilteredAsync(EmployeeFilter filter)
    {
        var queryBuilder = new StringBuilder($"SELECT * FROM {TableName}");
        var parameters = new DynamicParameters();
        var conditions = new List<string>();

        AddArrayCondition(conditions, parameters, filter.DepartmentIds, "DepartmentId", "DepartmentIds");
        AddArrayCondition(conditions, parameters, filter.PositionIds, "PositionId", "PositionIds");

        AddStringCondition(conditions, parameters, filter.LastName, "LastName");
        AddStringCondition(conditions, parameters, filter.FirstName, "FirstName");
        AddStringCondition(conditions, parameters, filter.MiddleName, "MiddleName");
        AddStringCondition(conditions, parameters, filter.Address, "Address");
        AddStringCondition(conditions, parameters, filter.Phone, "Phone");

        AddDateRangeConditions(conditions, parameters, filter.BirthDateFrom, filter.BirthDateTo, "BirthDate");
        AddDateRangeConditions(conditions, parameters, filter.HireDateFrom, filter.HireDateTo, "HireDate");
        AddNumericRangeConditions(conditions, parameters, filter.SalaryFrom, filter.SalaryTo, "Salary");

        if (conditions.Count == 0)
            return await _dbConnection.QueryAsync<Employee>(queryBuilder.ToString(), parameters);
        queryBuilder.Append(" WHERE ");
        queryBuilder.Append(string.Join(" AND ", conditions));

        return await _dbConnection.QueryAsync<Employee>(queryBuilder.ToString(), parameters);
    }

    private static void AddArrayCondition(List<string> conditions, DynamicParameters parameters,
        int[]? values, string columnName, string paramName)
    {
        if (values?.Length > 0)
        {
            conditions.Add($"{columnName} = ANY(@{paramName})");
            parameters.Add(paramName, values);
        }
    }

    private static void AddStringCondition(List<string> conditions, DynamicParameters parameters,
        string? value, string columnName)
    {
        if (!string.IsNullOrWhiteSpace(value))
        {
            conditions.Add($"{columnName} ILIKE @{columnName}");
            parameters.Add(columnName, $"%{value}%");
        }
    }

    private static void AddDateRangeConditions(List<string> conditions, DynamicParameters parameters,
        DateTime? fromDate, DateTime? toDate, string columnName)
    {
        if (fromDate.HasValue)
        {
            conditions.Add($"{columnName} >= @{columnName}From");
            parameters.Add($"{columnName}From", fromDate.Value);
        }

        if (toDate.HasValue)
        {
            conditions.Add($"{columnName} <= @{columnName}To");
            parameters.Add($"{columnName}To", toDate.Value);
        }
    }

    private static void AddNumericRangeConditions(List<string> conditions, DynamicParameters parameters,
        decimal? fromValue, decimal? toValue, string columnName)
    {
        if (fromValue.HasValue)
        {
            conditions.Add($"{columnName} >= @{columnName}From");
            parameters.Add($"{columnName}From", fromValue.Value);
        }

        if (toValue.HasValue)
        {
            conditions.Add($"{columnName} <= @{columnName}To");
            parameters.Add($"{columnName}To", toValue.Value);
        }
    }
}