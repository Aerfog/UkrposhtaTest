using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Server.Core.Interfaces.Services;
using Server.Core.Models;

namespace Server.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CompanyController : ControllerBase
{
    private readonly IBaseService<Company> _service;

    public CompanyController(IBaseService<Company>  companyService)
    {
        _service = companyService;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Company>>> GetCompanies()
    {
        var company = await _service.GetAllAsync();
        return Ok(company);
    }
    
    [HttpGet("{id:int}")]
    public async Task<ActionResult<IEnumerable<Company>>> GetCompany(int id)
    {
        var company = await _service.GetByIdAsync(id);
        if (company == null)
        {
            return NotFound();
        }
        return Ok(company);
    }

    [HttpPost]
    public async Task<ActionResult> AddCompany([FromBody] Company company)
    {
        var success = await _service.AddAsync(company);
        if (!success)
        {
            return BadRequest();
        }
        return CreatedAtAction(nameof(AddCompany), new { id = company.Id }, company);
    }

    [HttpPut]
    public async Task<ActionResult> UpdateCompany([FromBody] Company company)
    {
        var success = await _service.UpdateAsync(company);
        return success ? Ok() : BadRequest();
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteCompany(int id)
    {
        var success = await _service.DeleteAsync(id);
        return success ? Ok() : BadRequest();
    }
}