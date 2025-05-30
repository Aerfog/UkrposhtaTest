using Microsoft.AspNetCore.Mvc;
using Server.Core.Interfaces.Services;
using Server.Core.Models;

namespace Server.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeeController : ControllerBase
{
    private readonly IEmployeeService _service;

    public EmployeeController(IEmployeeService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees([FromQuery] EmployeeFilter filter)
    {
        var employees = await _service.GetFilteredAsync(filter);
        return Ok(employees);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Employee>> GetEmployee(int id)
    {
        var employee = await _service.GetByIdAsync(id);
        if (employee == null) return NotFound();
        return Ok(employee);
    }

    [HttpPost]
    public async Task<IActionResult> AddEmployee([FromBody] Employee employee)
    {
        var success = await _service.AddAsync(employee);
        if (!success)
        {
            return BadRequest();
        }

        return CreatedAtAction(nameof(AddEmployee), new { id = employee.Id }, employee);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateEmployee([FromBody] Employee employee)
    {
        var success = await _service.UpdateAsync(employee);
        return success ? Ok() : BadRequest();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEmployee(int id)
    {
        var success = await _service.DeleteAsync(id);
        return success ? Ok() : BadRequest();
    }
}