namespace Server.Core.Models;

public class EmployeeFilter
{
    public int[]? DepartmentIds { get; set; }
    public int[]? PositionIds { get; set; }
    public string? LastName { get; set; }
    public string? FirstName { get; set; }
    public string? MiddleName { get; set; }
    public string? Address { get; set; }
    public string? Phone { get; set; }
    public DateTime? BirthDateFrom { get; set; }
    public DateTime? BirthDateTo { get; set; }
    public DateTime? HireDateFrom { get; set; }
    public DateTime? HireDateTo { get; set; }
    public decimal? SalaryFrom { get; set; }
    public decimal? SalaryTo { get; set; } 
}