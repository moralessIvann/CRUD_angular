﻿using System;
using System.Collections.Generic;

namespace AngularBackendAPI.Models;

public partial class Employee
{
    public int IdEmployee { get; set; }

    public string? Name { get; set; }

    public int? IdDepartment { get; set; }

    public int? Salary { get; set; }

    public DateTime? ContractDate { get; set; }

    public DateTime? CreationDate { get; set; }

    public virtual Department? IdDepartmentNavigation { get; set; }
}
