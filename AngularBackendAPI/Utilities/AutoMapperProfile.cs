using AngularBackendAPI.Models;
using AngularBackendAPI.DTOs;
using AutoMapper;
using System.Globalization;

namespace AngularBackendAPI.Utilities;

public class AutoMapperProfile: Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Department, DepartmentDTO>().ReverseMap();

        CreateMap<Employee, EmployeeDTO>()
            .ForMember(newType => newType.Department, opt => opt.MapFrom(
                previousType => previousType.IdDepartmentNavigation.Name))
            .ForMember(newType => newType.ContractDate, opt => opt.MapFrom(
                previousType => previousType.ContractDate.Value.ToString("dd/MMM/yyyy")));

        CreateMap<EmployeeDTO, Employee>()
            .ForMember(newType => newType.IdDepartmentNavigation, opt => opt.Ignore())
            .ForMember(newType => newType.ContractDate, opt => opt.MapFrom(previousType => DateTime
            .ParseExact(previousType.ContractDate,"dd/MMM/yyyy", CultureInfo.InvariantCulture)));
    }
}
