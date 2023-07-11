import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // private endPoint: any = "http://localhost:14349/";
  private endPoint: any = environment.endPoint;
  private apiUrl: any = this.endPoint + "employee/";

  constructor(private http:HttpClient) { }

  getList():Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiUrl}list`);
  }

  addEmployee(model: Employee):Observable<Employee>{
    return this.http.post<Employee>(`${this.apiUrl}save`, model);
  }

  updateEmployee(idEmployee:number, model: Employee):Observable<Employee>{
    return this.http.put<Employee>(`${this.apiUrl}update/${idEmployee}`, model);
  }

  deleteEmployee(idEmployee:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}delete/${idEmployee}`);
  }
}
