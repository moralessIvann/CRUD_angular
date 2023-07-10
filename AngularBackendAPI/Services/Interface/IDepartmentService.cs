using AngularBackendAPI.Models;

namespace AngularBackendAPI.Services.Interface;
public interface IDepartmentService
{
    Task<List<Department>> GetList();
}

