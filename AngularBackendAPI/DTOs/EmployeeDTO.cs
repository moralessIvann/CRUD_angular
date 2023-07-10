namespace AngularBackendAPI.DTOs;

public class EmployeeDTO
{
    public int IdEmployee { get; set; }

    public string? Name { get; set; }

    public int? IdDepartment { get; set; }

    // this was added just in this class and not in the original model
    public string? Department { get; set; }

    public int? Salary { get; set; }

    //public DateTime? ContractDate { get; set; }
    public string? ContractDate { get; set; }
}
