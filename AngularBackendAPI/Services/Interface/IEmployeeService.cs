using AngularBackendAPI.Models;

namespace AngularBackendAPI.Services.Interface;

public interface IEmployeeService
{
    Task<Employee> AddEmployee(Employee employee);

    Task<bool> DeleteEmployee(Employee employee);

    Task<Employee> GetEmployee(int idEmployee);

    Task<List<Employee>> GetList();

    Task<bool> UpdateEmployee(Employee employee);
}