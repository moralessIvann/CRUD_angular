using AngularBackendAPI.Models;
using AngularBackendAPI.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace AngularBackendAPI.Services.Implementation;

public class DepartmentService : IDepartmentService
{
    private DbangularCrudContext dbContext;

    public DepartmentService(DbangularCrudContext _dbContext)
    {
        dbContext = _dbContext;
    }
    public async Task<List<Department>> GetList()
    {
        try
        {
            List<Department> list = new List<Department>();
            list = await dbContext.Departments.ToListAsync();
            return list;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
}
