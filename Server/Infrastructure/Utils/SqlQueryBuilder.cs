namespace Server.Infrastructure.Utils;

public class SqlQueryBuilder
{
    public static string GenerateInsertQuery<T>(string tableName)
    {
        var type = typeof(T);
        var columns = string.Join(", ", type.GetProperties().Where(p => p.Name != "Id").Select(p => p.Name));
        var values = string.Join(", ", type.GetProperties().Where(p => p.Name != "Id").Select(p => "@" + p.Name));

        return string.Format(SqlQueries.Insert, tableName, columns, values);
    }

    public static string GenerateUpdateQuery<T>(string tableName)
    {
        var type = typeof(T);
        var updates = string.Join(", ", type.GetProperties().Where(p => p.Name != "Id").Select(p => $"{p.Name} = @{p.Name}"));

        return string.Format(SqlQueries.Update, tableName, updates);
    }
}