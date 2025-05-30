namespace Server.Core.Models;

public class Company : BaseEntity
{
    public required string Name { get; set; }
    public required string Address { get; set; }
    public required string Phone { get; set; }
    public required string Email { get; set; }
    public required string Description { get; set; }
}