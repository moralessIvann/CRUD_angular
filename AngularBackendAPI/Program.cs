using AngularBackendAPI.DTOs;
using AngularBackendAPI.Models;
using AngularBackendAPI.Services.Implementation;
using AngularBackendAPI.Services.Interface;
using AngularBackendAPI.Utilities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DbangularCrudContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddScoped<IDepartmentService, DepartmentService>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

builder.Services.AddCors(options =>
{
    options.AddPolicy("NewPolicy", app =>
    {
        app.AllowAnyHeader()
        .AllowAnyOrigin()
        .AllowAnyMethod();
    });

});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/department/list", async (
    IDepartmentService departmentService, IMapper mapper) =>
{
    var departmentList = await departmentService.GetList();
    var departmentListDTO = mapper.Map<List<DepartmentDTO>>(departmentList);

    if (departmentListDTO.Count > 0)
        return Results.Ok(departmentListDTO);
    else
        return Results.NotFound();
});

app.MapGet("/employee/list", async (
    IEmployeeService employeeService, IMapper mapper) =>
{
    var employeeList = await employeeService.GetList();
    var employeeListDTO = mapper.Map<List<EmployeeDTO>>(employeeList);

    if (employeeListDTO.Count > 0)
        return Results.Ok(employeeListDTO);
    else
        return Results.NotFound();
});

app.MapPost("/employee/save", async (
    EmployeeDTO employeeDTO, IEmployeeService employeeService, IMapper mapper 
     ) => { 
         var employee = mapper.Map<Employee>(employeeDTO);
         var newEmployee = await employeeService.AddEmployee(employee);

         if (newEmployee.IdEmployee != 0)
             return Results.Ok(mapper.Map<EmployeeDTO>(newEmployee));
         else
             return Results.StatusCode(StatusCodes.Status500InternalServerError);
     });

app.MapPut("/employee/update/{IdEmployee}", async (
    int IdEmployee, EmployeeDTO employeeDTO, IEmployeeService employeeService, IMapper mapper
    ) => { 
        var employeeFound = await employeeService.GetEmployee(IdEmployee);
        
        if (employeeFound is null)
            return Results.NotFound();

        var employee = mapper.Map<Employee>(employeeDTO);

        employeeFound.Name = employee.Name;
        employeeFound.IdDepartment = employee.IdDepartment;
        employeeFound.Salary = employee.Salary;
        employeeFound.ContractDate = employee.ContractDate;

        var answer = await employeeService.UpdateEmployee(employeeFound);

        if (answer)
            return Results.Ok(mapper.Map<EmployeeDTO>(employeeFound));
        else
            return Results.StatusCode(StatusCodes.Status500InternalServerError);
    });

app.MapDelete("/employee/delete/{IdEmployee}", async (
    int IdEmployee, IEmployeeService employeeService
    ) => {
        var employeeFound = await employeeService.GetEmployee(IdEmployee);

        if (employeeFound is null)
            return Results.NotFound();

        var answer = await employeeService.DeleteEmployee(employeeFound);

        if (answer)
            return Results.Ok();
        else
            return Results.StatusCode(StatusCodes.Status500InternalServerError);
    });

app.UseCors("NewPolicy");

app.Run();