import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/interfaces/employee';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})

export class DialogDeleteComponent {

  constructor(private dialogReference: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public employeeData: Employee){}

    deleteEmployee(){
      if(this.employeeData){
        this.dialogReference.close("delete")
      }
    }

}
