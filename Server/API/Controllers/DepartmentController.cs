using Microsoft.AspNetCore.Mvc;
using Server.Core.Interfaces.Services;
using Server.Core.Models;

namespace Server.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DepartmentController : ControllerBase
{
    private readonly IBaseService<Department> _service;

    public DepartmentController(IBaseService<Department> service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Department>>> GetDepartments()
    {
        var departments = await _service.GetAllAsync();
        return Ok(departments);
    }
    
    [HttpGet("{id:int}")]
    public async Task<ActionResult<IEnumerable<Department>>> GetDepartment(int id)
    {
        var department = await _service.GetByIdAsync(id);
        if (department == null)
        {
            return NotFound();
        }
        return Ok(department);
    }

    [HttpPost]
    public async Task<IActionResult> AddDepartment([FromBody] Department department)
    {
        var success = await _service.AddAsync(department);
        if (!success)
        {
            return BadRequest();
        }
        return CreatedAtAction(nameof(AddDepartment), new { id = department.Id }, department);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateDepartment([FromBody] Department department)
    {
        var success = await _service.UpdateAsync(department);
        return success ? Ok() : BadRequest();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteDepartment(int id)
    {
        var success = await _service.DeleteAsync(id);
        return success ? Ok() : BadRequest();
    }
}