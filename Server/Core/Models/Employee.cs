namespace Server.Core.Models;

public class Employee : BaseEntity
{
    public required string LastName { get; set; }
    public required string FirstName { get; set; }
    public string? MiddleName { get; set; }
    
    public string? Address { get; set; }
    public string? Phone { get; set; }
    
    public DateTime BirthDate { get; set; }
    public DateTime HireDate { get; set; }
    
    public decimal Salary { get; set; }
    
    public int? DepartmentId { get; set; }
    public int? PositionId { get; set; }
}