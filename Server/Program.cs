using System.Data;
using Npgsql;
using Server.API.Middlewares;
using Server.Application.Services;
using Server.Core.Interfaces.Repositories;
using Server.Core.Interfaces.Services;
using Server.Core.Models;
using Server.Infrastructure.Repositories;

const string connectionSectionName = "DefaultConnection";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IDbConnection>(_ => new NpgsqlConnection(builder.Configuration.GetConnectionString(connectionSectionName)));
builder.Services.AddScoped<IRepository<Position>, PositionRepository>();
builder.Services.AddScoped<IRepository<Department>, DepartmentRepository>();
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IRepository<Company>, CompanyRepository>();

builder.Services.AddScoped<IBaseService<Position>, BaseService<Position>>();
builder.Services.AddScoped<IBaseService<Department>, BaseService<Department>>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IBaseService<Company>, BaseService<Company>>();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseMiddleware<ErrorHandlingMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors();

app.MapControllers();

app.Run();