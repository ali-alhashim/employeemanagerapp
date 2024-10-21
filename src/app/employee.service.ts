import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiServiceUrl:string = "http://localhost:8080";
  

  constructor(private http: HttpClient) {} // Inject HttpClient

  // Method to get the list of employees
  public getEmployees(): Observable<Employee[]> {
    console.log("EmployeeService.getEmployees ")
    return this.http.get<Employee[]>(`${this.apiServiceUrl}/employee/all`);
  }

  // Method to get employee by id
  public getEmployeeById(id:number):  Observable<Employee>{
    return this.http.get<Employee>(`${this.apiServiceUrl}/employee/find/${id}`);
  }

  // Method to update employee
  public updateEmployee(employee:Employee):Observable<Employee>{
    return this.http.put<Employee>(`${this.apiServiceUrl}/employee/update`, employee);
  }

  // Method add employee
  public addEmployee(employee:Employee):Observable<Employee>{
    return this.http.post<Employee>(`${this.apiServiceUrl}/employee/add`, employee);
  }

  //delete employee
  public deleteEmployeeById(id:number):  Observable<void>{
    return this.http.delete<void>(`${this.apiServiceUrl}/employee/delete/${id}`);
  }

}
