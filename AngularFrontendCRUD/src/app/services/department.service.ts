import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Department } from '../interfaces/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private endPoint: any = environment.endPoint;
  // private endPoint: any = "http://localhost:14349/";
  private apiUrl: any = this.endPoint + "department/";

  constructor(private http:HttpClient) { }

  getList():Observable<Department[]>{
    return this.http.get<Department[]>(`${this.apiUrl}list`);
  }
}
