using AngularBackendAPI.Models;
using AngularBackendAPI.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace AngularBackendAPI.Services.Implementation;

public class EmployeeService : IEmployeeService
{
    private DbangularCrudContext dbContext;

    public EmployeeService(DbangularCrudContext _dbContext)
    {
        dbContext = _dbContext;
    }
    public async Task<Employee> AddEmployee(Employee employee)
    {
        try
        {
            dbContext.Employees.Add(employee);
            await dbContext.SaveChangesAsync();
            return employee;
        }
        catch (Exception ex)
        {

            throw ex;
        }
    }

    public async Task<bool> DeleteEmployee(Employee employee)
    {
        try
        {
            dbContext.Employees.Remove(employee);
            await dbContext.SaveChangesAsync();
            return true;
        }
        catch (Exception ex)
        {

            throw ex;
        }
    }

    public async Task<Employee> GetEmployee(int idEmployee)
    {
        try
        {
            // intentar mandar solo una lista de clients
            Employee? employee = new Employee();
            employee = await dbContext.Employees.Include(dept => dept.IdDepartmentNavigation)
                .Where(e => e.IdEmployee == idEmployee).FirstOrDefaultAsync();
            return employee;
        }
        catch (Exception ex)
        {

            throw ex;
        }
    }

    public async Task<List<Employee>> GetList()
    {
        try
        {
            List<Employee> list = new List<Employee>();
            list = await dbContext.Employees.Include(dept => dept.IdDepartmentNavigation).ToListAsync();
            return list;
        }
        catch (Exception ex)
        {

            throw ex;
        }
    }

    public async Task<bool> UpdateEmployee(Employee employee)
    {
        try
        {
            dbContext.Employees.Update(employee);
            await dbContext.SaveChangesAsync();
            return true;
        }
        catch (Exception ex)
        {

            throw ex;
        }
    }
}
