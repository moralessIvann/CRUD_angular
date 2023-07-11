import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { Department } from 'src/app/interfaces/department';
import { Employee } from 'src/app/interfaces/employee';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';

// set how to handle dates
export const myDateFormats = {
parse:{
  dateInput:'DD/MM/YYYY',
},
display:{
  dateInput:'DD/MM/YYYY',
  monthYearLabel:'MMMM YYYY',
  dateA11yLabel:'LL',
  monthYearA11yLabel:'MMMM YYYY'
}
}

@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.css'],
  providers:[
    {provide: MAT_DATE_FORMATS, useValue: myDateFormats}
  ]
})

export class DialogAddEditComponent implements OnInit{
  employeeForm: FormGroup;
  titleAction: string = 'New';
  buttonAction: string = 'Save';
  departmentList: Department[] = [];

  constructor(private dialogReference: MatDialogRef<DialogAddEditComponent>,
    private fb: FormBuilder, private snackBar:MatSnackBar, private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public employeeData: Employee)
    {
      this.employeeForm = this.fb.group({
        name:['', Validators.required],
        idDepartment:['', Validators.required],
        salary:['', Validators.required],
        contractDate:['', Validators.required],
      })

      this.departmentService.getList().subscribe({
        next:(data) => {
          this.departmentList = data;
          console.log(data);
        },error:(e) => {}
      })
    }

    ngOnInit(): void {
      if(this.employeeData){
        this.employeeForm.patchValue({
          name: this.employeeData.name,
          idDepartment: this.employeeData.idDepartment,
          salary: this.employeeData.salary,
          contractDate: moment(this.employeeData.contractDate,'DD/MMM/YYYY')
        })
      }

      this.titleAction = "Edit";
      this.buttonAction = "Update";
    }

    showAlert(message: string, action: string) {
    this.snackBar.open(message, action,{
      horizontalPosition:'end',
      verticalPosition:'top',
      duration:3000
    });
  }

  addEditEmployee(){
    //console.log(this.employeeForm);
    console.log(this.employeeForm.value);

    const model: Employee ={
      idEmployee: 0,
      name: this.employeeForm.value.name,
      idDepartment: this.employeeForm.value.idDepartment,
      salary: this.employeeForm.value.salary,
      contractDate: moment (this.employeeForm.value.contractDate).format("DD/MMM/YYYY")
    }

    if(this.employeeData == null){
      this.employeeService.addEmployee(model).subscribe({
        next:(data) =>{
          this.showAlert("New employee added","Done");
          this.dialogReference.close("created");
        },error:(e) =>{
          this.showAlert("Can't create employee","Error");
        }
      })
    }
    else{
      this.employeeService.updateEmployee(this.employeeData.idEmployee, model).subscribe({
        next:(data) =>{
          this.showAlert("New employee edited","Done");
          this.dialogReference.close("edited");
        },error:(e) =>{
          this.showAlert("Can't edit employee","Error");
        }
      })
    }
  }
}
