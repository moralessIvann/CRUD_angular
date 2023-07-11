import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { Employee } from './interfaces/employee';
import { EmployeeService } from './services/employee.service';
import { DialogAddEditComponent } from './dialogModal/dialog-add-edit/dialog-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogDeleteComponent } from './dialogModal/dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
  title = 'AngularFrontendCRUD';
  displayedColumns: any[] = ['idEmployee', 'name', 'department', 'salary', 'contractDate', 'actions'];
  dataSource: any = new MatTableDataSource<Employee>();

  constructor(private employeeService: EmployeeService, public dialog: MatDialog, private snackBar: MatSnackBar)
  {}

  ngOnInit(): void{
    this.displayEmployees();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator; ///why ! symbol

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  displayEmployees(){
    this.employeeService.getList().subscribe({
      next:(dataResponse) => {
        console.log(dataResponse)
        this.dataSource.data = dataResponse;
      },error:(e) => {}
    })
  }

  dialogNewEmployee() {
    this.dialog.open(DialogAddEditComponent, {disableClose: true, 
      width:"350px"}).afterClosed().subscribe(result => {
        if(result == 'created'){
          this.displayEmployees();
        }
      });
  }

  dialogEditEmployee(dataEmployee: Employee) {
    this.dialog.open(DialogAddEditComponent, {disableClose: true, 
      width:"350px",
    data:dataEmployee
  }).afterClosed().subscribe(result => {
        if(result == 'edited'){
          this.displayEmployees();
        }
      });
  }

  showAlert(message: string, action: string) {
    this.snackBar.open(message, action,{
      horizontalPosition:'end',
      verticalPosition:'top',
      duration:3000
    });
  }

  dialogDeleteEmployee(dataEmployee: Employee){
    this.dialog.open(DialogDeleteComponent, {disableClose: true, 
    data:dataEmployee
  }).afterClosed().subscribe(result => {
        if(result == 'delete'){
          this.employeeService.deleteEmployee(dataEmployee.idEmployee).subscribe({
            next:(data) => {
              this.showAlert("Employee deleted", "Done")
              this.displayEmployees();
            },
            error:(e) => {console.log(e)}
          });
        }
      });
  }
}