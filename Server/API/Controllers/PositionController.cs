using Microsoft.AspNetCore.Mvc;
using Server.Core.Interfaces.Services;
using Server.Core.Models;

namespace Server.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PositionController : ControllerBase
{
    private readonly IBaseService<Position> _service;

    public PositionController(IBaseService<Position> service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Position>>> GetPositions()
    {
        var positions = await _service.GetAllAsync();
        return Ok(positions);
    }
    
    [HttpGet("{id:int}")]
    public async Task<ActionResult<IEnumerable<Position>>> GetPosition(int id)
    {
        var position = await _service.GetByIdAsync(id);
        if (position == null)
        {
            return NotFound();
        }
        return Ok(position);
    }

    [HttpPost]
    public async Task<IActionResult> AddPosition([FromBody] Position position)
    {
        var success = await _service.AddAsync(position);
        if (!success)
        {
            return BadRequest();
        }
        return CreatedAtAction(nameof(AddPosition), new { id = position.Id }, position);
    }

    [HttpPut]
    public async Task<IActionResult> UpdatePosition([FromBody] Position position)
    {
        var success = await _service.UpdateAsync(position);
        return success ? Ok() : BadRequest();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePosition(int id)
    {
        var success = await _service.DeleteAsync(id);
        return success ? Ok() : BadRequest();
    }
}